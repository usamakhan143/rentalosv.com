import React, { useState } from "react";
import { 
  Calendar as CalendarIcon,
  Triangle,
  MessageCircle,
  Car,
  Briefcase,
  MoreHorizontal,
  Download,
  ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Earnings = () => {
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
                    } else if (item.label === "Vehicles") {
                      setShowVehiclesDropdown(!showVehiclesDropdown);
                      setShowTripsDropdown(false);
                      setShowBusinessDropdown(false);
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
                    item.label === "More" ? "w-44" : "w-40"
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
            <h1 className="text-2xl font-bold" style={{ color: "#003552" }}>Earnings</h1>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All vehicles</option>
                <option>BMW X5</option>
                <option>Tesla Model 3</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>
        </div>

        {/* Earnings Content */}
        <div className="flex">
          {/* Main Earnings Content */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold" style={{ color: "#003552" }}>£0 earned in 2025</h2>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download CSV</span>
                </button>
              </div>
              <p className="text-gray-600">All earnings adjustments included</p>
              <p className="text-sm text-gray-500 mt-2">
                This CSV file has more specific trip earnings for bookkeeping purposes. 
                These figures may be different from your earnings chart and should not be used for tax filing.
              </p>
            </div>

            {/* Chart Area */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 h-96 mb-6">
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <p>No earnings data to display</p>
                  <p className="text-sm mt-2">Complete your first trip to see earnings data here</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>£0 Upcoming earnings</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>£0 Reimbursements</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>£0 Incentives</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>£0 Missed earnings</span>
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

export default Earnings;
