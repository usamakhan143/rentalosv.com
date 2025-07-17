import { loadStripe } from "@stripe/stripe-js";
import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebase";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder",
);

export const paymentService = {
  // Create payment intent for booking
  async createPaymentIntent(bookingData) {
    try {
      const createPaymentIntent = httpsCallable(
        functions,
        "createPaymentIntent",
      );
      const result = await createPaymentIntent({
        bookingId: bookingData.bookingId,
        amount: Math.round(bookingData.totalAmount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          bookingId: bookingData.bookingId,
          carId: bookingData.carId,
          renterId: bookingData.renterId,
          hostId: bookingData.hostId,
        },
      });

      return result.data;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw new Error("Failed to initialize payment. Please try again.");
    }
  },

  // Confirm payment with Stripe
  async confirmPayment(paymentIntentId, paymentMethodId) {
    try {
      const stripe = await stripePromise;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentId,
        {
          payment_method: paymentMethodId,
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      return paymentIntent;
    } catch (error) {
      console.error("Error confirming payment:", error);
      throw error;
    }
  },

  // Create setup intent for saving payment methods
  async createSetupIntent(customerId) {
    try {
      const createSetupIntent = httpsCallable(functions, "createSetupIntent");
      const result = await createSetupIntent({ customerId });

      return result.data;
    } catch (error) {
      console.error("Error creating setup intent:", error);
      throw new Error("Failed to setup payment method. Please try again.");
    }
  },

  // Get customer payment methods
  async getPaymentMethods(customerId) {
    try {
      const getPaymentMethods = httpsCallable(functions, "getPaymentMethods");
      const result = await getPaymentMethods({ customerId });

      return result.data.paymentMethods || [];
    } catch (error) {
      console.error("Error getting payment methods:", error);
      return [];
    }
  },

  // Delete payment method
  async deletePaymentMethod(paymentMethodId) {
    try {
      const deletePaymentMethod = httpsCallable(
        functions,
        "deletePaymentMethod",
      );
      await deletePaymentMethod({ paymentMethodId });

      return true;
    } catch (error) {
      console.error("Error deleting payment method:", error);
      throw new Error("Failed to delete payment method. Please try again.");
    }
  },

  // Process refund
  async processRefund(
    paymentIntentId,
    amount = null,
    reason = "requested_by_customer",
  ) {
    try {
      const processRefund = httpsCallable(functions, "processRefund");
      const result = await processRefund({
        paymentIntentId,
        amount: amount ? Math.round(amount * 100) : null, // Convert to cents if specified
        reason,
      });

      return result.data;
    } catch (error) {
      console.error("Error processing refund:", error);
      throw new Error("Failed to process refund. Please contact support.");
    }
  },

  // Transfer funds to host
  async transferToHost(
    paymentIntentId,
    hostStripeAccountId,
    amount,
    metadata = {},
  ) {
    try {
      const transferToHost = httpsCallable(functions, "transferToHost");
      const result = await transferToHost({
        paymentIntentId,
        hostStripeAccountId,
        amount: Math.round(amount * 100), // Convert to cents
        metadata,
      });

      return result.data;
    } catch (error) {
      console.error("Error transferring to host:", error);
      throw new Error("Failed to transfer payment to host.");
    }
  },

  // Get payment history
  async getPaymentHistory(userId, limit = 10) {
    try {
      const getPaymentHistory = httpsCallable(functions, "getPaymentHistory");
      const result = await getPaymentHistory({ userId, limit });

      return result.data.payments || [];
    } catch (error) {
      console.error("Error getting payment history:", error);
      return [];
    }
  },

  // Create Stripe Connect account for hosts
  async createConnectAccount(hostData) {
    try {
      const createConnectAccount = httpsCallable(
        functions,
        "createConnectAccount",
      );
      const result = await createConnectAccount(hostData);

      return result.data;
    } catch (error) {
      console.error("Error creating Connect account:", error);
      throw new Error("Failed to create payout account. Please try again.");
    }
  },

  // Get Connect account status
  async getConnectAccountStatus(accountId) {
    try {
      const getConnectAccountStatus = httpsCallable(
        functions,
        "getConnectAccountStatus",
      );
      const result = await getConnectAccountStatus({ accountId });

      return result.data;
    } catch (error) {
      console.error("Error getting Connect account status:", error);
      throw error;
    }
  },

  // Format currency
  formatCurrency(amount, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  },

  // Calculate platform fees
  calculateFees(subtotal, protectionPlan = "basic") {
    const serviceFeeRate = 0.1; // 10% service fee
    const protectionFeeRates = {
      basic: 0.1,
      standard: 0.15,
      premium: 0.25,
    };

    const serviceFee = subtotal * serviceFeeRate;
    const protectionFee =
      subtotal * (protectionFeeRates[protectionPlan] || 0.1);
    const platformFee = serviceFee + protectionFee;
    const hostPayout = subtotal - subtotal * 0.05; // Host gets 95% of subtotal

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      serviceFee: parseFloat(serviceFee.toFixed(2)),
      protectionFee: parseFloat(protectionFee.toFixed(2)),
      platformFee: parseFloat(platformFee.toFixed(2)),
      hostPayout: parseFloat(hostPayout.toFixed(2)),
      total: parseFloat((subtotal + platformFee).toFixed(2)),
    };
  },

  // Get Stripe instance
  async getStripe() {
    return await stripePromise;
  },
};

// Payment method utilities
export const paymentMethodUtils = {
  // Get card brand icon
  getCardIcon(brand) {
    const icons = {
      visa: "💳",
      mastercard: "💳",
      amex: "💳",
      discover: "💳",
      diners: "💳",
      jcb: "💳",
      unionpay: "💳",
      unknown: "💳",
    };

    return icons[brand] || icons.unknown;
  },

  // Format card details
  formatCardDetails(paymentMethod) {
    if (!paymentMethod.card) return "Unknown card";

    const { brand, last4, exp_month, exp_year } = paymentMethod.card;
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);

    return `${brandName} •••• ${last4} ${exp_month}/${exp_year.toString().slice(-2)}`;
  },

  // Check if card is expired
  isCardExpired(paymentMethod) {
    if (!paymentMethod.card) return false;

    const { exp_month, exp_year } = paymentMethod.card;
    const now = new Date();
    const expiry = new Date(exp_year, exp_month - 1);

    return now > expiry;
  },

  // Validate card number (basic Luhn algorithm)
  validateCardNumber(cardNumber) {
    const num = cardNumber.replace(/\D/g, "");
    if (num.length < 13 || num.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },

  // Format card number for display
  formatCardNumber(cardNumber) {
    const num = cardNumber.replace(/\D/g, "");
    return num.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  },

  // Get card type from number
  getCardType(cardNumber) {
    const num = cardNumber.replace(/\D/g, "");

    if (/^4/.test(num)) return "visa";
    if (/^5[1-5]/.test(num)) return "mastercard";
    if (/^3[47]/.test(num)) return "amex";
    if (/^6/.test(num)) return "discover";
    if (/^30[0-5]/.test(num)) return "diners";
    if (/^35/.test(num)) return "jcb";
    if (/^62/.test(num)) return "unionpay";

    return "unknown";
  },
};

export default paymentService;
