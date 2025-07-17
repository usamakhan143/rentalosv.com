import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { carService } from "../../services/firestore";
import Input, { Select, TextArea } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ImageUpload from "../../components/ui/ImageUpload";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addNotification } = useApp();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    // Will be populated when car data loads
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCarData();
  }, [id]);

  const fetchCarData = async () => {
    try {
      const carData = await carService.getCarById(id);

      if (!carData) {
        addNotification({
          type: "error",
          title: "Car not found",
          message: "The car you are looking for does not exist.",
        });
        navigate("/my-cars");
        return;
      }

      // Check if current user owns this car
      if (carData.ownerId !== currentUser.uid) {
        addNotification({
          type: "error",
          title: "Access denied",
          message: "You do not have permission to edit this car.",
        });
        navigate("/my-cars");
        return;
      }

      setCar(carData);

      // Populate form data
      setFormData({
        // Basic Information
        make: carData.specs?.make || "",
        model: carData.specs?.model || "",
        year: carData.specs?.year || new Date().getFullYear(),
        color: carData.specs?.color || "",
        licensePlate: carData.specs?.licensePlate || "",
        mileage: carData.specs?.mileage || "",
        transmission: carData.specs?.transmission || "automatic",
        fuelType: carData.specs?.fuelType || "gasoline",
        seats: carData.specs?.seats || 5,

        // Pricing
        dailyRate: carData.pricing?.dailyRate || "",
        weeklyDiscount: carData.pricing?.weeklyDiscount || 10,
        monthlyDiscount: carData.pricing?.monthlyDiscount || 20,

        // Location
        address: carData.location?.address || "",
        city: carData.location?.city || "",
        state: carData.location?.state || "",
        zipCode: carData.location?.zipCode || "",

        // Description & Features
        description: carData.description || "",
        features: carData.features || [],
        rules: carData.rules || "",

        // Availability
        instantBook: carData.availability?.instantBook || false,
        advanceNotice: carData.availability?.advanceNotice || "2_hours",
        minTripLength: carData.availability?.minTripLength || "1_day",
        maxTripLength: carData.availability?.maxTripLength || "7_days",

        // Insurance & Protection
        protectionPlan: carData.protectionPlan || "basic",
      });

      // Convert existing images to the format expected by ImageUpload
      const existingImages = (carData.images || []).map((url, index) => ({
        id: `existing_${index}`,
        url: url,
        preview: url,
        uploaded: true,
        uploading: false,
      }));
      setImages(existingImages);
    } catch (error) {
      console.error("Error fetching car:", error);
      addNotification({
        type: "error",
        title: "Error loading car",
        message: "Failed to load car data. Please try again.",
      });
      navigate("/my-cars");
    } finally {
      setLoading(false);
    }
  };

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

    setSaving(true);

    try {
      // Prepare image URLs (existing + new uploads)
      const imageUrls = images.map((image) => image.url || image.preview);

      // Update car data
      const updatedCarData = {
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
        description: formData.description,
        features: formData.features,
        rules: formData.rules,
        availability: {
          instantBook: formData.instantBook,
          advanceNotice: formData.advanceNotice,
          minTripLength: formData.minTripLength,
          maxTripLength: formData.maxTripLength,
        },
        protectionPlan: formData.protectionPlan,
        images: imageUrls,
      };

      await carService.updateCar(id, updatedCarData);

      addNotification({
        type: "success",
        title: "Car updated successfully!",
        message: "Your car listing has been updated.",
      });

      navigate("/my-cars");
    } catch (error) {
      console.error("Error updating car:", error);
      addNotification({
        type: "error",
        title: "Failed to update car",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            Loading car details...
          </h2>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Car not found
          </h2>
          <p className="text-gray-600 mb-4">
            The car you are looking for does not exist.
          </p>
          <Button onClick={() => navigate("/my-cars")}>Back to My Cars</Button>
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
          <h1 className="text-3xl font-bold text-gray-900">
            Edit {car.specs?.year} {car.specs?.make} {car.specs?.model}
          </h1>
          <p className="text-gray-600 mt-2">
            Update your car listing information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photos Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
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
                error={errors.make}
              />

              <Input
                label="Model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
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
                error={errors.color}
              />

              <Input
                label="License Plate"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleInputChange}
                error={errors.licensePlate}
              />

              <Input
                label="Mileage"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleInputChange}
                error={errors.mileage}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Daily Rate ($)"
                name="dailyRate"
                type="number"
                value={formData.dailyRate}
                onChange={handleInputChange}
                error={errors.dailyRate}
              />

              <Input
                label="Weekly Discount (%)"
                name="weeklyDiscount"
                type="number"
                value={formData.weeklyDiscount}
                onChange={handleInputChange}
                min="0"
                max="50"
              />

              <Input
                label="Monthly Discount (%)"
                name="monthlyDiscount"
                type="number"
                value={formData.monthlyDiscount}
                onChange={handleInputChange}
                min="0"
                max="50"
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
              error={errors.description}
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
                    checked={formData.features?.includes(feature) || false}
                    onChange={() => handleFeatureToggle(feature)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/my-cars")}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={saving}
              disabled={saving}
              icon={<Save className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCar;
