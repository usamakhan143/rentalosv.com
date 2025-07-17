import React, { useState, useEffect } from "react";
import { CreditCard, Lock, Shield, CheckCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { paymentService, paymentMethodUtils } from "../../services/payment";
import { bookingService } from "../../services/booking";
import Button from "../ui/Button";
import Input from "../ui/Input";

const PaymentCheckout = ({ booking, onPaymentSuccess, onCancel }) => {
  const { currentUser } = useAuth();
  const { addNotification } = useApp();

  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      line1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadData = async () => {
      await loadPaymentMethods();
      await createPaymentIntent();
    };
    loadData();
  }, [currentUser.uid]);

  const loadPaymentMethods = async () => {
    try {
      const methods = await paymentService.getPaymentMethods(currentUser.uid);
      setPaymentMethods(methods);

      if (methods.length > 0) {
        setSelectedPaymentMethod(methods[0].id);
      } else {
        setShowNewCardForm(true);
      }
    } catch (error) {
      console.error("Error loading payment methods:", error);
    }
  };

  const createPaymentIntent = async () => {
    try {
      const intent = await paymentService.createPaymentIntent({
        bookingId: booking.id,
        totalAmount: booking.pricing.total,
        carId: booking.carId,
        renterId: booking.renterId,
        hostId: booking.hostId,
      });

      setPaymentIntent(intent);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      addNotification({
        type: "error",
        title: "Payment Error",
        message: "Failed to initialize payment. Please try again.",
      });
    }
  };

  const validateCardForm = () => {
    const newErrors = {};

    if (
      !cardData.cardNumber ||
      !paymentMethodUtils.validateCardNumber(cardData.cardNumber)
    ) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = "Please enter expiry date in MM/YY format";
    }

    if (!cardData.cvv || !/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = "Please enter cardholder name";
    }

    if (!cardData.billingAddress.line1.trim()) {
      newErrors.billingAddress = "Please enter billing address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      formattedValue = paymentMethodUtils.formatCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substr(0, 5);
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").substr(0, 4);
    }

    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setCardData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: formattedValue,
        },
      }));
    } else {
      setCardData((prev) => ({
        ...prev,
        [field]: formattedValue,
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const processPayment = async () => {
    if (!paymentIntent) {
      addNotification({
        type: "error",
        title: "Payment Error",
        message: "Payment not initialized. Please refresh and try again.",
      });
      return;
    }

    setLoading(true);

    try {
      let paymentMethodId = selectedPaymentMethod;

      // If using new card, create payment method first
      if (showNewCardForm) {
        if (!validateCardForm()) {
          setLoading(false);
          return;
        }

        const stripe = await paymentService.getStripe();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: {
            number: cardData.cardNumber.replace(/\s/g, ""),
            exp_month: parseInt(cardData.expiryDate.split("/")[0]),
            exp_year: parseInt("20" + cardData.expiryDate.split("/")[1]),
            cvc: cardData.cvv,
          },
          billing_details: {
            name: cardData.cardholderName,
            address: cardData.billingAddress,
          },
        });

        if (error) {
          throw new Error(error.message);
        }

        paymentMethodId = paymentMethod.id;
      }

      // Confirm payment
      const confirmedPayment = await paymentService.confirmPayment(
        paymentIntent.client_secret,
        paymentMethodId,
      );

      if (confirmedPayment.status === "succeeded") {
        // Update booking status
        await bookingService.updateBookingStatus(booking.id, "approved", {
          paymentStatus: "paid",
          paymentIntentId: confirmedPayment.id,
          paidAmount: booking.pricing.total,
          paidAt: new Date(),
        });

        addNotification({
          type: "success",
          title: "Payment Successful!",
          message: "Your booking has been confirmed and payment processed.",
        });

        onPaymentSuccess(confirmedPayment);
      } else {
        throw new Error("Payment was not successful");
      }
    } catch (error) {
      console.error("Payment error:", error);
      addNotification({
        type: "error",
        title: "Payment Failed",
        message: error.message || "Payment failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date.toDate ? date.toDate() : date).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>

        <div className="flex items-center space-x-4 mb-4">
          <img
            src={
              booking.carDetails?.image ||
              "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
            }
            alt={`${booking.carDetails?.make} ${booking.carDetails?.model}`}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-medium text-gray-900">
              {booking.carDetails?.year} {booking.carDetails?.make}{" "}
              {booking.carDetails?.model}
            </h4>
            <p className="text-gray-600">
              {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>
              ${booking.pricing.dailyRate} × {booking.pricing.days} days
            </span>
            <span>${booking.pricing.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>${booking.pricing.serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Protection plan</span>
            <span>${booking.pricing.protectionFee.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>${booking.pricing.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>

        {/* Existing Payment Methods */}
        {paymentMethods.length > 0 && !showNewCardForm && (
          <div className="space-y-3 mb-4">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedPaymentMethod === method.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  checked={selectedPaymentMethod === method.id}
                  onChange={() => setSelectedPaymentMethod(method.id)}
                  className="sr-only"
                />
                <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {paymentMethodUtils.formatCardDetails(method)}
                  </p>
                  {paymentMethodUtils.isCardExpired(method) && (
                    <p className="text-sm text-red-600">Expired</p>
                  )}
                </div>
                {selectedPaymentMethod === method.id && (
                  <CheckCircle className="w-5 h-5 text-primary-600" />
                )}
              </label>
            ))}
          </div>
        )}

        {/* Add New Card Button */}
        {!showNewCardForm && (
          <Button
            variant="outline"
            onClick={() => setShowNewCardForm(true)}
            icon={<CreditCard className="w-4 h-4" />}
            className="w-full"
          >
            Add New Card
          </Button>
        )}

        {/* New Card Form */}
        {showNewCardForm && (
          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Add New Card</h4>
              {paymentMethods.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewCardForm(false)}
                >
                  Cancel
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Card Number"
                  value={cardData.cardNumber}
                  onChange={(e) =>
                    handleCardInputChange("cardNumber", e.target.value)
                  }
                  placeholder="1234 5678 9012 3456"
                  error={errors.cardNumber}
                  maxLength={23}
                />
              </div>

              <Input
                label="Expiry Date"
                value={cardData.expiryDate}
                onChange={(e) =>
                  handleCardInputChange("expiryDate", e.target.value)
                }
                placeholder="MM/YY"
                error={errors.expiryDate}
                maxLength={5}
              />

              <Input
                label="CVV"
                value={cardData.cvv}
                onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                placeholder="123"
                error={errors.cvv}
                maxLength={4}
              />

              <div className="md:col-span-2">
                <Input
                  label="Cardholder Name"
                  value={cardData.cardholderName}
                  onChange={(e) =>
                    handleCardInputChange("cardholderName", e.target.value)
                  }
                  placeholder="John Doe"
                  error={errors.cardholderName}
                />
              </div>

              <div className="md:col-span-2">
                <Input
                  label="Billing Address"
                  value={cardData.billingAddress.line1}
                  onChange={(e) =>
                    handleCardInputChange(
                      "billingAddress.line1",
                      e.target.value,
                    )
                  }
                  placeholder="123 Main Street"
                  error={errors.billingAddress}
                />
              </div>

              <Input
                label="City"
                value={cardData.billingAddress.city}
                onChange={(e) =>
                  handleCardInputChange("billingAddress.city", e.target.value)
                }
                placeholder="San Francisco"
              />

              <Input
                label="State"
                value={cardData.billingAddress.state}
                onChange={(e) =>
                  handleCardInputChange("billingAddress.state", e.target.value)
                }
                placeholder="CA"
              />

              <Input
                label="ZIP Code"
                value={cardData.billingAddress.postalCode}
                onChange={(e) =>
                  handleCardInputChange(
                    "billingAddress.postalCode",
                    e.target.value,
                  )
                }
                placeholder="94102"
              />
            </div>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Secure Payment</h4>
            <p className="text-sm text-blue-800">
              Your payment information is encrypted and secure. We use Stripe
              for processing payments and never store your card details on our
              servers.
            </p>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="text-sm text-gray-600">
        <p>
          By completing this booking, you agree to our{" "}
          <button className="text-primary-600 hover:underline">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-primary-600 hover:underline">
            Cancellation Policy
          </button>
          . Your card will be charged ${booking.pricing.total.toFixed(2)}.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          className="flex-1"
          onClick={processPayment}
          loading={loading}
          disabled={loading || (!selectedPaymentMethod && !showNewCardForm)}
          icon={<Lock className="w-4 h-4" />}
        >
          {loading
            ? "Processing..."
            : `Pay $${booking.pricing.total.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentCheckout;
