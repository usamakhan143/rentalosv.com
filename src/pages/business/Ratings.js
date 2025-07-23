import React, { useState } from "react";
import { 
  Calendar as CalendarIcon,
  Triangle,
  MessageCircle,
  Car,
  Briefcase,
  MoreHorizontal,
  Star,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
  ThumbsUp,
  Award,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Ratings = () => {
  const navigate = useNavigate();
  const [showTripsDropdown, setShowTripsDropdown] = useState(false);
  const [showVehiclesDropdown, setShowVehiclesDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All reviews");

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

  // Dummy reviews data
  const reviews = [
    {
      id: 1,
      guest: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=150",
      rating: 5,
      date: "2 days ago",
      vehicle: "2022 BMW X5",
      comment: "Amazing car and fantastic host! The BMW was in perfect condition, super clean, and the pickup process was seamless. Sarah was very communicative and helpful throughout. Would definitely rent from her again!",
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      guest: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 5,
      date: "1 week ago",
      vehicle: "2023 Tesla Model 3",
      comment: "Incredible experience! The Tesla was a dream to drive. Host was punctual and very professional. The car was spotless and had plenty of charge. Perfect for my business trip to Manchester.",
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      guest: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 4,
      date: "2 weeks ago",
      vehicle: "2022 BMW X5",
      comment: "Great car and responsive host. The only minor issue was the pickup location was a bit hard to find, but once we met up everything was smooth. The BMW drove beautifully and was very comfortable for our family trip.",
      helpful: 5,
      verified: true
    },
    {
      id: 4,
      guest: "David Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      date: "3 weeks ago",
      vehicle: "2023 Tesla Model 3",
      comment: "Outstanding host and beautiful car! Communication was excellent, the car was delivered exactly as described, and the whole process was incredibly smooth. Highly recommend!",
      helpful: 15,
      verified: true
    },
    {
      id: 5,
      guest: "Jennifer Lee",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150",
      rating: 5,
      date: "1 month ago",
      vehicle: "2022 BMW X5",
      comment: "Perfect rental experience! The host was flexible with timing and the car exceeded expectations. Very clean, well-maintained, and a pleasure to drive. Thank you for making our weekend getaway special!",
      helpful: 9,
      verified: true
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

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
            <h1 className="text-2xl font-bold" style={{ color: "#003552" }}>Ratings & reviews</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All reviews</option>
                <option>5 stars</option>
                <option>4 stars</option>
                <option>3 stars</option>
                <option>Recent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Main Ratings Content */}
          <div className="p-6 space-y-6">
            {/* Rating Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Rating */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: "#003552" }}>{averageRating}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(parseFloat(averageRating)))}
                </div>
                <p className="text-sm text-gray-600">Overall rating</p>
                <p className="text-xs text-gray-500 mt-1">{reviews.length} reviews</p>
              </div>

              {/* Total Reviews */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: "#FF7500" }}>{reviews.length}</div>
                <div className="flex justify-center mb-2">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">Total reviews</p>
                <p className="text-xs text-gray-500 mt-1">Last 12 months</p>
              </div>

              {/* Response Rate */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-4xl font-bold mb-2 text-green-600">100%</div>
                <div className="flex justify-center mb-2">
                  <Award className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-600">Response rate</p>
                <p className="text-xs text-gray-500 mt-1">Replied to all reviews</p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#003552" }}>Rating breakdown</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviews.filter(review => review.rating === rating).length;
                  const percentage = (count / reviews.length) * 100;
                  return (
                    <div key={rating} className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 w-16">
                        <span className="text-sm">{rating}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: percentage > 0 ? "#FF7500" : "transparent"
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: "#003552" }}>Recent reviews</h3>
              
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={review.avatar} 
                      alt={review.guest}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{review.guest}</h4>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500">• {review.date}</span>
                            <span className="text-sm text-gray-500">• {review.vehicle}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">{review.comment}</p>
                      
                      <div className="flex items-center justify-between">
                        <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="text-sm text-blue-600 hover:underline">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Load more reviews
              </button>
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

export default Ratings;
