import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, DollarSign, Shield } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { carService } from "../../services/firestore";
import { imageUploadService } from "../../services/storage";
import Input, { Select, TextArea } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ImageUpload from "../../components/ui/ImageUpload";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const AddCar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addNotification } = useApp();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    // Basic Information
    make: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    licensePlate: "",
    mileage: "",
    transmission: "automatic",
    fuelType: "gasoline",
    seats: 5,

    // Pricing
    dailyRate: "",
    weeklyDiscount: 10,
    monthlyDiscount: 20,

    // Location
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Description & Features
    description: "",
    features: [],
    rules: "",

    // Availability
    instantBook: false,
    advanceNotice: "2_hours",
    minTripLength: "1_day",
    maxTripLength: "7_days",

    // Insurance & Protection
    protectionPlan: "basic",
  });

  const [errors, setErrors] = useState({});

  const carMakes = [
    "Acura",
    "Audi",
    "BMW",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Ford",
    "Genesis",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Kia",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Mazda",
    "Mercedes-Benz",
    "MINI",
    "Mitsubishi",
    "Nissan",
    "Porsche",
    "Ram",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
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
    "Remote Start",
    "Parking Sensors",
    "Blind Spot Monitor",
    "Lane Assist",
    "Adaptive Cruise Control",
    "All-Wheel Drive",
    "Third Row Seating",
  ];

  const protectionPlans = [
    {
      value: "basic",
      label: "Basic Protection (10% fee)",
      description: "Standard coverage for most trips",
    },
    {
      value: "standard",
      label: "Standard Protection (15% fee)",
      description: "Enhanced coverage with lower deductible",
    },
    {
      value: "premium",
      label: "Premium Protection (25% fee)",
      description: "Maximum coverage with zero deductible",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    const requiredFields = [
      "make",
      "model",
      "year",
      "color",
      "licensePlate",
      "mileage",
      "dailyRate",
      "address",
      "city",
      "state",
      "zipCode",
      "description",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Specific validations
    if (formData.year < 1990 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = "Invalid year";
    }

    if (formData.mileage && (isNaN(formData.mileage) || formData.mileage < 0)) {
      newErrors.mileage = "Invalid mileage";
    }

    if (
      formData.dailyRate &&
      (isNaN(formData.dailyRate) || formData.dailyRate < 10)
    ) {
      newErrors.dailyRate = "Daily rate must be at least $10";
    }

    if (images.length === 0) {
      newErrors.images = "Please upload at least one image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addNotification({
        type: "error",
        title: "Validation Error",
        message: "Please fix the errors below",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload images first
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          if (image.file) {
            return await imageUploadService.uploadCarImages(
              "temp_" + Date.now(),
              [image.file],
            );
          }
          return image.url;
        }),
      );

      // Create car data
      const carData = {
        ...formData,
        ownerId: currentUser.uid,
        images: imageUrls.flat(),
        status: "pending_approval",
        availability: {
          instantBook: formData.instantBook,
          advanceNotice: formData.advanceNotice,
          minTripLength: formData.minTripLength,
          maxTripLength: formData.maxTripLength,
        },
        pricing: {
          dailyRate: parseFloat(formData.dailyRate),
          weeklyDiscount: formData.weeklyDiscount,
          monthlyDiscount: formData.monthlyDiscount,
        },
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        specs: {
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year),
          color: formData.color,
          licensePlate: formData.licensePlate,
          mileage: parseInt(formData.mileage),
          transmission: formData.transmission,
          fuelType: formData.fuelType,
          seats: parseInt(formData.seats),
        },
        features: formData.features,
        rules: formData.rules,
        protectionPlan: formData.protectionPlan,
        bookings: 0,
        rating: 0,
        reviews: [],
      };

      await carService.createCar(carData);

      addNotification({
        type: "success",
        title: "Car listed successfully!",
        message: "Your car is now under review and will be available soon.",
      });

      navigate("/my-cars");
    } catch (error) {
      console.error("Error creating car:", error);
      addNotification({
        type: "error",
        title: "Failed to list car",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Listing your car...
          </h2>
          <p className="text-gray-600">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/my-cars")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to My Cars
          </button>
          <h1 className="text-3xl font-bold text-gray-900">List your car</h1>
          <p className="text-gray-600 mt-2">
            Share your car and start earning money today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photos Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
            <p className="text-gray-600 mb-6">
              Add photos to help renters get a good sense of your car. You can
              add up to 10 photos.
            </p>
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={10}
            />
            {errors.images && (
              <p className="mt-2 text-sm text-red-600">{errors.images}</p>
            )}
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Make"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                options={carMakes.map((make) => ({ value: make, label: make }))}
                placeholder="Select make"
                error={errors.make}
              />

              <Input
                label="Model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="e.g., Camry, Model 3, F-150"
                error={errors.model}
              />

              <Input
                label="Year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleInputChange}
                min="1990"
                max={new Date().getFullYear() + 1}
                error={errors.year}
              />

              <Input
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="e.g., White, Black, Silver"
                error={errors.color}
              />

              <Input
                label="License Plate"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleInputChange}
                placeholder="ABC-1234"
                error={errors.licensePlate}
              />

              <Input
                label="Mileage"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleInputChange}
                placeholder="50000"
                error={errors.mileage}
              />

              <Select
                label="Transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                options={[
                  { value: "automatic", label: "Automatic" },
                  { value: "manual", label: "Manual" },
                ]}
              />

              <Select
                label="Fuel Type"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                options={[
                  { value: "gasoline", label: "Gasoline" },
                  { value: "diesel", label: "Diesel" },
                  { value: "electric", label: "Electric" },
                  { value: "hybrid", label: "Hybrid" },
                ]}
              />

              <Select
                label="Number of Seats"
                name="seats"
                value={formData.seats}
                onChange={handleInputChange}
                options={[
                  { value: 2, label: "2 seats" },
                  { value: 4, label: "4 seats" },
                  { value: 5, label: "5 seats" },
                  { value: 7, label: "7 seats" },
                  { value: 8, label: "8+ seats" },
                ]}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <DollarSign className="w-6 h-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Daily Rate ($)"
                name="dailyRate"
                type="number"
                value={formData.dailyRate}
                onChange={handleInputChange}
                placeholder="75"
                error={errors.dailyRate}
                helperText="Recommended: $40-$150/day"
              />

              <Input
                label="Weekly Discount (%)"
                name="weeklyDiscount"
                type="number"
                value={formData.weeklyDiscount}
                onChange={handleInputChange}
                min="0"
                max="50"
                helperText="For 7+ day trips"
              />

              <Input
                label="Monthly Discount (%)"
                name="monthlyDiscount"
                type="number"
                value={formData.monthlyDiscount}
                onChange={handleInputChange}
                min="0"
                max="50"
                helperText="For 30+ day trips"
              />
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Location</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Street Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  error={errors.address}
                />
              </div>

              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="San Francisco"
                error={errors.city}
              />

              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="CA"
                error={errors.state}
              />

              <Input
                label="ZIP Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="94102"
                error={errors.zipCode}
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Description
            </h2>

            <TextArea
              label="Car Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe your car, its condition, and any special features..."
              error={errors.description}
              helperText="Help renters understand what makes your car special"
            />
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Features & Amenities
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature) => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Availability
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="instantBook"
                  name="instantBook"
                  checked={formData.instantBook}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="instantBook" className="ml-3">
                  <span className="text-sm font-medium text-gray-900">
                    Instant Book
                  </span>
                  <span className="text-sm text-gray-500 block">
                    Guests can book immediately without approval
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Select
                  label="Advance Notice"
                  name="advanceNotice"
                  value={formData.advanceNotice}
                  onChange={handleInputChange}
                  options={[
                    { value: "2_hours", label: "2 hours" },
                    { value: "4_hours", label: "4 hours" },
                    { value: "1_day", label: "1 day" },
                    { value: "2_days", label: "2 days" },
                    { value: "3_days", label: "3 days" },
                  ]}
                />

                <Select
                  label="Minimum Trip Length"
                  name="minTripLength"
                  value={formData.minTripLength}
                  onChange={handleInputChange}
                  options={[
                    { value: "1_day", label: "1 day" },
                    { value: "2_days", label: "2 days" },
                    { value: "3_days", label: "3 days" },
                    { value: "1_week", label: "1 week" },
                  ]}
                />

                <Select
                  label="Maximum Trip Length"
                  name="maxTripLength"
                  value={formData.maxTripLength}
                  onChange={handleInputChange}
                  options={[
                    { value: "7_days", label: "7 days" },
                    { value: "14_days", label: "14 days" },
                    { value: "30_days", label: "30 days" },
                    { value: "unlimited", label: "Unlimited" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Protection Plan */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Protection Plan
              </h2>
            </div>

            <div className="space-y-4">
              {protectionPlans.map((plan) => (
                <label key={plan.value} className="relative">
                  <input
                    type="radio"
                    name="protectionPlan"
                    value={plan.value}
                    checked={formData.protectionPlan === plan.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.protectionPlan === plan.value
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">{plan.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {plan.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              House Rules
            </h2>

            <TextArea
              label="Trip Rules (Optional)"
              name="rules"
              value={formData.rules}
              onChange={handleInputChange}
              rows={3}
              placeholder="Any specific rules or requirements for renters..."
              helperText="e.g., No smoking, No pets, Must return with same fuel level"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/my-cars")}
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading} disabled={loading}>
              List My Car
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
