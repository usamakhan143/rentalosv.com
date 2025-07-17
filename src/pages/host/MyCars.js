import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Car,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Settings,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { carService } from "../../services/firestore";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Modal, { ConfirmModal } from "../../components/ui/Modal";

const MyCars = () => {
  const { currentUser } = useAuth();
  const { addNotification } = useApp();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    carId: null,
  });
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    fetchMyCars();
  }, [currentUser]);

  const fetchMyCars = async () => {
    try {
      if (!currentUser) return;

      const userCars = await carService.getCarsByOwner(currentUser.uid);
      setCars(userCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      addNotification({
        type: "error",
        title: "Error loading cars",
        message: "Failed to load your cars. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async () => {
    try {
      await carService.deleteCar(deleteModal.carId);
      setCars(cars.filter((car) => car.id !== deleteModal.carId));

      addNotification({
        type: "success",
        title: "Car deleted",
        message: "Your car has been successfully removed.",
      });
    } catch (error) {
      console.error("Error deleting car:", error);
      addNotification({
        type: "error",
        title: "Delete failed",
        message: "Failed to delete the car. Please try again.",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "pending_approval":
        return "Pending Approval";
      case "inactive":
        return "Inactive";
      case "suspended":
        return "Suspended";
      default:
        return "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Loading your cars...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Cars</h1>
            <p className="text-gray-600 mt-2">
              Manage your car listings and track performance
            </p>
          </div>

          <Link to="/add-car">
            <Button icon={<Plus className="w-5 h-5" />}>Add New Car</Button>
          </Link>
        </div>

        {/* Stats Overview */}
        {cars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center">
                <Car className="w-8 h-8 text-primary-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Cars
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {cars.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center">
                <Car className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {cars.filter((car) => car.status === "active").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {cars.reduce(
                      (total, car) => total + (car.bookings || 0),
                      0,
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Avg Rating
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {cars.length > 0
                      ? (
                          cars.reduce(
                            (total, car) => total + (car.rating || 0),
                            0,
                          ) / cars.length
                        ).toFixed(1)
                      : "0.0"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cars Grid */}
        {cars.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No cars listed yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start earning by sharing your car with the community
            </p>
            <Link to="/add-car">
              <Button icon={<Plus className="w-5 h-5" />}>
                List Your First Car
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-video">
                  <img
                    src={
                      car.images?.[0] ||
                      "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    }
                    alt={`${car.specs?.make} ${car.specs?.model}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(car.status)}`}
                    >
                      {getStatusText(car.status)}
                    </span>
                  </div>

                  {/* Actions Dropdown */}
                  <div className="absolute top-3 right-3">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === car.id ? null : car.id,
                          )
                        }
                        className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-700" />
                      </button>

                      {activeDropdown === car.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10">
                          <Link
                            to={`/cars/${car.id}`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Eye className="w-4 h-4 mr-3" />
                            View Details
                          </Link>
                          <Link
                            to={`/edit-car/${car.id}`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Edit className="w-4 h-4 mr-3" />
                            Edit Car
                          </Link>
                          <button
                            onClick={() => {
                              setDeleteModal({ isOpen: true, carId: car.id });
                              setActiveDropdown(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-3" />
                            Delete Car
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {car.specs?.year} {car.specs?.make} {car.specs?.model}
                    </h3>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        ${car.pricing?.dailyRate || 0}
                      </p>
                      <p className="text-sm text-gray-500">per day</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {car.location?.city}, {car.location?.state}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{car.bookings || 0} bookings</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      <span>
                        {car.rating || 0} ({car.reviews?.length || 0})
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <Link
                      to={`/edit-car/${car.id}`}
                      className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Manage
                    </Link>
                    <Link
                      to={`/cars/${car.id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View Listing →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Click outside to close dropdown */}
        {activeDropdown && (
          <div
            className="fixed inset-0 z-5"
            onClick={() => setActiveDropdown(null)}
          />
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, carId: null })}
          onConfirm={handleDeleteCar}
          title="Delete Car"
          message="Are you sure you want to delete this car? This action cannot be undone and will remove all associated bookings and reviews."
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
        />
      </div>
    </div>
  );
};

export default MyCars;
