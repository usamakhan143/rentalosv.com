import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  MapPin,
  Users,
  Shield,
  Car as CarIcon,
  Fuel,
  Settings,
  CheckCircle,
  AlertTriangle,
  MessageCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import {
  carService,
  userService,
  reviewService,
} from "../../services/firestore";
import { bookingService } from "../../services/booking";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Modal from "../../components/ui/Modal";
import { TextArea } from "../../components/ui/Input";
import PaymentCheckout from "../../components/payment/PaymentCheckout";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addNotification } = useApp();

  const [car, setCar] = useState(null);
  const [host, setHost] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    startTime: "10:00",
    endTime: "10:00",
    message: "",
  });

  const [pricing, setPricing] = useState({
    days: 0,
    dailyRate: 0,
    totalDays: 0,
    subtotal: 0,
    serviceFee: 0,
    protectionFee: 0,
    total: 0,
  });

  useEffect(() => {
    fetchCarDetails();
  }, [id, navigate, addNotification]);

  useEffect(() => {
    if (car && bookingData.startDate && bookingData.endDate) {
      calculatePricing();
      checkAvailability();
    }
  }, [bookingData.startDate, bookingData.endDate, car]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);

      // Fetch car details
      const carData = await carService.getCarById(id);
      if (!carData) {
        addNotification({
          type: "error",
          title: "Car not found",
          message: "The car you are looking for does not exist.",
        });
        navigate("/search");
        return;
      }
      setCar(carData);

      // Fetch host details
      const hostData = await userService.getUserById(carData.ownerId);
      setHost(hostData);

      // Fetch reviews
      const carReviews = await reviewService.getReviewsByCarId(id);
      setReviews(carReviews);
    } catch (error) {
      console.error("Error fetching car details:", error);
      addNotification({
        type: "error",
        title: "Error loading car",
        message: "Failed to load car details. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculatePricing = () => {
    if (!car || !bookingData.startDate || !bookingData.endDate) {
      setPricing({
        days: 0,
        dailyRate: car?.pricing?.dailyRate || 0,
        totalDays: 0,
        subtotal: 0,
        serviceFee: 0,
        protectionFee: 0,
        total: 0,
      });
      return;
    }

    const calculatedPricing = bookingService.calculatePricing(
      car,
      bookingData.startDate,
      bookingData.endDate,
    );

    setPricing(calculatedPricing);
  };

  const checkAvailability = async () => {
    if (!car || !bookingData.startDate || !bookingData.endDate) {
      setAvailabilityChecked(false);
      return;
    }

    try {
      const available = await bookingService.checkAvailability(
        car.id,
        bookingData.startDate,
        bookingData.endDate,
      );
      setIsAvailable(available);
      setAvailabilityChecked(true);
    } catch (error) {
      console.error("Error checking availability:", error);
      setIsAvailable(false);
      setAvailabilityChecked(true);
    }
  };

  const handleBooking = async () => {
    if (!currentUser) {
      addNotification({
        type: "info",
        title: "Sign in required",
        message: "Please sign in to book this car.",
      });
      navigate("/login");
      return;
    }

    if (!bookingData.startDate || !bookingData.endDate) {
      addNotification({
        type: "error",
        title: "Missing dates",
        message: "Please select pickup and return dates.",
      });
      return;
    }

    if (!isAvailable) {
      addNotification({
        type: "error",
        title: "Car not available",
        message: "This car is not available for your selected dates.",
      });
      return;
    }

    // Check if user is trying to book their own car
    if (currentUser.uid === car.ownerId) {
      addNotification({
        type: "error",
        title: "Cannot book own car",
        message: "You cannot book your own car.",
      });
      return;
    }

    setBookingLoading(true);

    try {
      // Create the booking
      const newBooking = await bookingService.createBooking({
        carId: car.id,
        renterId: currentUser.uid,
        hostId: car.ownerId,
        startDate: new Date(
          bookingData.startDate + "T" + bookingData.startTime,
        ),
        endDate: new Date(bookingData.endDate + "T" + bookingData.endTime),
        pricing: pricing,
        renterMessage: bookingData.message,
        carDetails: {
          make: car.specs?.make,
          model: car.specs?.model,
          year: car.specs?.year,
          licensePlate: car.specs?.licensePlate,
          image: car.images?.[0],
        },
        renterDetails: {
          name: `${currentUser.displayName || "User"}`,
          email: currentUser.email,
        },
        hostDetails: {
          name: `${host?.firstName} ${host?.lastName}`,
          email: host?.email,
        },
        pickupLocation: car.location,
      });

      if (car.availability?.instantBook) {
        // For instant book, proceed to payment
        setPendingBooking(newBooking);
        setShowBookingModal(false);
        setShowPaymentModal(true);
      } else {
        // For regular bookings, just notify
        addNotification({
          type: "success",
          title: "Booking request sent!",
          message:
            "Your booking request has been sent to the host for approval.",
        });

        setShowBookingModal(false);
        navigate("/my-trips");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      addNotification({
        type: "error",
        title: "Booking failed",
        message: error.message || "Failed to create booking. Please try again.",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    addNotification({
      type: "success",
      title: "Payment successful!",
      message: "Your booking has been confirmed and payment processed.",
    });

    setShowPaymentModal(false);
    setPendingBooking(null);
    navigate("/my-trips");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (car?.images?.length || 1) - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (car?.images?.length || 1) - 1 : prev - 1,
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Loading car details...
          </h2>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Car not found
          </h2>
          <p className="text-gray-600 mb-4">
            The car you are looking for does not exist.
          </p>
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFavorite(!favorite)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Heart
                  className={`w-5 h-5 ${favorite ? "text-red-500 fill-current" : ""}`}
                />
                <span>Save</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                {car.images && car.images.length > 0 ? (
                  <img
                    src={car.images[currentImageIndex]}
                    alt={`${car.specs?.make} ${car.specs?.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CarIcon className="w-24 h-24 text-gray-400" />
                  </div>
                )}

                {/* Navigation Arrows */}
                {car.images && car.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {car.images && car.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {car.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Grid */}
              {car.images && car.images.length > 1 && (
                <div className="grid grid-cols-6 gap-2 mt-4">
                  {car.images.slice(0, 6).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? "border-primary-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {car.specs?.year} {car.specs?.make} {car.specs?.model}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        {car.location?.city}, {car.location?.state}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      <span className="font-medium">{car.rating || 0}</span>
                      <span className="ml-1">({reviews.length} reviews)</span>
                    </div>
                  </div>
                </div>

                {car.availability?.instantBook && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Instant Book
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Seats</span>
                  <p className="font-semibold">{car.specs?.seats || 5}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Settings className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Transmission</span>
                  <p className="font-semibold capitalize">
                    {car.specs?.transmission}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Fuel className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Fuel</span>
                  <p className="font-semibold capitalize">
                    {car.specs?.fuelType}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <CarIcon className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <span className="text-sm text-gray-600">Mileage</span>
                  <p className="font-semibold">
                    {car.specs?.mileage?.toLocaleString()} mi
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {car.description}
                </p>
              </div>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Host Info */}
            {host && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Hosted by {host.firstName}
                </h3>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    {host.avatar ? (
                      <img
                        src={host.avatar}
                        alt={host.firstName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-semibold text-gray-600">
                        {host.firstName?.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold">
                        {host.firstName} {host.lastName}
                      </h4>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm">4.9 host rating</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Joined{" "}
                      {new Date(
                        host.createdAt?.toDate?.() || host.createdAt,
                      ).getFullYear()}{" "}
                      • Typically responds within an hour
                    </p>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<MessageCircle className="w-4 h-4" />}
                      >
                        Message
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Phone className="w-4 h-4" />}
                      >
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rules */}
            {car.rules && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Trip Rules</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700">{car.rules}</p>
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  Reviews ({reviews.length})
                </h3>
                {reviews.length > 0 && (
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{car.rating}</span>
                    <span className="text-gray-500 ml-1">average rating</span>
                  </div>
                )}
              </div>

              {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No reviews yet</p>
              ) : (
                <div className="space-y-6">
                  {reviews.slice(0, 3).map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-600">
                            {review.userName?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-medium">
                              {review.userName || "Anonymous"}
                            </h5>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">
                            {new Date(
                              review.createdAt?.toDate?.() || review.createdAt,
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {reviews.length > 3 && (
                    <button className="text-primary-600 hover:text-primary-700 font-medium">
                      Show all {reviews.length} reviews
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  ${car.pricing?.dailyRate || 0}
                </div>
                <div className="text-gray-500">per day</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pick-up
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          startDate: e.target.value,
                        })
                      }
                      className="input-field text-sm"
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <input
                      type="time"
                      value={bookingData.startTime}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          startTime: e.target.value,
                        })
                      }
                      className="input-field text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Return
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={bookingData.endDate}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          endDate: e.target.value,
                        })
                      }
                      className="input-field text-sm"
                      min={
                        bookingData.startDate ||
                        new Date().toISOString().split("T")[0]
                      }
                    />
                    <input
                      type="time"
                      value={bookingData.endTime}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          endTime: e.target.value,
                        })
                      }
                      className="input-field text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Availability Status */}
              {availabilityChecked &&
                bookingData.startDate &&
                bookingData.endDate && (
                  <div
                    className={`mb-4 p-3 rounded-lg flex items-center ${
                      isAvailable
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {isAvailable ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          Available for selected dates
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          Not available for selected dates
                        </span>
                      </>
                    )}
                  </div>
                )}

              {/* Pricing Breakdown */}
              {pricing.days > 0 && (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>
                        ${pricing.dailyRate} × {pricing.days} days
                      </span>
                      <span>${pricing.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>${pricing.serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protection plan</span>
                      <span>${pricing.protectionFee.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                onClick={() => setShowBookingModal(true)}
                disabled={
                  !bookingData.startDate ||
                  !bookingData.endDate ||
                  !isAvailable ||
                  currentUser?.uid === car.ownerId
                }
              >
                {currentUser?.uid === car.ownerId
                  ? "Cannot book own car"
                  : car.availability?.instantBook
                    ? "Book Instantly"
                    : "Request to Book"}
              </Button>

              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  You won't be charged yet
                </p>
              </div>

              {/* Protection Info */}
              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Protection included</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Every trip includes insurance coverage and 24/7 roadside
                      assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Confirm Your Booking"
        size="md"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={
                car.images?.[0] ||
                "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              }
              alt={`${car.specs?.make} ${car.specs?.model}`}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">
                {car.specs?.year} {car.specs?.make} {car.specs?.model}
              </h3>
              <p className="text-gray-500">
                {car.location?.city}, {car.location?.state}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Pick-up</span>
                <p className="font-medium">
                  {new Date(bookingData.startDate).toLocaleDateString()} at{" "}
                  {bookingData.startTime}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Return</span>
                <p className="font-medium">
                  {new Date(bookingData.endDate).toLocaleDateString()} at{" "}
                  {bookingData.endTime}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>
                ${pricing.dailyRate} × {pricing.days} days
              </span>
              <span>${pricing.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>${pricing.serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Protection plan</span>
              <span>${pricing.protectionFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>${pricing.total.toFixed(2)}</span>
            </div>
          </div>

          <TextArea
            label="Message to host (optional)"
            placeholder="Tell the host about your trip..."
            value={bookingData.message}
            onChange={(e) =>
              setBookingData({ ...bookingData, message: e.target.value })
            }
            rows={3}
          />

          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowBookingModal(false)}
              disabled={bookingLoading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleBooking}
              loading={bookingLoading}
              disabled={bookingLoading}
            >
              {car.availability?.instantBook
                ? "Continue to Payment"
                : "Send Request"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setPendingBooking(null);
        }}
        title="Complete Your Booking"
        size="lg"
      >
        {pendingBooking && (
          <PaymentCheckout
            booking={pendingBooking}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={() => {
              setShowPaymentModal(false);
              setPendingBooking(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default CarDetail;
