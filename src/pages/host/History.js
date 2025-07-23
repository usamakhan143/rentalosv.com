import React, { useState } from "react";
import { 
  Calendar as CalendarIcon,
  Triangle,
  MessageCircle,
  Car,
  Briefcase,
  MoreHorizontal
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [showTripsDropdown, setShowTripsDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  const sidebarItems = [
    { icon: CalendarIcon, label: "Calendar", path: "/calendar", active: false },
    { 
      icon: Triangle, 
      label: "Trips", 
      path: "/trips", 
      active: true,
      hasDropdown: true,
      dropdownItems: [
        { label: "Booked", path: "/trips/booked" },
        { label: "History", path: "/trips/history" }
      ]
    },
    { icon: MessageCircle, label: "Inbox", path: "/host/inbox", active: false },
    { icon: Car, label: "Vehicles", path: "/vehicles", active: false },
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
                      setShowBusinessDropdown(false);
                      setShowMoreDropdown(false);
                    } else if (item.label === "Business") {
                      setShowBusinessDropdown(!showBusinessDropdown);
                      setShowTripsDropdown(false);
                      setShowMoreDropdown(false);
                    } else if (item.label === "More") {
                      setShowMoreDropdown(!showMoreDropdown);
                      setShowTripsDropdown(false);
                      setShowBusinessDropdown(false);
                    }
                  } else if (!item.noNavigation) {
                    navigate(item.path);
                  }
                }}
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    if (item.label === "Trips") {
                      setShowTripsDropdown(true);
                      setShowBusinessDropdown(false);
                      setShowMoreDropdown(false);
                    } else if (item.label === "Business") {
                      setShowBusinessDropdown(true);
                      setShowTripsDropdown(false);
                      setShowMoreDropdown(false);
                    } else if (item.label === "More") {
                      setShowMoreDropdown(true);
                      setShowTripsDropdown(false);
                      setShowBusinessDropdown(false);
                    }
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
                  onMouseLeave={() => {
                    if (item.label === "Trips") setShowTripsDropdown(false);
                    if (item.label === "Business") setShowBusinessDropdown(false);
                    if (item.label === "More") setShowMoreDropdown(false);
                  }}
                >
                  {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                    <button
                      key={dropdownIndex}
                      onClick={() => {
                        navigate(dropdownItem.path);
                        if (item.label === "Trips") setShowTripsDropdown(false);
                        if (item.label === "Business") setShowBusinessDropdown(false);
                        if (item.label === "More") setShowMoreDropdown(false);
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
            <h1 className="text-2xl font-bold" style={{ color: "#003552" }}>History</h1>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-500 hover:text-gray-700">Finish listing</button>
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-gray-600">≡</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex">
            <button 
              onClick={() => navigate('/trips/booked')}
              className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Booked
            </button>
            <button className="px-4 py-3 text-sm font-medium border-b-2 border-purple-600 text-purple-600">
              History
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <div className="mb-8">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Fe5a7785f11ba42fcab2950ce1c0793f1?format=webp&width=800"
                alt="No trip history illustration"
                className="w-64 h-auto mx-auto"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">No trip history</h2>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              This is where you can access information about your completed trips
            </p>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {(showTripsDropdown || showBusinessDropdown || showMoreDropdown) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowTripsDropdown(false);
            setShowBusinessDropdown(false);
            setShowMoreDropdown(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default History;
