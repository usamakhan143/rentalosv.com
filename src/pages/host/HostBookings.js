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
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  DollarSign,
  Star,
  Filter,
  Download,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { bookingService } from "../../services/booking";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Modal, { ConfirmModal } from "../../components/ui/Modal";
import Input, { TextArea, Select } from "../../components/ui/Input";

const HostBookings = () => {
  const { currentUser } = useAuth();
  const { addNotification } = useApp();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [responseModal, setResponseModal] = useState({
    isOpen: false,
    booking: null,
    action: null,
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    active: 0,
    completed: 0,
    revenue: 0,
  });

  const tabs = [
    { id: "all", label: "All Bookings", count: bookings.length },
    {
      id: "pending",
      label: "Pending",
      count: bookings.filter((b) => b.status === "pending").length,
    },
    {
      id: "upcoming",
      label: "Upcoming",
      count: bookings.filter((b) => b.status === "approved").length,
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

      const hostBookings = await bookingService.getBookingsByHost(
        currentUser.uid,
      );
      setBookings(hostBookings);

      // Calculate stats
      const bookingStats = await bookingService.getHostBookingStats(
        currentUser.uid,
      );
      setStats(bookingStats);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      addNotification({
        type: "error",
        title: "Error loading bookings",
        message: "Failed to load your bookings. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFilteredBookings = () => {
    switch (activeTab) {
      case "pending":
        return bookings.filter((b) => b.status === "pending");
      case "upcoming":
        return bookings.filter((b) => b.status === "approved");
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
          text: "Awaiting Response",
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
          icon: XCircle,
          text: "Cancelled",
        };
      case "in_progress":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: Car,
          text: "Trip in Progress",
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

  const handleBookingResponse = async () => {
    if (!responseModal.booking || !responseModal.action) return;

    setActionLoading(responseModal.booking.id);

    try {
      if (responseModal.action === "approve") {
        await bookingService.approveBooking(
          responseModal.booking.id,
          responseMessage,
        );

        setBookings(
          bookings.map((b) =>
            b.id === responseModal.booking.id
              ? { ...b, status: "approved", hostMessage: responseMessage }
              : b,
          ),
        );

        addNotification({
          type: "success",
          title: "Booking approved",
          message: "The booking request has been approved.",
        });
      } else if (responseModal.action === "decline") {
        await bookingService.declineBooking(
          responseModal.booking.id,
          responseMessage,
        );

        setBookings(
          bookings.map((b) =>
            b.id === responseModal.booking.id
              ? { ...b, status: "declined", declineReason: responseMessage }
              : b,
          ),
        );

        addNotification({
          type: "success",
          title: "Booking declined",
          message: "The booking request has been declined.",
        });
      }

      setResponseModal({ isOpen: false, booking: null, action: null });
      setResponseMessage("");
    } catch (error) {
      console.error("Error responding to booking:", error);
      addNotification({
        type: "error",
        title: "Action failed",
        message: "Failed to respond to booking. Please try again.",
      });
    } finally {
      setActionLoading(null);
    }
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

  const calculateHostEarnings = (pricing) => {
    if (!pricing) return 0;
    // Host gets 85% of subtotal (after service fee and protection fee)
    return (pricing.subtotal * 0.85).toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Loading bookings...
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
          <h1 className="text-3xl font-bold text-gray-900">Booking Requests</h1>
          <p className="text-gray-600 mt-2">
            Manage incoming booking requests and track your trips
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.approved}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <Car className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Trips
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.active}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.totalRevenue?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>
          </div>
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

        {/* Bookings List */}
        {getFilteredBookings().length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === "all"
                ? "No bookings yet"
                : `No ${activeTab} bookings`}
            </h2>
            <p className="text-gray-600 mb-6">
              {activeTab === "all"
                ? "Bookings will appear here when renters request your cars"
                : `You don't have any ${activeTab} bookings`}
            </p>
            {activeTab === "all" && (
              <Link to="/my-cars">
                <Button>Manage My Cars</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {getFilteredBookings().map((booking) => {
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;
              const hostEarnings = calculateHostEarnings(booking.pricing);

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
                              booking.car?.images?.[0] ||
                              "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                            }
                            alt={`${booking.carDetails?.make} ${booking.carDetails?.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Booking Details */}
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

                                    <button
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                      <MessageCircle className="w-4 h-4 mr-3" />
                                      Message Renter
                                    </button>

                                    <button
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                      <Download className="w-4 h-4 mr-3" />
                                      Download Receipt
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
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
                              <User className="w-4 h-4 mr-2" />
                              <span>Renter: {booking.renterDetails?.name}</span>
                            </div>

                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>
                                {booking.pickupLocation?.city},{" "}
                                {booking.pickupLocation?.state}
                              </span>
                            </div>
                          </div>

                          {/* Renter Message */}
                          {booking.renterMessage && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-900 mb-1">
                                Message from renter:
                              </h4>
                              <p className="text-sm text-gray-700">
                                {booking.renterMessage}
                              </p>
                            </div>
                          )}

                          {/* Pricing */}
                          <div className="pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-600">
                                {booking.pricing?.days} days • $
                                {booking.pricing?.dailyRate}/day
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-gray-900">
                                  ${hostEarnings}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Your earnings
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-4 flex space-x-3">
                            {booking.status === "pending" && (
                              <div className="flex space-x-3">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    setResponseModal({
                                      isOpen: true,
                                      booking,
                                      action: "approve",
                                    })
                                  }
                                  loading={actionLoading === booking.id}
                                  disabled={actionLoading === booking.id}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setResponseModal({
                                      isOpen: true,
                                      booking,
                                      action: "decline",
                                    })
                                  }
                                  loading={actionLoading === booking.id}
                                  disabled={actionLoading === booking.id}
                                >
                                  Decline
                                </Button>
                              </div>
                            )}

                            {booking.status === "approved" && (
                              <div className="flex space-x-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  icon={<Phone className="w-4 h-4" />}
                                >
                                  Call Renter
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  icon={<MessageCircle className="w-4 h-4" />}
                                >
                                  Message
                                </Button>
                              </div>
                            )}

                            {booking.status === "in_progress" && (
                              <div className="flex space-x-3">
                                <Button size="sm" variant="outline">
                                  Check Trip Status
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

        {/* Response Modal */}
        <Modal
          isOpen={responseModal.isOpen}
          onClose={() => {
            setResponseModal({ isOpen: false, booking: null, action: null });
            setResponseMessage("");
          }}
          title={
            responseModal.action === "approve"
              ? "Approve Booking"
              : "Decline Booking"
          }
          size="md"
        >
          {responseModal.booking && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    responseModal.booking.car?.images?.[0] ||
                    "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  }
                  alt={`${responseModal.booking.carDetails?.make} ${responseModal.booking.carDetails?.model}`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">
                    {responseModal.booking.carDetails?.year}{" "}
                    {responseModal.booking.carDetails?.make}{" "}
                    {responseModal.booking.carDetails?.model}
                  </h3>
                  <p className="text-gray-500">
                    Requested by {responseModal.booking.renterDetails?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(responseModal.booking.startDate)} -{" "}
                    {formatDate(responseModal.booking.endDate)}
                  </p>
                </div>
              </div>

              <TextArea
                label={
                  responseModal.action === "approve"
                    ? "Message to renter (optional)"
                    : "Reason for declining (optional)"
                }
                placeholder={
                  responseModal.action === "approve"
                    ? "Welcome! Here are some details about the pickup..."
                    : "I apologize, but I need to decline this request because..."
                }
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows={4}
              />

              {responseModal.action === "approve" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <h4 className="font-medium text-green-900">
                      Booking Details
                    </h4>
                  </div>
                  <div className="text-sm text-green-800">
                    <p>
                      Your earnings: $
                      {calculateHostEarnings(responseModal.booking.pricing)}
                    </p>
                    <p>
                      Trip duration: {responseModal.booking.pricing?.days} days
                    </p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setResponseModal({
                      isOpen: false,
                      booking: null,
                      action: null,
                    });
                    setResponseMessage("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleBookingResponse}
                  variant={
                    responseModal.action === "decline" ? "danger" : "primary"
                  }
                >
                  {responseModal.action === "approve"
                    ? "Approve Booking"
                    : "Decline Booking"}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default HostBookings;
