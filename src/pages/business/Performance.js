import React, { useState } from "react";
import { 
  Calendar as CalendarIcon,
  Triangle,
  MessageCircle,
  Car,
  Briefcase,
  MoreHorizontal,
  ChevronDown,
  Star,
  TrendingUp,
  Award,
  CheckCircle,
  Calendar,
  Clock,
  Car as CarIcon,
  Users,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Performance = () => {
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
      active: false,
      hasDropdown: true,
      noNavigation: true,
      dropdownItems: [
        { label: "Listings", path: "/vehicles/listings" },
        { label: "Settings", path: "/vehicles/settings" }
      ]
    },
    { 
      icon: Briefcase, 
      label: "Business", 
      path: "/business", 
      active: true,
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
            <h1 className="text-2xl font-bold" style={{ color: "#003552" }}>Performance</h1>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                <option>01/10/2024 - 30/09/2025</option>
                <option>01/01/2024 - 31/12/2024</option>
                <option>01/01/2023 - 31/12/2023</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Expand
              </button>
            </div>
          </div>
        </div>

        {/* Performance Content */}
        <div className="flex">
          {/* Main Performance Content */}
          <div className="p-6 space-y-6">
            {/* All-Star Host Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">All-Star Host status</h2>
                  <p className="text-sm text-gray-600 mb-1">Not met • Next assessment in Oct 15</p>
                  <button className="text-sm text-blue-600 hover:underline">How to qualify</button>
                </div>
              </div>
            </div>

            {/* Current Performance Section */}
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Current performance</p>
              
              {/* Performance Metrics */}
              <div className="space-y-4">
                {/* Cancellation Rate */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Cancellation rate</h3>
                    <p className="text-sm text-gray-600">All-Star Host: 3%</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">-</div>
                    <ChevronDown className="w-4 h-4 text-gray-400 mx-auto" />
                  </div>
                </div>

                {/* Five-star Rate */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Five-star rate</h3>
                    <p className="text-sm text-gray-600">All-Star Host: 90%</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">-</div>
                    <ChevronDown className="w-4 h-4 text-gray-400 mx-auto" />
                  </div>
                </div>

                {/* Maintenance Rate */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Maintenance rate</h3>
                    <p className="text-sm text-gray-600">All-Star Host: 10%</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">-</div>
                    <ChevronDown className="w-4 h-4 text-gray-400 mx-auto" />
                  </div>
                </div>

                {/* Cleanliness Rate */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Cleanliness rate</h3>
                    <p className="text-sm text-gray-600">All-Star Host: 90%</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">-</div>
                    <ChevronDown className="w-4 h-4 text-gray-400 mx-auto" />
                  </div>
                </div>

                {/* Completed Trips */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Completed trips</h3>
                    <p className="text-sm text-gray-600">All-Star Host: 20</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">-</div>
                    <ChevronDown className="w-4 h-4 text-gray-400 mx-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Tips Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance tips</h3>
                  <p className="text-sm text-gray-600 mb-4">Great hosts are prepared. Ready to go professional? Follow these tips to improve your performance:</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-900 font-medium">Keep your vehicle calendar up-to-date</p>
                        <ChevronDown className="w-4 h-4 text-gray-400 mt-1" />
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-900 font-medium">Set pickup & return hours that work for you</p>
                        <ChevronDown className="w-4 h-4 text-gray-400 mt-1" />
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Target className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-900 font-medium">Adjust trip preferences that work with your schedule</p>
                        <ChevronDown className="w-4 h-4 text-gray-400 mt-1" />
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-900 font-medium">Learn more about hosting standards</p>
                        <ChevronDown className="w-4 h-4 text-gray-400 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default Performance;
