const functions = require("firebase-functions");

// Import Stripe functions
const {
  createPaymentIntent,
  processRefund,
  createConnectAccount,
  transferToHost,
  getPaymentMethods,
  deletePaymentMethod,
  getPaymentHistory,
  stripeWebhook,
} = require("./stripe");

// Export Stripe functions
exports.createPaymentIntent = createPaymentIntent;
exports.processRefund = processRefund;
exports.createConnectAccount = createConnectAccount;
exports.transferToHost = transferToHost;
exports.getPaymentMethods = getPaymentMethods;
exports.deletePaymentMethod = deletePaymentMethod;
exports.getPaymentHistory = getPaymentHistory;
exports.stripeWebhook = stripeWebhook;

// Notification functions
exports.sendBookingNotification = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap, context) => {
    const booking = snap.data();

    // Send email notification to host
    // Implementation would depend on your email service (SendGrid, etc.)
    console.log("New booking created:", booking);

    return null;
  });

exports.sendBookingUpdateNotification = functions.firestore
  .document("bookings/{bookingId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status !== after.status) {
      // Send notification about status change
      console.log("Booking status changed:", before.status, "->", after.status);
    }

    return null;
  });

// Automated functions
exports.processCompletedTrips = functions.pubsub
  .schedule("every 1 hours")
  .onRun(async (context) => {
    // Check for trips that should be marked as completed
    // Transfer funds to hosts, etc.
    console.log("Processing completed trips");
    return null;
  });

// Review aggregation
exports.updateCarRating = functions.firestore
  .document("reviews/{reviewId}")
  .onCreate(async (snap, context) => {
    const review = snap.data();
    const carId = review.carId;

    // Calculate new average rating for the car
    // Update car document with new rating
    console.log("New review for car:", carId);

    return null;
  });
