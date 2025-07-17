import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Car,
  User,
  Phone,
  MessageCircle,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  X,
  Navigation,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { bookingService } from "../../services/booking";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Modal, { ConfirmModal } from "../../components/ui/Modal";
import { TextArea } from "../../components/ui/Input";

const MyTrips = () => {
  const { currentUser } = useAuth();
  const { addNotification } = useApp();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cancelModal, setCancelModal] = useState({
    isOpen: false,
    booking: null,
  });
  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    booking: null,
  });
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
    wouldRecommend: true,
  });

  const tabs = [
    { id: "all", label: "All Trips", count: bookings.length },
    {
      id: "upcoming",
      label: "Upcoming",
      count: bookings.filter((b) => ["pending", "approved"].includes(b.status))
        .length,
    },
    {
      id: "active",
      label: "Active",
      count: bookings.filter((b) => b.status === "in_progress").length,
    },
    {
      id: "past",
      label: "Past",
      count: bookings.filter((b) =>
        ["completed", "cancelled"].includes(b.status),
      ).length,
    },
  ];

  useEffect(() => {
    fetchBookings();
  }, [currentUser]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      if (!currentUser) return;

      const userBookings = await bookingService.getBookingsByRenter(
        currentUser.uid,
      );
      setBookings(userBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      addNotification({
        type: "error",
        title: "Error loading trips",
        message: "Failed to load your trips. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFilteredBookings = () => {
    switch (activeTab) {
      case "upcoming":
        return bookings.filter((b) =>
          ["pending", "approved"].includes(b.status),
        );
      case "active":
        return bookings.filter((b) => b.status === "in_progress");
      case "past":
        return bookings.filter((b) =>
          ["completed", "cancelled"].includes(b.status),
        );
      default:
        return bookings;
    }
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
      case "declined":
        return {
          color: "bg-red-100 text-red-800",
          icon: XCircle,
          text: "Declined",
        };
      case "cancelled":
        return {
          color: "bg-gray-100 text-gray-800",
          icon: X,
          text: "Cancelled",
        };
      case "in_progress":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: Navigation,
          text: "In Progress",
        };
      case "completed":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
          text: "Completed",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: AlertCircle,
          text: "Unknown",
        };
    }
  };

  const handleCancelBooking = async () => {
    try {
      await bookingService.cancelBooking(
        cancelModal.booking.id,
        "Cancelled by renter",
        "renter",
      );

      setBookings(
        bookings.map((b) =>
          b.id === cancelModal.booking.id ? { ...b, status: "cancelled" } : b,
        ),
      );

      addNotification({
        type: "success",
        title: "Booking cancelled",
        message: "Your booking has been successfully cancelled.",
      });

      setCancelModal({ isOpen: false, booking: null });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      addNotification({
        type: "error",
        title: "Cancellation failed",
        message: "Failed to cancel booking. Please try again.",
      });
    }
  };

  const handleSubmitReview = async () => {
    try {
      const booking = reviewModal.booking;

      await bookingService.submitReview(
        booking.id,
        {
          carId: booking.carId,
          userId: currentUser.uid,
          rating: reviewData.rating,
          comment: reviewData.comment,
          wouldRecommend: reviewData.wouldRecommend,
          userName: currentUser.displayName || "Anonymous",
        },
        "renter",
      );

      setBookings(
        bookings.map((b) =>
          b.id === booking.id ? { ...b, reviewSubmitted: true } : b,
        ),
      );

      addNotification({
        type: "success",
        title: "Review submitted",
        message: "Thank you for your feedback!",
      });

      setReviewModal({ isOpen: false, booking: null });
      setReviewData({ rating: 5, comment: "", wouldRecommend: true });
    } catch (error) {
      console.error("Error submitting review:", error);
      addNotification({
        type: "error",
        title: "Review failed",
        message: "Failed to submit review. Please try again.",
      });
    }
  };

  const canCancelBooking = (booking) => {
    const now = new Date();
    const tripStart = new Date(
      booking.startDate.toDate ? booking.startDate.toDate() : booking.startDate,
    );
    const hoursUntilTrip = (tripStart - now) / (1000 * 60 * 60);

    return (
      ["pending", "approved"].includes(booking.status) && hoursUntilTrip > 24
    );
  };

  const formatDate = (date) => {
    const d = new Date(date.toDate ? date.toDate() : date);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    const d = new Date(date.toDate ? date.toDate() : date);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Loading your trips...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-600 mt-2">
            Manage your bookings and view trip history
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span
                    className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.id
                        ? "bg-primary-100 text-primary-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Trips List */}
        {getFilteredBookings().length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === "all" ? "No trips yet" : `No ${activeTab} trips`}
            </h2>
            <p className="text-gray-600 mb-6">
              {activeTab === "all"
                ? "Book your first car to start your journey"
                : `You don't have any ${activeTab} trips`}
            </p>
            {activeTab === "all" && (
              <Link to="/search">
                <Button>Find Cars</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {getFilteredBookings().map((booking) => {
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4 flex-1">
                        {/* Car Image */}
                        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={
                              booking.carDetails?.image ||
                              "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                            }
                            alt={`${booking.carDetails?.make} ${booking.carDetails?.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Trip Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {booking.carDetails?.year}{" "}
                              {booking.carDetails?.make}{" "}
                              {booking.carDetails?.model}
                            </h3>

                            <div className="flex items-center space-x-3">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}
                              >
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig.text}
                              </span>

                              <div className="relative">
                                <button
                                  onClick={() =>
                                    setActiveDropdown(
                                      activeDropdown === booking.id
                                        ? null
                                        : booking.id,
                                    )
                                  }
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <MoreVertical className="w-4 h-4 text-gray-600" />
                                </button>

                                {activeDropdown === booking.id && (
                                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10">
                                    <Link
                                      to={`/cars/${booking.carId}`}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <Eye className="w-4 h-4 mr-3" />
                                      View Car Details
                                    </Link>
                                    <Link
                                      to={`/trip/${booking.id}`}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <Eye className="w-4 h-4 mr-3" />
                                      View Trip Details
                                    </Link>

                                    {booking.host && (
                                      <button
                                        onClick={() => setActiveDropdown(null)}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                      >
                                        <MessageCircle className="w-4 h-4 mr-3" />
                                        Message Host
                                      </button>
                                    )}

                                    {canCancelBooking(booking) && (
                                      <button
                                        onClick={() => {
                                          setCancelModal({
                                            isOpen: true,
                                            booking,
                                          });
                                          setActiveDropdown(null);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                      >
                                        <X className="w-4 h-4 mr-3" />
                                        Cancel Trip
                                      </button>
                                    )}

                                    {booking.status === "completed" &&
                                      !booking.reviewSubmitted && (
                                        <button
                                          onClick={() => {
                                            setReviewModal({
                                              isOpen: true,
                                              booking,
                                            });
                                            setActiveDropdown(null);
                                          }}
                                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                          <Star className="w-4 h-4 mr-3" />
                                          Write Review
                                        </button>
                                      )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              <div>
                                <div>
                                  Pickup: {formatDate(booking.startDate)} at{" "}
                                  {formatTime(booking.startDate)}
                                </div>
                                <div>
                                  Return: {formatDate(booking.endDate)} at{" "}
                                  {formatTime(booking.endDate)}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>
                                {booking.pickupLocation?.city},{" "}
                                {booking.pickupLocation?.state}
                              </span>
                            </div>

                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              <span>Host: {booking.hostDetails?.name}</span>
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-600">
                                {booking.pricing?.days} days • $
                                {booking.pricing?.dailyRate}/day
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-gray-900">
                                  ${booking.pricing?.total?.toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Total
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-4 flex space-x-3">
                            {booking.status === "pending" && (
                              <div className="text-sm text-gray-600">
                                Waiting for host approval...
                              </div>
                            )}

                            {booking.status === "approved" && (
                              <div className="flex space-x-3">
                                <Button size="sm" variant="outline">
                                  View Directions
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  icon={<Phone className="w-4 h-4" />}
                                >
                                  Call Host
                                </Button>
                              </div>
                            )}

                            {booking.status === "in_progress" && (
                              <div className="flex space-x-3">
                                <Button size="sm" variant="outline">
                                  End Trip
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  icon={<Phone className="w-4 h-4" />}
                                >
                                  Emergency
                                </Button>
                              </div>
                            )}

                            {booking.status === "completed" &&
                              !booking.reviewSubmitted && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setReviewModal({ isOpen: true, booking })
                                  }
                                >
                                  Write Review
                                </Button>
                              )}

                            <Link to={`/trip/${booking.id}`}>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Click outside to close dropdown */}
        {activeDropdown && (
          <div
            className="fixed inset-0 z-5"
            onClick={() => setActiveDropdown(null)}
          />
        )}

        {/* Cancel Booking Modal */}
        <ConfirmModal
          isOpen={cancelModal.isOpen}
          onClose={() => setCancelModal({ isOpen: false, booking: null })}
          onConfirm={handleCancelBooking}
          title="Cancel Booking"
          message="Are you sure you want to cancel this booking? This action cannot be undone and cancellation fees may apply."
          confirmText="Cancel Booking"
          cancelText="Keep Booking"
          type="danger"
        />

        {/* Review Modal */}
        <Modal
          isOpen={reviewModal.isOpen}
          onClose={() => setReviewModal({ isOpen: false, booking: null })}
          title="Write a Review"
          size="md"
        >
          {reviewModal.booking && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    reviewModal.booking.carDetails?.image ||
                    "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  }
                  alt={`${reviewModal.booking.carDetails?.make} ${reviewModal.booking.carDetails?.model}`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">
                    {reviewModal.booking.carDetails?.year}{" "}
                    {reviewModal.booking.carDetails?.make}{" "}
                    {reviewModal.booking.carDetails?.model}
                  </h3>
                  <p className="text-gray-500">
                    {formatDate(reviewModal.booking.startDate)} -{" "}
                    {formatDate(reviewModal.booking.endDate)}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        setReviewData({ ...reviewData, rating: star })
                      }
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= reviewData.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <TextArea
                label="Your Review"
                placeholder="Share your experience with this car..."
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({ ...reviewData, comment: e.target.value })
                }
                rows={4}
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="wouldRecommend"
                  checked={reviewData.wouldRecommend}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      wouldRecommend: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="wouldRecommend"
                  className="ml-2 text-sm text-gray-700"
                >
                  I would recommend this car to others
                </label>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() =>
                    setReviewModal({ isOpen: false, booking: null })
                  }
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmitReview}
                  disabled={!reviewData.comment.trim()}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MyTrips;
