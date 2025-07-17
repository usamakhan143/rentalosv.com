import React, { useState, useRef } from "react";
import {
  Camera,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Gauge,
  X,
} from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import { bookingService } from "../../services/booking";
import { imageUploadService } from "../../services/storage";
import Button from "../ui/Button";
import Input, { TextArea, Select } from "../ui/Input";

const TripCheckInOut = ({ booking, isCheckIn = true, onComplete }) => {
  const { addNotification } = useApp();
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fileInputRef = useRef(null);

  const [checkData, setCheckData] = useState({
    mileage: "",
    fuelLevel: isCheckIn ? "100" : "",
    damageNotes: "",
    location: "",
    additionalNotes: "",
    condition: "excellent",
  });

  const requiredPhotos = [
    { id: "front", label: "Front of car", required: true },
    { id: "back", label: "Back of car", required: true },
    { id: "left", label: "Left side", required: true },
    { id: "right", label: "Right side", required: true },
    { id: "interior", label: "Interior", required: true },
    { id: "dashboard", label: "Dashboard/Mileage", required: true },
    { id: "fuel", label: "Fuel gauge", required: true },
    { id: "damage", label: "Any damage (if applicable)", required: false },
  ];

  const fuelLevels = [
    { value: "0", label: "Empty" },
    { value: "25", label: "1/4 Tank" },
    { value: "50", label: "1/2 Tank" },
    { value: "75", label: "3/4 Tank" },
    { value: "100", label: "Full Tank" },
  ];

  const conditionOptions = [
    { value: "excellent", label: "Excellent - No issues" },
    { value: "good", label: "Good - Minor wear" },
    { value: "fair", label: "Fair - Some issues noted" },
    { value: "poor", label: "Poor - Significant issues" },
  ];

  const handlePhotoCapture = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setLoading(true);
    try {
      const newPhotos = [];

      for (const file of files) {
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);

        newPhotos.push({
          id: Date.now() + Math.random(),
          file: file,
          preview: previewUrl,
          category:
            requiredPhotos[photos.length % requiredPhotos.length]?.id ||
            "general",
          uploaded: false,
        });
      }

      setPhotos([...photos, ...newPhotos]);
    } catch (error) {
      console.error("Error processing photos:", error);
      addNotification({
        type: "error",
        title: "Photo error",
        message: "Failed to process photos. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = (photoId) => {
    const photoToRemove = photos.find((p) => p.id === photoId);
    if (photoToRemove?.preview) {
      URL.revokeObjectURL(photoToRemove.preview);
    }
    setPhotos(photos.filter((p) => p.id !== photoId));
  };

  const handleSubmit = async () => {
    // Validation
    if (!checkData.mileage) {
      addNotification({
        type: "error",
        title: "Missing information",
        message: "Please enter the current mileage.",
      });
      return;
    }

    if (photos.length < 6) {
      addNotification({
        type: "error",
        title: "More photos needed",
        message: "Please take at least 6 photos of the vehicle.",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload photos
      const uploadedPhotos = await Promise.all(
        photos.map(async (photo) => {
          if (photo.file) {
            const url = await imageUploadService.uploadTripPhotos(
              booking.id,
              [photo.file],
              isCheckIn ? "checkin" : "checkout",
            );
            return {
              ...photo,
              url: url[0],
              uploaded: true,
            };
          }
          return photo;
        }),
      );

      // Prepare check-in/out data
      const tripData = {
        ...checkData,
        photos: uploadedPhotos,
        timestamp: new Date(),
        type: isCheckIn ? "checkin" : "checkout",
        photoCategories: uploadedPhotos.reduce((acc, photo) => {
          acc[photo.category] = photo.url;
          return acc;
        }, {}),
      };

      // Submit to booking service
      if (isCheckIn) {
        await bookingService.startTrip(booking.id, tripData);
        addNotification({
          type: "success",
          title: "Trip started!",
          message: "Check-in completed successfully. Enjoy your trip!",
        });
      } else {
        await bookingService.endTrip(booking.id, tripData);
        addNotification({
          type: "success",
          title: "Trip completed!",
          message:
            "Check-out completed successfully. Thank you for using CarShare!",
        });
      }

      onComplete?.(tripData);
    } catch (error) {
      console.error("Error submitting check data:", error);
      addNotification({
        type: "error",
        title: `${isCheckIn ? "Check-in" : "Check-out"} failed`,
        message: "Failed to complete the process. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRequiredPhotoStatus = () => {
    const taken = {};
    photos.forEach((photo) => {
      taken[photo.category] = true;
    });

    return requiredPhotos.map((photo) => ({
      ...photo,
      taken: !!taken[photo.id],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isCheckIn ? "Trip Check-In" : "Trip Check-Out"}
        </h2>
        <p className="text-gray-600">
          {isCheckIn
            ? "Document the vehicle condition before starting your trip"
            : "Document the vehicle condition at the end of your trip"}
        </p>
      </div>

      {/* Car Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <img
            src={
              booking.carDetails?.image ||
              "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
            }
            alt={`${booking.carDetails?.make} ${booking.carDetails?.model}`}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">
              {booking.carDetails?.year} {booking.carDetails?.make}{" "}
              {booking.carDetails?.model}
            </h3>
            <p className="text-gray-600">
              License: {booking.carDetails?.licensePlate}
            </p>
          </div>
        </div>
      </div>

      {/* Photo Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Vehicle Photos</h3>
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            icon={<Camera className="w-4 h-4" />}
            disabled={loading}
          >
            Take Photos
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={handlePhotoCapture}
          className="hidden"
        />

        {/* Required Photos Checklist */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {getRequiredPhotoStatus().map((photo) => (
            <div
              key={photo.id}
              className={`p-3 rounded-lg border-2 ${
                photo.taken
                  ? "border-green-200 bg-green-50"
                  : photo.required
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-2">
                {photo.taken ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : photo.required ? (
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                ) : (
                  <Camera className="w-4 h-4 text-gray-400" />
                )}
                <span
                  className={`text-xs font-medium ${
                    photo.taken
                      ? "text-green-800"
                      : photo.required
                        ? "text-red-800"
                        : "text-gray-600"
                  }`}
                >
                  {photo.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={photo.preview}
                  alt={`${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {requiredPhotos.find((p) => p.id === photo.category)?.label ||
                    "General"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vehicle Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Current Mileage"
          type="number"
          value={checkData.mileage}
          onChange={(e) =>
            setCheckData({ ...checkData, mileage: e.target.value })
          }
          placeholder="Enter current mileage"
          icon={<Gauge className="w-4 h-4" />}
          required
        />

        <Select
          label="Fuel Level"
          value={checkData.fuelLevel}
          onChange={(e) =>
            setCheckData({ ...checkData, fuelLevel: e.target.value })
          }
          options={fuelLevels}
          required
        />

        <Select
          label="Vehicle Condition"
          value={checkData.condition}
          onChange={(e) =>
            setCheckData({ ...checkData, condition: e.target.value })
          }
          options={conditionOptions}
          containerClassName="md:col-span-2"
        />

        <Input
          label="Current Location"
          value={checkData.location}
          onChange={(e) =>
            setCheckData({ ...checkData, location: e.target.value })
          }
          placeholder="Where are you picking up/returning the car?"
          icon={<MapPin className="w-4 h-4" />}
          containerClassName="md:col-span-2"
        />
      </div>

      {/* Damage Notes */}
      <TextArea
        label={`${isCheckIn ? "Pre-existing" : "New"} Damage or Issues`}
        value={checkData.damageNotes}
        onChange={(e) =>
          setCheckData({ ...checkData, damageNotes: e.target.value })
        }
        placeholder={`Describe any ${isCheckIn ? "existing" : "new"} damage, scratches, or issues...`}
        rows={3}
      />

      {/* Additional Notes */}
      <TextArea
        label="Additional Notes"
        value={checkData.additionalNotes}
        onChange={(e) =>
          setCheckData({ ...checkData, additionalNotes: e.target.value })
        }
        placeholder="Any other observations or notes..."
        rows={2}
      />

      {/* Important Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Important Notice</h4>
            <p className="text-sm text-blue-800">
              {isCheckIn
                ? "Please document any existing damage before starting your trip. This protects both you and the car owner."
                : "Please ensure you return the car in the same condition and fuel level as when you picked it up."}
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={loading || !checkData.mileage || photos.length < 6}
          size="lg"
          icon={<CheckCircle className="w-5 h-5" />}
        >
          {isCheckIn ? "Start Trip" : "Complete Trip"}
        </Button>
      </div>
    </div>
  );
};

export default TripCheckInOut;
