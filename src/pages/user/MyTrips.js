import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { bookingService } from "../../services/booking";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const MyTrips = () => {
  const { currentUser } = useAuth();
  const { addNotification } = useApp();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [currentUser]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      if (!currentUser) return;

      // For demo purposes, we'll simulate empty bookings
      setTimeout(() => {
        setBookings([]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      addNotification({
        type: "error",
        title: "Error loading trips",
        message: "Failed to load your trips. Please try again.",
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" className="mb-4" style={{ color: '#003552' }} />
          <h2 className="text-xl font-semibold" style={{ color: '#003552' }}>
            Loading your trips...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#003552' }}>
            Trips
          </h1>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            {/* Car Illustration */}
            <div className="mb-8">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Fe5a7785f11ba42fcab2950ce1c0793f1?format=webp&width=800"
                alt="Car trip illustration"
                className="w-80 h-auto mx-auto"
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#003552' }}>
              No upcoming trips yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explore the world's largest car sharing marketplace and book your next trip.
            </p>
            
            <Button 
              className="inline-flex items-center px-8 py-3 rounded-lg font-medium text-white transition-colors"
              style={{ backgroundColor: '#003552' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#002a40'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#003552'}
              onClick={() => window.location.href = '/search'}
            >
              Start searching
            </Button>
          </div>
        ) : (
          /* Trips List - This would show actual trips when available */
          <div className="space-y-6">
            {bookings.map((booking) => (
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
                        <h3 className="text-lg font-semibold text-gray-900 truncate mb-2">
                          {booking.carDetails?.year} {booking.carDetails?.make} {booking.carDetails?.model}
                        </h3>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>
                            Pickup: {new Date(booking.startDate).toLocaleDateString()}
                          </div>
                          <div>
                            Return: {new Date(booking.endDate).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            {booking.pricing?.days} days • ${booking.pricing?.dailyRate}/day
                          </div>
                          <div className="text-lg font-semibold" style={{ color: '#003552' }}>
                            ${booking.pricing?.total?.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
