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
  Archive,
  Star,
  Reply,
  Forward,
  MoreVertical
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const navigate = useNavigate();
  const [showTripsDropdown, setShowTripsDropdown] = useState(false);
  const [showVehiclesDropdown, setShowVehiclesDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
    { icon: MessageCircle, label: "Inbox", path: "/host/inbox", active: true },
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

  // Dummy inbox data
  const messages = [
    {
      id: 1,
      sender: "Emily Johnson",
      subject: "Trip inquiry for your 2022 BMW X5",
      preview: "Hi! I'm interested in booking your BMW for the weekend. Would it be available from Friday...",
      time: "2 hours ago",
      isRead: false,
      isStarred: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=150"
    },
    {
      id: 2,
      sender: "Michael Chen",
      subject: "Thanks for the amazing trip!",
      preview: "Just wanted to say thank you for lending your car. Everything went perfectly and the car...",
      time: "5 hours ago",
      isRead: true,
      isStarred: false,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    {
      id: 3,
      sender: "Sarah Williams",
      subject: "Question about pickup location",
      preview: "I have a booking confirmed for tomorrow. Could you please clarify the exact pickup...",
      time: "1 day ago",
      isRead: false,
      isStarred: false,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    },
    {
      id: 4,
      sender: "David Rodriguez",
      subject: "Booking modification request",
      preview: "Hi, I need to extend my booking by one day. Is it possible to modify the return date...",
      time: "2 days ago",
      isRead: true,
      isStarred: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      id: 5,
      sender: "Lisa Thompson",
      subject: "New booking request",
      preview: "I would like to book your Tesla Model 3 for next weekend. Please let me know if it's...",
      time: "3 days ago",
      isRead: true,
      isStarred: false,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
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
            <h1 className="text-2xl font-bold" style={{ color: "#003552" }}>Inbox</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Archive className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Inbox Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Messages List */}
          <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" style={{ color: "#003552" }}>
                  Messages ({messages.filter(m => !m.isRead).length} new)
                </h2>
                <button className="text-sm text-blue-600 hover:underline">
                  Mark all as read
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  } ${!message.isRead ? 'bg-blue-25' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium truncate ${
                          !message.isRead ? 'text-gray-900 font-semibold' : 'text-gray-700'
                        }`}>
                          {message.sender}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {message.isStarred && (
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          )}
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                      </div>
                      <p className={`text-sm truncate mt-1 ${
                        !message.isRead ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {message.preview}
                      </p>
                      {!message.isRead && (
                        <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "#FF7500" }}></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div className="flex-1 bg-white">
            {selectedMessage ? (
              <div className="h-full flex flex-col">
                {/* Message Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={selectedMessage.avatar}
                        alt={selectedMessage.sender}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-xl font-semibold" style={{ color: "#003552" }}>
                          {selectedMessage.subject}
                        </h2>
                        <p className="text-gray-600 mt-1">
                          From: <span className="font-medium">{selectedMessage.sender}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{selectedMessage.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Star className={`w-5 h-5 ${
                          selectedMessage.isStarred ? 'text-yellow-400 fill-current' : 'text-gray-400'
                        }`} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedMessage.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                      nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
                      officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Please let me know if you have any questions. Looking forward to hearing from you!
                    </p>
                    <p className="text-gray-700 mt-4">
                      Best regards,<br />
                      {selectedMessage.sender}
                    </p>
                  </div>
                </div>

                {/* Reply Actions */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <button 
                      className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-all hover:shadow-lg"
                      style={{ backgroundColor: "#FF7500" }}
                    >
                      <Reply className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Forward className="w-4 h-4" />
                      <span>Forward</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Archive className="w-4 h-4" />
                      <span>Archive</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">Select a message</h3>
                  <p className="text-gray-400">Choose a message from your inbox to read here</p>
                </div>
              </div>
            )}
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

export default Inbox;
