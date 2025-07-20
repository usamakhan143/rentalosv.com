import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Filter,
  MapPin,
  Users,
  Star,
  Heart,
  Car,
  X,
  Grid,
  List,
  Search as SearchIcon,
  ChevronDown,
} from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import { carService } from "../../services/firestore";
import { Select } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Modal from "../../components/ui/Modal";

const Search = () => {
  const navigate = useNavigate();
  const { searchFilters } = useApp();

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [favorites, setFavorites] = useState(new Set());

  const [filters, setFilters] = useState({
    location: searchFilters.location || "",
    pickupDate: searchFilters.pickupDate || null,
    dropoffDate: searchFilters.dropoffDate || null,
    pickupTime: "10:00",
    dropoffTime: "10:00",
    priceRange: [0, 500],
    vehicleType: "",
    transmission: "",
    fuelType: "",
    features: [],
    instantBook: false,
    hostRating: 0,
    seats: "any",
  });

  const vehicleTypes = [
    "Sedan",
    "SUV",
    "Truck",
    "Convertible",
    "Coupe",
    "Hatchback",
    "Wagon",
    "Minivan",
    "Luxury",
    "Electric",
    "Sports Car",
  ];

  const features = [
    "Bluetooth",
    "GPS Navigation",
    "Backup Camera",
    "Heated Seats",
    "Air Conditioning",
    "Sunroof",
    "Leather Seats",
    "USB Charging",
    "Apple CarPlay",
    "Android Auto",
    "Premium Audio",
    "Keyless Entry",
  ];

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "distance", label: "Distance" },
    { value: "newest", label: "Newest" },
  ];

  const fetchCars = async () => {
    try {
      setLoading(true);
      const allCars = await carService.getAllCars();

      // Filter only active cars
      const activeCars = allCars.filter((car) => car.status === "active");
      setCars(activeCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...cars];

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(
        (car) =>
          car.location?.city
            ?.toLowerCase()
            .includes(filters.location.toLowerCase()) ||
          car.location?.state
            ?.toLowerCase()
            .includes(filters.location.toLowerCase()),
      );
    }

    // Price range filter
    filtered = filtered.filter((car) => {
      const dailyRate = car.pricing?.dailyRate || 0;
      return (
        dailyRate >= filters.priceRange[0] && dailyRate <= filters.priceRange[1]
      );
    });

    // Vehicle type filter
    if (filters.vehicleType) {
      filtered = filtered.filter(
        (car) =>
          car.specs?.make
            ?.toLowerCase()
            .includes(filters.vehicleType.toLowerCase()) ||
          car.specs?.model
            ?.toLowerCase()
            .includes(filters.vehicleType.toLowerCase()),
      );
    }

    // Transmission filter
    if (filters.transmission) {
      filtered = filtered.filter(
        (car) => car.specs?.transmission === filters.transmission,
      );
    }

    // Fuel type filter
    if (filters.fuelType) {
      filtered = filtered.filter(
        (car) => car.specs?.fuelType === filters.fuelType,
      );
    }

    // Features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter((car) =>
        filters.features.every((feature) => car.features?.includes(feature)),
      );
    }

    // Instant book filter
    if (filters.instantBook) {
      filtered = filtered.filter(
        (car) => car.availability?.instantBook === true,
      );
    }

    // Host rating filter
    if (filters.hostRating > 0) {
      filtered = filtered.filter(
        (car) => (car.rating || 0) >= filters.hostRating,
      );
    }

    // Seats filter
    if (filters.seats !== "any") {
      const seatCount = parseInt(filters.seats);
      filtered = filtered.filter((car) => (car.specs?.seats || 5) >= seatCount);
    }

    // Sort
    switch (sortBy) {
      case "price_low":
        filtered.sort(
          (a, b) => (a.pricing?.dailyRate || 0) - (b.pricing?.dailyRate || 0),
        );
        break;
      case "price_high":
        filtered.sort(
          (a, b) => (b.pricing?.dailyRate || 0) - (a.pricing?.dailyRate || 0),
        );
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "distance":
        // Would implement distance sorting with geolocation
        break;
      default:
        // Recommended: combine rating, bookings, and other factors
        filtered.sort((a, b) => {
          const scoreA =
            (a.rating || 0) * 0.3 +
            (a.bookings || 0) * 0.2 +
            (a.pricing?.dailyRate || 0) * -0.001;
          const scoreB =
            (b.rating || 0) * 0.3 +
            (b.bookings || 0) * 0.2 +
            (b.pricing?.dailyRate || 0) * -0.001;
          return scoreB - scoreA;
        });
    }

    setFilteredCars(filtered);
  }, [cars, filters, sortBy]);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const toggleFavorite = (carId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId);
      } else {
        newFavorites.add(carId);
      }
      return newFavorites;
    });
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      pickupDate: null,
      dropoffDate: null,
      priceRange: [0, 500],
      vehicleType: "",
      transmission: "",
      fuelType: "",
      features: [],
      instantBook: false,
      hostRating: 0,
      seats: "any",
    });
  };

  const CarCard = ({ car, compact = false }) => (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer ${
        compact ? "flex" : ""
      }`}
      onClick={() => navigate(`/cars/${car.id}`)}
    >
      {/* Image */}
      <div
        className={`relative ${compact ? "w-64 h-48 flex-shrink-0" : "aspect-video"}`}
      >
        <img
          src={
            car.images?.[0] ||
            "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
          }
          alt={`${car.specs?.make} ${car.specs?.model}`}
          className="w-full h-full object-cover"
        />

        {/* Instant Book Badge */}
        {car.availability?.instantBook && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
            Instant Book
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(car.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              favorites.has(car.id)
                ? "text-red-500 fill-current"
                : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3
            className={`font-semibold text-gray-900 ${compact ? "text-base" : "text-lg"}`}
          >
            {car.specs?.year} {car.specs?.make} {car.specs?.model}
          </h3>
          <div className="text-right">
            <p
              className={`font-bold text-gray-900 ${compact ? "text-lg" : "text-xl"}`}
            >
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

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span>{car.specs?.seats || 5} seats</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{car.specs?.transmission}</span>
          </div>

          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium">{car.rating || 0}</span>
            <span className="text-gray-500 ml-1">
              ({car.reviews?.length || 0})
            </span>
          </div>
        </div>

        {/* Features (compact view only) */}
        {compact && car.features && (
          <div className="mt-3 flex flex-wrap gap-1">
            {car.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{car.features.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Finding cars for you...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-4xl">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-2">
                  {/* Desktop Form */}
                  <div className="hidden md:flex items-stretch bg-white rounded-lg overflow-hidden min-h-[48px]">
                    {/* WHERE FIELD */}
                    <div className="flex-1 min-w-0 bg-white border-r border-gray-200">
                      <div className="px-3 py-0 h-full flex flex-col justify-center">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Where
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={filters.location}
                          onChange={(e) =>
                            handleFilterChange("location", e.target.value)
                          }
                          placeholder="City, airport, address or hotel"
                          className="w-full text-base text-gray-900 placeholder-gray-500 border-none outline-none bg-transparent"
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                    </div>

                    {/* FROM FIELD */}
                    <div className="flex-shrink-0 w-48 bg-white border-r border-gray-200">
                      <div className="px-3 py-0 h-full flex flex-col justify-center">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          From
                        </label>
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <input
                              type="date"
                              value={
                                filters.pickupDate
                                  ?.toISOString()
                                  .split("T")[0] || ""
                              }
                              onChange={(e) =>
                                handleFilterChange(
                                  "pickupDate",
                                  new Date(e.target.value),
                                )
                              }
                              className="appearance-none bg-transparent font-medium text-gray-900 pr-4 border-none outline-none cursor-pointer"
                              style={{ fontSize: "16px", paddingRight: "17px" }}
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div className="relative">
                            <select
                              name="pickupTime"
                              value={filters.pickupTime}
                              onChange={(e) =>
                                handleFilterChange("pickupTime", e.target.value)
                              }
                              className="appearance-none bg-transparent text-gray-700 pr-4 border-none outline-none cursor-pointer"
                              style={{ fontSize: "16px", paddingRight: "17px" }}
                            >
                              <option value="10:00">10:00</option>
                              <option value="11:00">11:00</option>
                              <option value="12:00">12:00</option>
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* UNTIL FIELD */}
                    <div className="flex-shrink-0 w-48 bg-white border-r border-gray-200">
                      <div className="px-3 py-0 h-full flex flex-col justify-center">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Until
                        </label>
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <input
                              type="date"
                              value={
                                filters.dropoffDate
                                  ?.toISOString()
                                  .split("T")[0] || ""
                              }
                              onChange={(e) =>
                                handleFilterChange(
                                  "dropoffDate",
                                  new Date(e.target.value),
                                )
                              }
                              className="appearance-none bg-transparent font-medium text-gray-900 pr-4 border-none outline-none cursor-pointer"
                              style={{ fontSize: "16px", paddingRight: "17px" }}
                              min={
                                filters.pickupDate
                                  ?.toISOString()
                                  .split("T")[0] ||
                                new Date().toISOString().split("T")[0]
                              }
                            />
                          </div>
                          <div className="relative">
                            <select
                              name="dropoffTime"
                              value={filters.dropoffTime}
                              onChange={(e) =>
                                handleFilterChange(
                                  "dropoffTime",
                                  e.target.value,
                                )
                              }
                              className="appearance-none bg-transparent text-gray-700 pr-4 border-none outline-none cursor-pointer"
                              style={{ fontSize: "16px", paddingRight: "17px" }}
                            >
                              <option value="10:00">10:00</option>
                              <option value="11:00">11:00</option>
                              <option value="12:00">12:00</option>
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SEARCH BUTTON */}
                    <div className="flex-shrink-0 bg-white">
                      <div className="px-3 py-0 h-full flex items-center justify-center">
                        <button
                          type="submit"
                          className="bg-primary-500 hover:bg-primary-600 text-white p-2.5 rounded-full transition duration-200 shadow-md"
                        >
                          <SearchIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Form */}
                  <div
                    className="md:hidden space-y-3"
                    style={{ padding: "4px 16px 16px" }}
                  >
                    {/* WHERE FIELD */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Where
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={filters.location}
                        onChange={(e) =>
                          handleFilterChange("location", e.target.value)
                        }
                        placeholder="City, airport, address or hotel"
                        className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        style={{
                          fontSize: "16px",
                          paddingTop: "2px",
                          paddingBottom: "2px",
                        }}
                      />
                    </div>

                    {/* FROM FIELD */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        From
                      </label>
                      <div className="flex space-x-3">
                        <div className="flex-1 relative">
                          <input
                            type="date"
                            value={
                              filters.pickupDate?.toISOString().split("T")[0] ||
                              ""
                            }
                            onChange={(e) =>
                              handleFilterChange(
                                "pickupDate",
                                new Date(e.target.value),
                              )
                            }
                            className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                            style={{
                              fontSize: "16px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div className="flex-1 relative">
                          <select
                            name="pickupTime"
                            value={filters.pickupTime}
                            onChange={(e) =>
                              handleFilterChange("pickupTime", e.target.value)
                            }
                            className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                            style={{
                              fontSize: "16px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                          >
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* UNTIL FIELD */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Until
                      </label>
                      <div className="flex space-x-3">
                        <div className="flex-1 relative">
                          <input
                            type="date"
                            value={
                              filters.dropoffDate
                                ?.toISOString()
                                .split("T")[0] || ""
                            }
                            onChange={(e) =>
                              handleFilterChange(
                                "dropoffDate",
                                new Date(e.target.value),
                              )
                            }
                            className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                            style={{
                              fontSize: "16px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                            min={
                              filters.pickupDate?.toISOString().split("T")[0] ||
                              new Date().toISOString().split("T")[0]
                            }
                          />
                        </div>
                        <div className="flex-1 relative">
                          <select
                            name="dropoffTime"
                            value={filters.dropoffTime}
                            onChange={(e) =>
                              handleFilterChange("dropoffTime", e.target.value)
                            }
                            className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                            style={{
                              fontSize: "16px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                          >
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* SEARCH BUTTON */}
                    <button
                      type="submit"
                      className="w-full text-white rounded-lg font-medium transition duration-200"
                      style={{
                        backgroundColor: "#003552",
                        fontSize: "16px",
                        paddingTop: "6px",
                        paddingBottom: "6px",
                      }}
                    >
                      Search for cars
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 ml-6">
              <Button
                variant="outline"
                icon={<Filter className="w-4 h-4" />}
                onClick={() => setShowFilters(true)}
              >
                Filters
              </Button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-primary-100 text-primary-600" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? "bg-primary-100 text-primary-600" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {filteredCars.length} cars available
              {filters.location && ` in ${filters.location}`}
            </h1>
            {filters.pickupDate && filters.dropoffDate && (
              <p className="text-gray-600 mt-1">
                {filters.pickupDate.toLocaleDateString()} -{" "}
                {filters.dropoffDate.toLocaleDateString()}
              </p>
            )}
          </div>

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={sortOptions}
            className="w-48"
          />
        </div>

        {/* Active Filters */}
        {(filters.features.length > 0 ||
          filters.vehicleType ||
          filters.instantBook) && (
          <div className="flex items-center flex-wrap gap-2 mb-6">
            <span className="text-sm text-gray-600">Active filters:</span>

            {filters.vehicleType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                {filters.vehicleType}
                <button
                  onClick={() => handleFilterChange("vehicleType", "")}
                  className="ml-2 hover:text-primary-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 text-primary-800"
              >
                {feature}
                <button
                  onClick={() => handleFeatureToggle(feature)}
                  className="ml-2 hover:text-primary-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.instantBook && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                Instant Book
                <button
                  onClick={() => handleFilterChange("instantBook", false)}
                  className="ml-2 hover:text-primary-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No cars found
            </h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or clearing some filters
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} compact={viewMode === "list"} />
            ))}
          </div>
        )}
      </div>

      {/* Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filter Cars"
        size="lg"
      >
        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}{" "}
              per day
            </label>
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterChange("priceRange", [0, parseInt(e.target.value)])
              }
              className="w-full"
            />
          </div>

          {/* Vehicle Type */}
          <Select
            label="Vehicle Type"
            value={filters.vehicleType}
            onChange={(e) => handleFilterChange("vehicleType", e.target.value)}
            options={vehicleTypes.map((type) => ({ value: type, label: type }))}
            placeholder="Any type"
          />

          {/* Transmission */}
          <Select
            label="Transmission"
            value={filters.transmission}
            onChange={(e) => handleFilterChange("transmission", e.target.value)}
            options={[
              { value: "automatic", label: "Automatic" },
              { value: "manual", label: "Manual" },
            ]}
            placeholder="Any transmission"
          />

          {/* Fuel Type */}
          <Select
            label="Fuel Type"
            value={filters.fuelType}
            onChange={(e) => handleFilterChange("fuelType", e.target.value)}
            options={[
              { value: "gasoline", label: "Gasoline" },
              { value: "diesel", label: "Diesel" },
              { value: "electric", label: "Electric" },
              { value: "hybrid", label: "Hybrid" },
            ]}
            placeholder="Any fuel type"
          />

          {/* Seats */}
          <Select
            label="Minimum Seats"
            value={filters.seats}
            onChange={(e) => handleFilterChange("seats", e.target.value)}
            options={[
              { value: "any", label: "Any" },
              { value: "2", label: "2+ seats" },
              { value: "4", label: "4+ seats" },
              { value: "5", label: "5+ seats" },
              { value: "7", label: "7+ seats" },
            ]}
          />

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Features
            </label>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature) => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Instant Book */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.instantBook}
              onChange={(e) =>
                handleFilterChange("instantBook", e.target.checked)
              }
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Instant Book only
            </span>
          </label>

          {/* Host Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Minimum Host Rating
            </label>
            <div className="flex space-x-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange("hostRating", rating)}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    filters.hostRating === rating
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {rating === 0 ? "Any" : `${rating}+ ⭐`}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={clearFilters}>
              Clear All
            </Button>
            <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Search;
