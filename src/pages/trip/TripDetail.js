import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  MessageCircle,
  Navigation,
  Camera,
  CheckCircle,
  AlertTriangle,
  Download,
  Share2,
  Flag,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { bookingService } from "../../services/booking";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Modal from "../../components/ui/Modal";
import TripCheckInOut from "../../components/trip/TripCheckInOut";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addNotification } = useApp();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "checkin", label: "Check-in" },
    { id: "checkout", label: "Check-out" },
    { id: "photos", label: "Photos" },
    { id: "support", label: "Support" },
  ];

  useEffect(() => {
    fetchTripDetails();
  }, [id, navigate, addNotification, currentUser.uid]);

  const fetchTripDetails = async () => {
    try {
      setLoading(true);
      const bookingData = await bookingService.getBookingById(id);

      if (!bookingData) {
        addNotification({
          type: "error",
          title: "Trip not found",
          message: "The trip you are looking for does not exist.",
        });
        navigate("/my-trips");
        return;
      }

      // Check if user has access to this trip
      if (
        bookingData.renterId !== currentUser.uid &&
        bookingData.hostId !== currentUser.uid
      ) {
        addNotification({
          type: "error",
          title: "Access denied",
          message: "You do not have permission to view this trip.",
        });
        navigate("/my-trips");
        return;
      }

      setBooking(bookingData);
    } catch (error) {
      console.error("Error fetching trip details:", error);
      addNotification({
        type: "error",
        title: "Error loading trip",
        message: "Failed to load trip details. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckInComplete = (checkInData) => {
    setBooking({
      ...booking,
      status: "in_progress",
      checkInCompleted: true,
      checkInData,
    });
    setShowCheckInModal(false);
    addNotification({
      type: "success",
      title: "Check-in completed",
      message: "Your trip has started successfully!",
    });
  };

  const handleCheckOutComplete = (checkOutData) => {
    setBooking({
      ...booking,
      status: "completed",
      checkOutCompleted: true,
      checkOutData,
    });
    setShowCheckOutModal(false);
    addNotification({
      type: "success",
      title: "Trip completed",
      message: "Thank you for using CarShare!",
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: Clock,
          text: "Pending Approval",
        };
      case "approved":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
          text: "Approved",
        };
      case "in_progress":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: Navigation,
          text: "Trip in Progress",
        };
      case "completed":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
          text: "Completed",
        };
      case "cancelled":
        return {
          color: "bg-gray-100 text-gray-800",
          icon: AlertTriangle,
          text: "Cancelled",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: AlertTriangle,
          text: "Unknown",
        };
    }
  };

  const formatDate = (date) => {
    return new Date(date.toDate ? date.toDate() : date).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
  };

  const formatTime = (date) => {
    return new Date(date.toDate ? date.toDate() : date).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      },
    );
  };

  const isRenter = currentUser?.uid === booking?.renterId;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Loading trip details...
          </h2>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Trip not found
          </h2>
          <p className="text-gray-600 mb-4">
            The trip you are looking for does not exist.
          </p>
          <Button onClick={() => navigate("/my-trips")}>
            Back to My Trips
          </Button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(booking.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/my-trips")}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Trips
              </button>

              <div className="h-6 border-l border-gray-300"></div>

              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}
              >
                <StatusIcon className="w-4 h-4 mr-1" />
                {statusConfig.text}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                icon={<Share2 className="w-4 h-4" />}
              >
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<Download className="w-4 h-4" />}
              >
                Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Trip Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    booking.carDetails?.image ||
                    "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  }
                  alt={`${booking.carDetails?.make} ${booking.carDetails?.model}`}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {booking.carDetails?.year} {booking.carDetails?.make}{" "}
                    {booking.carDetails?.model}
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {formatDate(booking.startDate)} -{" "}
                        {formatDate(booking.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>
                        {booking.pickupLocation?.city},{" "}
                        {booking.pickupLocation?.state}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>
                        {formatTime(booking.startDate)} -{" "}
                        {formatTime(booking.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>
                        {isRenter
                          ? `Host: ${booking.hostDetails?.name}`
                          : `Renter: ${booking.renterDetails?.name}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 text-sm font-medium border-b-2 ${
                        activeTab === tab.id
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Trip Timeline
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              booking.status !== "pending"
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <CheckCircle
                              className={`w-5 h-5 ${
                                booking.status !== "pending"
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium">Booking Confirmed</p>
                            <p className="text-sm text-gray-500">
                              {booking.createdAt
                                ? formatDate(booking.createdAt)
                                : "Confirmed"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              booking.checkInCompleted
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <Car
                              className={`w-5 h-5 ${
                                booking.checkInCompleted
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium">Trip Started</p>
                            <p className="text-sm text-gray-500">
                              {booking.checkInCompleted
                                ? "Check-in completed"
                                : "Pending check-in"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              booking.checkOutCompleted
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <CheckCircle
                              className={`w-5 h-5 ${
                                booking.checkOutCompleted
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium">Trip Completed</p>
                            <p className="text-sm text-gray-500">
                              {booking.checkOutCompleted
                                ? "Check-out completed"
                                : "Pending check-out"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    {booking.renterMessage && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Message from Renter
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700">
                            {booking.renterMessage}
                          </p>
                        </div>
                      </div>
                    )}

                    {booking.hostMessage && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Message from Host
                        </h3>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-gray-700">{booking.hostMessage}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Check-in Tab */}
                {activeTab === "checkin" && (
                  <div>
                    {booking.checkInCompleted ? (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Check-in Details
                        </h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <p className="text-green-800">
                            ✓ Check-in completed on{" "}
                            {formatDate(booking.checkInData?.timestamp)}
                          </p>
                        </div>
                        {booking.checkInData && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Mileage
                              </label>
                              <p className="text-lg">
                                {booking.checkInData.mileage} miles
                              </p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Fuel Level
                              </label>
                              <p className="text-lg">
                                {booking.checkInData.fuelLevel}%
                              </p>
                            </div>
                            {booking.checkInData.damageNotes && (
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                  Damage Notes
                                </label>
                                <p className="text-gray-700">
                                  {booking.checkInData.damageNotes}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Check-in Required
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Complete the check-in process to start your trip
                        </p>
                        {isRenter && booking.status === "approved" && (
                          <Button onClick={() => setShowCheckInModal(true)}>
                            Start Check-in
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Check-out Tab */}
                {activeTab === "checkout" && (
                  <div>
                    {booking.checkOutCompleted ? (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Check-out Details
                        </h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <p className="text-green-800">
                            ✓ Check-out completed on{" "}
                            {formatDate(booking.checkOutData?.timestamp)}
                          </p>
                        </div>
                        {booking.checkOutData && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Final Mileage
                              </label>
                              <p className="text-lg">
                                {booking.checkOutData.mileage} miles
                              </p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Fuel Level
                              </label>
                              <p className="text-lg">
                                {booking.checkOutData.fuelLevel}%
                              </p>
                            </div>
                            {booking.checkOutData.damageNotes && (
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                  Damage Notes
                                </label>
                                <p className="text-gray-700">
                                  {booking.checkOutData.damageNotes}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : booking.status === "in_progress" ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Check-out Required
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Complete the check-out process to end your trip
                        </p>
                        {isRenter && (
                          <Button onClick={() => setShowCheckOutModal(true)}>
                            Start Check-out
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">
                          Check-out will be available when trip is in progress
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Photos Tab */}
                {activeTab === "photos" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Trip Photos</h3>
                    {booking.checkInData?.photos ||
                    booking.checkOutData?.photos ? (
                      <div className="space-y-6">
                        {booking.checkInData?.photos && (
                          <div>
                            <h4 className="font-medium mb-3">
                              Check-in Photos
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {booking.checkInData.photos.map(
                                (photo, index) => (
                                  <div
                                    key={index}
                                    className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
                                  >
                                    <img
                                      src={photo.preview || photo.url}
                                      alt={`Check-in ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                        {booking.checkOutData?.photos && (
                          <div>
                            <h4 className="font-medium mb-3">
                              Check-out Photos
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {booking.checkOutData.photos.map(
                                (photo, index) => (
                                  <div
                                    key={index}
                                    className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
                                  >
                                    <img
                                      src={photo.preview || photo.url}
                                      alt={`Check-out ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">No photos available yet</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Support Tab */}
                {activeTab === "support" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Get Help</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          icon={<Phone className="w-4 h-4" />}
                        >
                          Emergency Support
                        </Button>
                        <Button
                          variant="outline"
                          icon={<MessageCircle className="w-4 h-4" />}
                        >
                          Contact Host/Renter
                        </Button>
                        <Button
                          variant="outline"
                          icon={<Flag className="w-4 h-4" />}
                        >
                          Report Issue
                        </Button>
                        <Button
                          variant="outline"
                          icon={<Download className="w-4 h-4" />}
                        >
                          Download Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Pricing Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>
                    ${booking.pricing?.dailyRate} × {booking.pricing?.days} days
                  </span>
                  <span>${booking.pricing?.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${booking.pricing?.serviceFee?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Protection plan</span>
                  <span>${booking.pricing?.protectionFee?.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${booking.pricing?.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {isRenter &&
                  booking.status === "approved" &&
                  !booking.checkInCompleted && (
                    <Button
                      className="w-full"
                      onClick={() => setShowCheckInModal(true)}
                      icon={<Car className="w-4 h-4" />}
                    >
                      Start Check-in
                    </Button>
                  )}

                {isRenter &&
                  booking.status === "in_progress" &&
                  !booking.checkOutCompleted && (
                    <Button
                      className="w-full"
                      onClick={() => setShowCheckOutModal(true)}
                      icon={<CheckCircle className="w-4 h-4" />}
                    >
                      Start Check-out
                    </Button>
                  )}

                <Button
                  variant="outline"
                  className="w-full"
                  icon={<Phone className="w-4 h-4" />}
                >
                  {isRenter ? "Call Host" : "Call Renter"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  icon={<MessageCircle className="w-4 h-4" />}
                >
                  Send Message
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  icon={<Navigation className="w-4 h-4" />}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Check-in Modal */}
      <Modal
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        title="Trip Check-in"
        size="xl"
      >
        <TripCheckInOut
          booking={booking}
          isCheckIn={true}
          onComplete={handleCheckInComplete}
        />
      </Modal>

      {/* Check-out Modal */}
      <Modal
        isOpen={showCheckOutModal}
        onClose={() => setShowCheckOutModal(false)}
        title="Trip Check-out"
        size="xl"
      >
        <TripCheckInOut
          booking={booking}
          isCheckIn={false}
          onComplete={handleCheckOutComplete}
        />
      </Modal>
    </div>
  );
};

export default TripDetail;
