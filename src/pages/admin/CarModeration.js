import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  AlertTriangle,
  Car,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

const CarModeration = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [reviewModal, setReviewModal] = useState({ open: false, car: null });
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...cars];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (car) =>
          car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.hostName?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((car) => car.status === filterStatus);
    }

    setFilteredCars(filtered);
  }, [cars, searchTerm, filterStatus]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const carsQuery = query(
        collection(db, "cars"),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(carsQuery);

      const carsData = [];
      for (const carDoc of snapshot.docs) {
        const carData = { id: carDoc.id, ...carDoc.data() };

        // Fetch host information
        if (carData.hostId) {
          const hostQuery = query(
            collection(db, "users"),
            where("uid", "==", carData.hostId),
          );
          const hostSnapshot = await getDocs(hostQuery);
          if (!hostSnapshot.empty) {
            const hostData = hostSnapshot.docs[0].data();
            carData.hostName = `${hostData.firstName} ${hostData.lastName}`;
            carData.hostEmail = hostData.email;
          }
        }

        // Fetch booking count
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("carId", "==", carDoc.id),
        );
        const bookingsSnapshot = await getDocs(bookingsQuery);
        carData.totalBookings = bookingsSnapshot.size;

        carsData.push(carData);
      }

      setCars(carsData);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCarAction = async (action, car, reason = "") => {
    try {
      const carRef = doc(db, "cars", car.id);

      const updateData = {
        status: action,
        moderatedAt: new Date(),
        moderatedBy: "admin", // In a real app, this would be the admin's ID
      };

      if (action === "rejected") {
        updateData.rejectionReason = reason;
      }

      await updateDoc(carRef, updateData);

      // Refresh cars list
      await fetchCars();
      setReviewModal({ open: false, car: null });
      setRejectionReason("");
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning-100 text-warning-800";
      case "approved":
        return "bg-success-100 text-success-800";
      case "rejected":
        return "bg-error-100 text-error-800";
      case "suspended":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const CarReviewModal = () => (
    <Modal
      isOpen={reviewModal.open}
      onClose={() => {
        setReviewModal({ open: false, car: null });
        setRejectionReason("");
      }}
      title="Review Car Listing"
      size="lg"
    >
      {reviewModal.car && (
        <div className="space-y-6">
          {/* Car Images */}
          {reviewModal.car.images && reviewModal.car.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {reviewModal.car.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${reviewModal.car.make} ${reviewModal.car.model}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Car Details */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Car Details
              </h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Make & Model</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {reviewModal.car.make} {reviewModal.car.model} (
                    {reviewModal.car.year})
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Category</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {reviewModal.car.category}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Location</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {reviewModal.car.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Price per day</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${reviewModal.car.pricePerDay}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Host Information
              </h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Host Name</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {reviewModal.car.hostName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {reviewModal.car.hostEmail}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Listed Date</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {reviewModal.car.createdAt?.toDate().toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Total Bookings</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {reviewModal.car.totalBookings}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-600">
              {reviewModal.car.description}
            </p>
          </div>

          {/* Features */}
          {reviewModal.car.features && reviewModal.car.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {reviewModal.car.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rejection Reason Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rejection Reason (if rejecting)
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setReviewModal({ open: false, car: null });
                setRejectionReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                handleCarAction("rejected", reviewModal.car, rejectionReason)
              }
              disabled={!rejectionReason}
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              variant="success"
              onClick={() => handleCarAction("approved", reviewModal.car)}
            >
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Car Moderation</h1>
        <p className="text-gray-600 mt-2">Review and approve car listings</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search cars, make, model, location, or host..."
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <div className="text-sm text-gray-600 self-center">
            Showing {filteredCars.length} of {cars.length} cars
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCars.map((car) => {
          const status = getStatusColor(car.status);
          return (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Car Image */}
              <div className="h-48 bg-gray-200 relative">
                {car.images && car.images[0] ? (
                  <img
                    src={car.images[0]}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status}`}
                  >
                    {car.status}
                  </span>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {car.make} {car.model} ({car.year})
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {car.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />${car.pricePerDay}
                    /day
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Listed {car.createdAt?.toDate().toLocaleDateString()}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Host:</strong> {car.hostName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Bookings:</strong> {car.totalBookings}
                  </p>
                </div>

                {car.status === "rejected" && car.rejectionReason && (
                  <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-error-600 mt-0.5" />
                      <div className="ml-2">
                        <p className="text-xs font-medium text-error-800">
                          Rejection Reason:
                        </p>
                        <p className="text-xs text-error-700">
                          {car.rejectionReason}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReviewModal({ open: true, car })}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>

                  {car.status === "pending" && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleCarAction("approved", car)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setReviewModal({ open: true, car })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredCars.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              No cars found matching your criteria
            </p>
          </div>
        )}
      </div>

      <CarReviewModal />
    </div>
  );
};

export default CarModeration;
