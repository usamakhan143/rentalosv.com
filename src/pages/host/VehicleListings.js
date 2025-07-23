import React, { useState } from "react";
import { 
  Calendar as CalendarIcon,
  Triangle,
  MessageCircle,
  Car,
  Briefcase,
  MoreHorizontal,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  MoreVertical,
  Star,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VehicleListings = () => {
  const navigate = useNavigate();
  const [showTripsDropdown, setShowTripsDropdown] = useState(false);
  const [showVehiclesDropdown, setShowVehiclesDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  const sidebarItems = [
    { icon: CalendarIcon, label: "Calendar", path: "/calendar", active: false },
    { 
      icon: Triangle, 
      label: "Trips", 
      path: "/trips", 
      active: false,
      hasDropdown: true,
      dropdownItems: [
        { label: "Booked", path: "/trips/booked" },
        { label: "History", path: "/trips/history" }
      ]
    },
    { icon: MessageCircle, label: "Inbox", path: "/host/inbox", active: false },
    { 
      icon: Car, 
      label: "Vehicles", 
      path: "/vehicles", 
      active: true,
      hasDropdown: true,
      dropdownItems: [
        { label: "Listings", path: "/vehicles/listings" },
        { label: "Settings", path: "/vehicles/settings" }
      ]
    },
    {
      icon: Briefcase,
      label: "Business",
      path: "/business",
      active: false,
      hasDropdown: true,
      noNavigation: true,
      dropdownItems: [
        { label: "Earnings", path: "/business/earnings" },
        { label: "Performance", path: "/business/performance" },
        { label: "Ratings & reviews", path: "/business/ratings" },
        { label: "Transaction history", path: "/business/transactions" }
      ]
    },
    {
      icon: MoreHorizontal,
      label: "More",
      path: "/more",
      active: false,
      hasNotification: true,
      noNavigation: true,
      hasDropdown: true,
      dropdownItems: [
        { label: "Contact support", path: "/contact-support" },
        { label: "Host tools", path: "/host-tools" },
        { label: "Insurance & protection", path: "/insurance" },
        { label: "Calculator", path: "/calculator" },
        { label: "Legal", path: "/legal" }
      ]
    }
  ];

  // Dummy vehicle data
  const vehicles = [
    {
      id: 1,
      make: "BMW",
      model: "X5",
      year: 2022,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
      price: 89,
      rating: 4.9,
      reviews: 127,
      location: "London, UK",
      status: "Listed",
      description: "Luxury SUV perfect for family trips and business travel",
      features: ["All-wheel drive", "GPS", "Bluetooth", "Backup camera"]
    },
    {
      id: 2,
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400",
      price: 75,
      rating: 4.8,
      reviews: 89,
      location: "Manchester, UK",
      status: "Listed",
      description: "Electric luxury sedan with autopilot and premium interior",
      features: ["Electric", "Autopilot", "Premium interior", "Supercharging"]
    }
  ];

  const handleDropdown = (item, dropdown) => {
    if (item.label === "Trips") {
      setShowTripsDropdown(dropdown);
      setShowVehiclesDropdown(false);
      setShowBusinessDropdown(false);
      setShowMoreDropdown(false);
    } else if (item.label === "Vehicles") {
      setShowVehiclesDropdown(dropdown);
      setShowTripsDropdown(false);
      setShowBusinessDropdown(false);
      setShowMoreDropdown(false);
    } else if (item.label === "Business") {
      setShowBusinessDropdown(dropdown);
      setShowTripsDropdown(false);
      setShowVehiclesDropdown(false);
      setShowMoreDropdown(false);
    } else if (item.label === "More") {
      setShowMoreDropdown(dropdown);
      setShowTripsDropdown(false);
      setShowVehiclesDropdown(false);
      setShowBusinessDropdown(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8 fixed h-full z-10">
        {sidebarItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="relative group">
              <button
                onClick={() => {
                  if (item.hasDropdown) {
                    if (item.label === "Trips") {
                      setShowTripsDropdown(!showTripsDropdown);
                      setShowVehiclesDropdown(false);
                      setShowBusinessDropdown(false);
                      setShowMoreDropdown(false);
                    } else if (item.label === "Vehicles") {
                      setShowVehiclesDropdown(!showVehiclesDropdown);
                      setShowTripsDropdown(false);
                      setShowBusinessDropdown(false);
                      setShowMoreDropdown(false);
                    } else if (item.label === "Business") {
                      setShowBusinessDropdown(!showBusinessDropdown);
                      setShowTripsDropdown(false);
                      setShowVehiclesDropdown(false);
                      setShowMoreDropdown(false);
                    } else if (item.label === "More") {
                      setShowMoreDropdown(!showMoreDropdown);
                      setShowTripsDropdown(false);
                      setShowVehiclesDropdown(false);
                      setShowBusinessDropdown(false);
                    }
                  } else if (!item.noNavigation) {
                    navigate(item.path);
                  }
                }}
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    handleDropdown(item, true);
                  }
                }}
                className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-colors relative ${
                  item.active 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-6 h-6" />
                {item.hasNotification && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </button>
              <div className="text-xs text-gray-600 text-center mt-1 font-medium">
                {item.label}
              </div>

              {/* Dropdown */}
              {item.hasDropdown && (
                (item.label === "Trips" && showTripsDropdown) ||
                (item.label === "Vehicles" && showVehiclesDropdown) ||
                (item.label === "Business" && showBusinessDropdown) ||
                (item.label === "More" && showMoreDropdown)
              ) && (
                <div
                  className={`absolute left-16 top-0 bg-white border border-gray-100 rounded-xl py-3 z-20 backdrop-blur-sm bg-white/95 ${
                    item.label === "Business" ? "w-40" : item.label === "More" ? "w-44" : "w-28"
                  }`}
                  style={{
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(0, 53, 82, 0.08)'
                  }}
                  onMouseLeave={() => handleDropdown(item, false)}
                >
                  {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                    <button
                      key={dropdownIndex}
                      onClick={() => {
                        navigate(dropdownItem.path);
                        handleDropdown(item, false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 text-gray-700 text-sm font-medium rounded-lg mx-1 group relative overflow-hidden"
                    >
                      <span className="group-hover:text-gray-900 transition-colors duration-200 relative z-10">
                        {dropdownItem.label}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#003552" }}>Vehicle Listings</h1>
              <p className="text-gray-600 mt-1">Manage your vehicle listings and availability</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => navigate('/list-your-car')}
                className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-all hover:shadow-lg"
                style={{ backgroundColor: "#FF7500" }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Vehicle</span>
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Vehicle Image */}
                <div className="relative h-48">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 text-xs font-medium text-white rounded-full"
                      style={{ backgroundColor: "#FF7500" }}
                    >
                      {vehicle.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: "#003552" }}>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {vehicle.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: "#FF7500" }}>
                        £{vehicle.price}
                      </div>
                      <div className="text-sm text-gray-500">per day</div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {vehicle.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {vehicle.rating}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({vehicle.reviews} reviews)
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vehicle.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                    {vehicle.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        +{vehicle.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State for Additional Vehicles */}
          <div className="mt-8 text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
            <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Add more vehicles</h3>
            <p className="text-gray-500 mb-4">Expand your fleet to increase your earning potential</p>
            <button 
              onClick={() => navigate('/list-your-car')}
              className="px-6 py-2 text-white rounded-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: "#FF7500" }}
            >
              List Another Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showTripsDropdown || showVehiclesDropdown || showBusinessDropdown || showMoreDropdown) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowTripsDropdown(false);
            setShowVehiclesDropdown(false);
            setShowBusinessDropdown(false);
            setShowMoreDropdown(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default VehicleListings;
