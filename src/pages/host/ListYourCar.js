import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Info, 
  Sun, 
  Camera, 
  Triangle, 
  AlertTriangle, 
  MapPin,
  Car,
  Settings,
  Target,
  Calendar,
  Star,
  Image,
  CreditCard,
  CheckCircle,
  Upload,
  MessageCircle,
  Briefcase,
  MoreHorizontal
} from "lucide-react";

const ListYourCar = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 11;
  const [showTripsDropdown, setShowTripsDropdown] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Location
    location: "",
    
    // Step 2: License Plate
    licensePlate: "",
    
    // Step 3: Make and Model
    year: "",
    make: "",
    model: "",
    
    // Step 4: Trim and Style
    trim: "Base",
    style: "1.2 (136ps) Ibrida Suv 5d Edct-6",
    
    // Step 5: Odometer and Transmission
    odometer: "",
    transmission: "",
    
    // Step 6: Your Goals
    financialGoal: "",
    currentUsage: "",
    shareFrequency: "",
    
    // Step 7: Car Availability
    advanceNotice: "12 hours (recommended)",
    minimumTripDuration: "1 day (recommended)",
    maximumTripDuration: "3 weeks (recommended)",
    requireWeekendMinimum: false,
    
    // Step 8: Vehicle Details
    features: [],
    description: "",
    
    // Step 9: Car Photos
    photos: [],
    
    // Step 10: Payout
    stripeAccountSetup: false,
    
    // Step 11: Submit
    termsAccepted: false
  });

  const steps = [
    { id: 1, title: "Location", subtitle: "Where is your car located?", icon: MapPin },
    { id: 2, title: "License Plate", subtitle: "Vehicle identification", icon: Car },
    { id: 3, title: "Make and Model", subtitle: "Tell us about your vehicle", icon: Car },
    { id: 4, title: "Trim and Style", subtitle: "Vehicle specifications", icon: Settings },
    { id: 5, title: "Odometer and Transmission", subtitle: "Vehicle details", icon: Settings },
    { id: 6, title: "Your Goals", subtitle: "Why are you sharing?", icon: Target },
    { id: 7, title: "Car Availability", subtitle: "When can guests book?", icon: Calendar },
    { id: 8, title: "Vehicle Details", subtitle: "Features and description", icon: Star },
    { id: 9, title: "Car Photos", subtitle: "Show off your vehicle", icon: Image },
    { id: 10, title: "Payout", subtitle: "How you'll get paid", icon: CreditCard },
    { id: 11, title: "Submit Your Vehicle", subtitle: "Complete your listing", icon: CheckCircle }
  ];

  const sidebarItems = [
    { icon: Calendar, label: "Calendar", path: "/calendar", active: false },
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
    { icon: Car, label: "Vehicles", path: "/vehicles", active: true },
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

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const progressWidth = (currentStep / totalSteps) * 100;

  // Vehicle features options
  const vehicleFeatures = [
    "All-wheel drive", "Android Auto", "Apple CarPlay",
    "AUX input", "Backup camera", "Bike rack",
    "Blind spot warning", "Bluetooth", "Child seat",
    "Convertible", "GPS", "Heated seats",
    "Keyless entry", "Pet friendly", "Ski rack",
    "Snow tires", "Sunroof", "Toll pass",
    "USB charger", "USB input", "Wheelchair accessible"
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Location
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003552" }}>
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                Where is your car located?
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Rentalosv needs your location to ensure we operate where you are.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div>
                <label className="block text-lg font-semibold mb-4" style={{ color: "#003552" }}>
                  Car Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your car's address"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  This helps us match you with nearby guests and comply with local regulations.
                </p>
              </div>
            </div>
          </div>
        );

      case 2: // License Plate
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003552" }}>
                <Car className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                License Plate
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your license plate information won't be publicly visible.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div>
                <label className="block text-lg font-semibold mb-4" style={{ color: "#003552" }}>
                  Plate Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your plate number"
                  value={formData.licensePlate}
                  onChange={(e) => updateFormData('licensePlate', e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                />
                <p className="text-sm text-gray-500 mt-3">
                  This information is kept private and used for verification purposes only.
                </p>
              </div>
            </div>
          </div>
        );

      case 3: // Make and Model
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003552" }}>
                <Car className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                Tell us about your vehicle
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Help us identify your car with basic information.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold mb-3" style={{ color: "#003552" }}>Year</label>
                  <select 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                    value={formData.year}
                    onChange={(e) => updateFormData('year', e.target.value)}
                  >
                    <option value="">Select your vehicle year</option>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-3" style={{ color: "#003552" }}>Make</label>
                  <select 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                    value={formData.make}
                    onChange={(e) => updateFormData('make', e.target.value)}
                  >
                    <option value="">Select your vehicle make</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Ford">Ford</option>
                    <option value="Toyota">Toyota</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-3" style={{ color: "#003552" }}>Model</label>
                  <select 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                    value={formData.model}
                    onChange={(e) => updateFormData('model', e.target.value)}
                  >
                    <option value="">Select your vehicle model</option>
                    <option value="A-Class">A-Class</option>
                    <option value="C-Class">C-Class</option>
                    <option value="E-Class">E-Class</option>
                    <option value="S-Class">S-Class</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Trim and Style
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003552" }}>
                <Settings className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                Trim and Style
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                These details help guests find exactly what they're looking for.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-sm font-medium text-gray-600 mb-2">TRIM</div>
                  <div className="text-2xl font-bold" style={{ color: "#003552" }}>{formData.trim}</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-sm font-medium text-gray-600 mb-2">STYLE</div>
                  <div className="text-2xl font-bold" style={{ color: "#003552" }}>{formData.style}</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Odometer and Transmission
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003552" }}>
                <Settings className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                Vehicle Details
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Help guests understand your car's condition and features.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-8">
              <div>
                <label className="block text-lg font-semibold mb-4" style={{ color: "#003552" }}>
                  Odometer Reading
                </label>
                <p className="text-gray-600 mb-4">What is your car's current mileage?</p>
                <select 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                  value={formData.odometer}
                  onChange={(e) => updateFormData('odometer', e.target.value)}
                >
                  <option value="">Select your odometer reading</option>
                  <option value="0-10000">0 - 10,000 miles</option>
                  <option value="10000-25000">10,000 - 25,000 miles</option>
                  <option value="25000-50000">25,000 - 50,000 miles</option>
                  <option value="50000-75000">50,000 - 75,000 miles</option>
                  <option value="75000-100000">75,000 - 100,000 miles</option>
                  <option value="100000+">100,000+ miles</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-4" style={{ color: "#003552" }}>
                  Transmission Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                    <input
                      type="radio"
                      name="transmission"
                      value="automatic"
                      checked={formData.transmission === "automatic"}
                      onChange={(e) => updateFormData('transmission', e.target.value)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-lg font-medium" style={{ color: "#003552" }}>Automatic</span>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                    <input
                      type="radio"
                      name="transmission"
                      value="manual"
                      checked={formData.transmission === "manual"}
                      onChange={(e) => updateFormData('transmission', e.target.value)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-lg font-medium" style={{ color: "#003552" }}>Manual</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 6: // Your Goals
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003552" }}>
                <Target className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                Your Goals
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Help us understand what you want to achieve by sharing your car.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-3" style={{ color: "#003552" }}>
                  What is your primary financial goal for sharing this car?
                </label>
                <select 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                  value={formData.financialGoal}
                  onChange={(e) => updateFormData('financialGoal', e.target.value)}
                >
                  <option value="">Select your goal</option>
                  <option value="cover-expenses">Cover car expenses</option>
                  <option value="extra-income">Generate extra income</option>
                  <option value="pay-off-loan">Pay off car loan</option>
                  <option value="business">Build a business</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3" style={{ color: "#003552" }}>
                  How often do you currently use this car?
                </label>
                <select 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                  value={formData.currentUsage}
                  onChange={(e) => updateFormData('currentUsage', e.target.value)}
                >
                  <option value="">Select usage frequency</option>
                  <option value="daily">Daily</option>
                  <option value="few-times-week">A few times a week</option>
                  <option value="weekends">Weekends only</option>
                  <option value="rarely">Rarely</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3" style={{ color: "#003552" }}>
                  How often do you want to share your car?
                </label>
                <select 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                  value={formData.shareFrequency}
                  onChange={(e) => updateFormData('shareFrequency', e.target.value)}
                >
                  <option value="">Select sharing frequency</option>
                  <option value="whenever-available">Whenever it's available</option>
                  <option value="weekends">Weekends only</option>
                  <option value="few-days-month">A few days a month</option>
                  <option value="special-occasions">Special occasions only</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 7: // Car Availability
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003552" }}>
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                Car Availability
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Set your preferences for when guests can book your car.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#003552" }}>Advance Notice</h3>
                <p className="text-gray-600 mb-6">How much advance notice do you need before a trip starts?</p>
                
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-3" style={{ color: "#003552" }}>
                    Advance notice at home
                  </label>
                  <select 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                    value={formData.advanceNotice}
                    onChange={(e) => updateFormData('advanceNotice', e.target.value)}
                  >
                    <option value="12 hours (recommended)">12 hours (recommended)</option>
                    <option value="1 day">1 day</option>
                    <option value="2 days">2 days</option>
                    <option value="3 days">3 days</option>
                  </select>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Info className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-purple-900 mb-2">Tips to get more bookings</p>
                    <p className="text-purple-700">
                      32% of trips at home locations are booked on shorter notice than your 
                      current requirement of 12 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#003552" }}>Trip Duration</h3>
                <p className="text-gray-600 mb-6">What's the shortest and longest possible trip you'll accept?</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold mb-3" style={{ color: "#003552" }}>
                      Minimum trip duration
                    </label>
                    <select 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                      value={formData.minimumTripDuration}
                      onChange={(e) => updateFormData('minimumTripDuration', e.target.value)}
                    >
                      <option value="1 day (recommended)">1 day (recommended)</option>
                      <option value="2 days">2 days</option>
                      <option value="3 days">3 days</option>
                      <option value="1 week">1 week</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-3" style={{ color: "#003552" }}>
                      Maximum trip duration
                    </label>
                    <select 
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg transition-colors"
                      value={formData.maximumTripDuration}
                      onChange={(e) => updateFormData('maximumTripDuration', e.target.value)}
                    >
                      <option value="3 weeks (recommended)">3 weeks (recommended)</option>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="1 month">1 month</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.requireWeekendMinimum}
                      onChange={(e) => updateFormData('requireWeekendMinimum', e.target.checked)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <span className="text-lg text-gray-700">
                      Require a 2-day minimum for trips that start Friday, Saturday, or Sunday.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 8: // Vehicle Details
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003552" }}>
                <Star className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                Vehicle Features & Description
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Highlight what makes your car special and attractive to guests.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: "#003552" }}>Vehicle Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {vehicleFeatures.map((feature, index) => (
                    <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-gray-900">{feature}</span>
                    </label>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Apple CarPlay is a registered trademark of Apple Inc. Android is a trademark of Google LLC.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#003552" }}>Description</h3>
                <p className="text-gray-600 mb-4">
                  Tell guests what makes your car unique and why they'll love driving it.
                </p>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Info className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-purple-900 mb-2">Tips to get more bookings</p>
                    <p className="text-purple-700">
                      Listings with descriptions of at least 100 words are up to three times 
                      more likely to get booked.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    rows={6}
                    placeholder="Describe what makes your car special. Mention comfort features, performance, or any unique qualities that guests will appreciate..."
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 resize-none text-lg transition-colors"
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                    {formData.description.split(' ').filter(word => word.length > 0).length} words
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 9: // Car Photos
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003552" }}>
                <Image className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                Show Off Your Vehicle
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                High quality photos increase your earning potential by attracting more guests.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-8">
              <div>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Upload at least 6 photos, including multiple exterior angles with the whole car in 
                  frame, as well as interior shots. 
                  <button className="text-blue-600 hover:underline ml-1">Learn more here.</button>
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <Sun className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-yellow-800">Shoot during daytime</p>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <Camera className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-blue-800">Take clear, crisp photos</p>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <Triangle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-green-800">Try somewhere open or scenic</p>
                  </div>

                  <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                    <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-red-800">Look out for moving cars</p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "#003552" }}>
                    Upload Your Car Photos
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop photos here, or click to browse
                  </p>
                  <button 
                    className="px-8 py-3 rounded-lg text-white font-semibold transition-all hover:shadow-lg"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    Choose Photos
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    Photos must be at least 640px by 320px and smaller than 10MB
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-medium">Front View</p>
                  </div>
                  <div className="text-center">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-medium">3/4 Front</p>
                  </div>
                  <div className="text-center">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-medium">Interior</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 10: // Payout
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003552" }}>
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                Get Paid Securely
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Set up your payment method to receive your earnings.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#003552" }}>
                  Set up Stripe account
                </h3>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  To receive your earnings, you need to set up an account with Stripe, our secure payment provider. 
                  Your payments will be processed safely and sent directly to your bank account.
                </p>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="font-semibold text-green-800">Secure & Trusted</span>
                  </div>
                  <p className="text-green-700">
                    Stripe is used by millions of businesses worldwide and meets the highest security standards.
                  </p>
                </div>

                <button 
                  className="px-8 py-4 border-2 rounded-xl font-semibold text-lg transition-all hover:bg-gray-50"
                  style={{ borderColor: "#003552", color: "#003552" }}
                >
                  Set up Stripe account
                </button>
                
                <p className="text-sm text-gray-500 mt-4">
                  You'll be redirected to Stripe's secure setup process
                </p>
              </div>
            </div>
          </div>
        );

      case 11: // Submit Your Vehicle
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FF7500" }}>
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#003552" }}>
                You're Almost Done!
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Review your information and submit your vehicle for approval.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-3">What happens next?</h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>We'll review your listing within 24-48 hours</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>You'll receive an email confirmation once approved</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Your car will be live and available for bookings</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">Listing Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <div className="font-medium">{formData.location || 'Not set'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Vehicle:</span>
                      <div className="font-medium">{formData.year} {formData.make} {formData.model}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Transmission:</span>
                      <div className="font-medium">{formData.transmission || 'Not set'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Features:</span>
                      <div className="font-medium">{formData.features.length} selected</div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => updateFormData('termsAccepted', e.target.checked)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <span className="text-gray-700 leading-relaxed">
                      I agree to the <button className="text-blue-600 hover:underline">Terms of Service</button> and 
                      <button className="text-blue-600 hover:underline ml-1">Privacy Policy</button>. 
                      I confirm that I own this vehicle and have the right to list it for rental.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.location.trim() !== '';
      case 2: return formData.licensePlate.trim() !== '';
      case 3: return formData.year && formData.make && formData.model;
      case 5: return formData.odometer && formData.transmission;
      case 6: return formData.financialGoal && formData.currentUsage && formData.shareFrequency;
      case 11: return formData.termsAccepted;
      default: return true;
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
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => navigate('/become-host')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back to Become Host</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-2xl font-bold" style={{ color: "#003552" }}>
                  List Your Car
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </div>
                <button className="text-sm text-blue-600 hover:underline">
                  View all steps
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-600">{Math.round(progressWidth)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${progressWidth}%`,
                    background: `linear-gradient(90deg, #FF7500 0%, #003552 100%)`
                  }}
                ></div>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex items-center justify-between mt-4 overflow-x-auto">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? 'text-white' 
                          : 'bg-gray-200 text-gray-500'
                    }`}
                    style={isActive ? { backgroundColor: "#FF7500" } : {}}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-xs text-center text-gray-600 px-1">
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {renderStepContent()}

          {/* Navigation */}
          <div className="max-w-2xl mx-auto mt-16 flex justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
            ) : (
              <div></div>
            )}
            
            <div className="flex space-x-4">
              {currentStep === totalSteps ? (
                <button
                  onClick={() => {
                    if (isStepValid()) {
                      // Handle form submission
                      console.log('Form submitted:', formData);
                      // You could navigate to a success page or show a success message
                    }
                  }}
                  disabled={!isStepValid()}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                    isStepValid()
                      ? 'text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  style={isStepValid() ? { backgroundColor: "#FF7500" } : {}}
                >
                  Submit Your Vehicle
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                    isStepValid()
                      ? 'text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  style={isStepValid() ? { backgroundColor: "#FF7500" } : {}}
                >
                  Continue
                </button>
              )}
            </div>
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

export default ListYourCar;
