import React, { useState } from "react";
import {
  Search,
  Info,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar as CalendarIcon,
  Triangle,
  MessageCircle,
  Car,
  Briefcase,
  MoreHorizontal,
  Mouse,
  Keyboard,
  MousePointer,
  Settings,
  DollarSign,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(6); // July = 6 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2023);
  const [showInfoDropdown, setShowInfoDropdown] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(1);
  const [showTripsDropdown, setShowTripsDropdown] = useState(false);
  const [showVehiclesDropdown, setShowVehiclesDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const sidebarItems = [
    { icon: CalendarIcon, label: "Calendar", path: "/calendar", active: true },
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

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add previous month's trailing days
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPrevMonth: true,
        fullDate: new Date(prevYear, prevMonth, daysInPrevMonth - i)
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(currentYear, currentMonth, day);
      const isToday = new Date().toDateString() === fullDate.toDateString();
      
      days.push({
        date: day,
        isCurrentMonth: true,
        isToday,
        fullDate
      });
    }

    // Add next month's leading days to complete the grid
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const remainingDays = 42 - days.length; // 6 rows × 7 days = 42
    
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        isNextMonth: true,
        fullDate: new Date(nextYear, nextMonth, day)
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleDateClick = (day) => {
    const dateStr = day.fullDate.toISOString().split('T')[0];
    setSelectedDates(prev => {
      if (prev.includes(dateStr)) {
        return prev.filter(d => d !== dateStr);
      } else {
        return [...prev, dateStr];
      }
    });
  };

  const tutorialSteps = [
    {
      title: "Get to know the calendar",
      description: "Manage all of your vehicles' prices, availability, and trips in one place.",
      icon: CalendarIcon
    },
    {
      title: "Click to select dates",
      description: "Select a day, or click several days on the calendar, to make price and availability changes at once.",
      icon: Mouse
    },
    {
      title: "Use the shift key to select a time span",
      description: "Click the start date, then hold the shift key as you click the end date to make price or availability changes for the time span.",
      icon: Keyboard
    },
    {
      title: "Click a date to select a column",
      description: "Click the date at the top to select the same day for all cars. You can click and hold the shift key on dates to select a time span too.",
      icon: MousePointer
    },
    {
      title: "Manage prices, unavailability, and trips",
      description: "Switch between managing prices, unavailability, and trips",
      icon: Settings
    },
    {
      title: "Adjust prices up or down",
      description: "Change prices by adding or subtracting a pound or percentage amount.",
      icon: DollarSign
    },
    {
      title: "Set a fixed price",
      description: "You can also make price changes by setting multiple days to the same price.",
      icon: DollarSign
    },
    {
      title: "Multitask while calendar updates",
      description: "As your price or availability changes are saving, you can make more updates to the calendar or keep using the Turo app. Updates can't be made to days with changes in progress.",
      icon: Clock
    }
  ];

  const nextTutorialStep = () => {
    if (tutorialStep < tutorialSteps.length) {
      setTutorialStep(tutorialStep + 1);
    }
  };

  const prevTutorialStep = () => {
    if (tutorialStep > 1) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    setTutorialStep(1);
  };

  const calendarDays = generateCalendarDays();

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
                    }
                  } else if (!item.noNavigation) {
                    navigate(item.path);
                  }
                }}
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    if (item.label === "Trips") {
                      setShowTripsDropdown(true);
                      setShowVehiclesDropdown(false);
                      setShowBusinessDropdown(false);
                    } else if (item.label === "Vehicles") {
                      setShowVehiclesDropdown(true);
                      setShowTripsDropdown(false);
                      setShowBusinessDropdown(false);
                    } else if (item.label === "Business") {
                      setShowBusinessDropdown(true);
                      setShowTripsDropdown(false);
                      setShowVehiclesDropdown(false);
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
                (item.label === "Vehicles" && showVehiclesDropdown) ||
                (item.label === "Business" && showBusinessDropdown)
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
                    if (item.label === "Vehicles") setShowVehiclesDropdown(false);
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
                        if (item.label === "Vehicles") setShowVehiclesDropdown(false);
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
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold" style={{ color: "#003552" }}>Calendar</h1>
              
              {/* Info Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowInfoDropdown(!showInfoDropdown)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Info className="w-4 h-4 text-gray-600" />
                </button>
                
                {showInfoDropdown && (
                  <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-20">
                    <button
                      onClick={() => {
                        setShowTutorial(true);
                        setShowInfoDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      Launch tutorial
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700">
                      View glossary
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Make, model, plate #"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span>Sort</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <span>Listing Status</span>
                <span className="bg-white text-gray-900 px-2 py-1 rounded text-sm">1</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Checklist Banner */}
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <span className="text-blue-800 font-medium">Complete checklist to become a calendar and pricing pro.</span>
              <button className="text-blue-600 hover:underline font-medium">Complete checklist</button>
            </div>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">
                {months[currentMonth]} {currentYear}
              </h2>
              <button 
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {['WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE'].map((day, index) => (
              <div key={index} className="p-4 text-center border-r border-gray-100 last:border-r-0">
                <div className="text-xs font-medium text-gray-500">{day}</div>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const isSelected = selectedDates.includes(day.fullDate.toISOString().split('T')[0]);
              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`h-20 border-r border-b border-gray-100 last:border-r-0 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center ${
                    !day.isCurrentMonth ? 'text-gray-300' : 'text-gray-900'
                  } ${isSelected ? 'bg-blue-50 border-blue-200' : ''}`}
                >
                  <span className={`text-lg font-medium ${
                    day.isToday 
                      ? 'bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center' 
                      : ''
                  }`}>
                    {day.date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <div className="mb-8">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Fe5a7785f11ba42fcab2950ce1c0793f1?format=webp&width=800"
                alt="No vehicles illustration"
                className="w-64 h-auto mx-auto"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No vehicles</h2>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              This is where you can manage your vehicles' pricing, unavailability, and trips.
            </p>
          </div>
        </div>
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-end p-4">
              <button
                onClick={closeTutorial}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-8 pb-8">
              {/* Icon */}
              <div className="mb-8 text-center">
                <div 
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#003552" }}
                >
                  {React.createElement(tutorialSteps[tutorialStep - 1].icon, { 
                    className: "w-10 h-10 text-white" 
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: "#003552" }}>
                  {tutorialSteps[tutorialStep - 1].title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {tutorialSteps[tutorialStep - 1].description}
                </p>
              </div>

              {/* Step Counter */}
              <div className="text-center mb-8">
                <span className="text-sm text-gray-500">
                  {tutorialStep} / {tutorialSteps.length}
                </span>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                {tutorialStep > 1 ? (
                  <button
                    onClick={prevTutorialStep}
                    className="px-6 py-3 font-semibold hover:bg-gray-50 rounded-lg transition-colors"
                    style={{ color: "#003552" }}
                  >
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}

                {tutorialStep < tutorialSteps.length ? (
                  <button
                    onClick={nextTutorialStep}
                    className="px-8 py-3 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={closeTutorial}
                    className="px-8 py-3 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    Get started
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showInfoDropdown || showTripsDropdown || showVehiclesDropdown || showBusinessDropdown) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowInfoDropdown(false);
            setShowTripsDropdown(false);
            setShowVehiclesDropdown(false);
            setShowBusinessDropdown(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default Calendar;
