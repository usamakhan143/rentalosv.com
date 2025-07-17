const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key);

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Create payment intent
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  // Check authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated",
    );
  }

  try {
    const { bookingId, amount, currency = "usd", metadata = {} } = data;

    // Validate required parameters
    if (!bookingId || !amount) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing required parameters",
      );
    }

    // Create customer if doesn't exist
    let customer;
    const userRef = db.collection("users").doc(context.auth.uid);
    const userDoc = await userRef.get();

    if (userDoc.exists && userDoc.data().stripeCustomerId) {
      customer = await stripe.customers.retrieve(
        userDoc.data().stripeCustomerId,
      );
    } else {
      customer = await stripe.customers.create({
        email: context.auth.token.email,
        metadata: {
          firebaseUID: context.auth.uid,
        },
      });

      // Save customer ID to user document
      await userRef.update({
        stripeCustomerId: customer.id,
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency,
      customer: customer.id,
      metadata: {
        bookingId,
        firebaseUID: context.auth.uid,
        ...metadata,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Store payment intent in Firestore
    await db
      .collection("payments")
      .doc(paymentIntent.id)
      .set({
        paymentIntentId: paymentIntent.id,
        bookingId,
        userId: context.auth.uid,
        amount: amount / 100, // Store in dollars
        currency,
        status: paymentIntent.status,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        metadata,
      });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to create payment intent",
    );
  }
});

// Process refund
exports.processRefund = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated",
    );
  }

  try {
    const { paymentIntentId, amount, reason = "requested_by_customer" } = data;

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount) : undefined, // Amount in cents
      reason,
    });

    // Update payment record
    await db
      .collection("payments")
      .doc(paymentIntentId)
      .update({
        refundId: refund.id,
        refundAmount: refund.amount / 100,
        refundStatus: refund.status,
        refundedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    return {
      refundId: refund.id,
      amount: refund.amount / 100,
      status: refund.status,
    };
  } catch (error) {
    console.error("Error processing refund:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to process refund",
    );
  }
});

// Create Connect account for hosts
exports.createConnectAccount = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated",
    );
  }

  try {
    const {
      email,
      firstName,
      lastName,
      dob,
      address,
      businessType = "individual",
    } = data;

    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email,
      individual: {
        first_name: firstName,
        last_name: lastName,
        dob,
        address,
      },
      business_type: businessType,
      metadata: {
        firebaseUID: context.auth.uid,
      },
    });

    // Save Connect account ID to user document
    await db.collection("users").doc(context.auth.uid).update({
      stripeConnectAccountId: account.id,
      payoutEnabled: false,
    });

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${functions.config().app.url}/host-onboarding?refresh=true`,
      return_url: `${functions.config().app.url}/host-onboarding?success=true`,
      type: "account_onboarding",
    });

    return {
      accountId: account.id,
      onboardingUrl: accountLink.url,
    };
  } catch (error) {
    console.error("Error creating Connect account:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to create payout account",
    );
  }
});

// Transfer funds to host
exports.transferToHost = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated",
    );
  }

  try {
    const {
      paymentIntentId,
      hostStripeAccountId,
      amount,
      metadata = {},
    } = data;

    // Create transfer
    const transfer = await stripe.transfers.create({
      amount: Math.round(amount), // Amount in cents
      currency: "usd",
      destination: hostStripeAccountId,
      metadata: {
        paymentIntentId,
        ...metadata,
      },
    });

    // Update payment record
    await db
      .collection("payments")
      .doc(paymentIntentId)
      .update({
        transferId: transfer.id,
        transferAmount: transfer.amount / 100,
        transferredToHost: true,
        transferredAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    return {
      transferId: transfer.id,
      amount: transfer.amount / 100,
    };
  } catch (error) {
    console.error("Error transferring to host:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to transfer funds",
    );
  }
});

// Get payment methods
exports.getPaymentMethods = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated",
    );
  }

  try {
    const userDoc = await db.collection("users").doc(context.auth.uid).get();
    const customerId = userDoc.data()?.stripeCustomerId;

    if (!customerId) {
      return { paymentMethods: [] };
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    return {
      paymentMethods: paymentMethods.data,
    };
  } catch (error) {
    console.error("Error getting payment methods:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to get payment methods",
    );
  }
});

// Delete payment method
exports.deletePaymentMethod = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated",
    );
  }

  try {
    const { paymentMethodId } = data;

    await stripe.paymentMethods.detach(paymentMethodId);

    return { success: true };
  } catch (error) {
    console.error("Error deleting payment method:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to delete payment method",
    );
  }
});

// Get payment history
exports.getPaymentHistory = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated",
    );
  }

  try {
    const { limit = 10 } = data;

    const paymentsSnapshot = await db
      .collection("payments")
      .where("userId", "==", context.auth.uid)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    const payments = paymentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { payments };
  } catch (error) {
    console.error("Error getting payment history:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to get payment history",
    );
  }
});

// Webhook handler for Stripe events
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      functions.config().stripe.webhook_secret,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object);
        break;

      case "account.updated":
        await handleAccountUpdated(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send("Event handled successfully");
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).send("Webhook handler failed");
  }
});

// Helper functions
async function handlePaymentSucceeded(paymentIntent) {
  const { id, metadata } = paymentIntent;

  // Update booking status
  if (metadata.bookingId) {
    await db.collection("bookings").doc(metadata.bookingId).update({
      paymentStatus: "paid",
      status: "approved",
      paidAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // Update payment record
  await db.collection("payments").doc(id).update({
    status: "succeeded",
    completedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

async function handlePaymentFailed(paymentIntent) {
  const { id, metadata } = paymentIntent;

  // Update booking status
  if (metadata.bookingId) {
    await db.collection("bookings").doc(metadata.bookingId).update({
      paymentStatus: "failed",
    });
  }

  // Update payment record
  await db.collection("payments").doc(id).update({
    status: "failed",
    failedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

async function handleAccountUpdated(account) {
  const { id, metadata, charges_enabled, payouts_enabled } = account;

  if (metadata.firebaseUID) {
    await db
      .collection("users")
      .doc(metadata.firebaseUID)
      .update({
        chargesEnabled: charges_enabled,
        payoutsEnabled: payouts_enabled,
        accountStatus: account.details_submitted ? "active" : "pending",
      });
  }
}
