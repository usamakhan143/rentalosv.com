import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share,
  Check,
} from "lucide-react";

const CarDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    pickupDate: "",
    returnDate: "",
    pickupTime: "10:00",
    returnTime: "10:00",
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  // Sample car data - in real app this would come from API
  const car = {
    id: 1,
    make: "Audi",
    model: "A3",
    year: 2017,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    ],
    price: 35,
    totalPrice: 245,
    rating: 5.0,
    reviewCount: 19,
    trips: 338,
    location: "Bow, London",
    description:
      "Looking for a reliable, efficient, and easy to drive car for your next trip? Look no further than my Audi A3! This compact car is perfect for navigating city streets and highways alike, and it comes with all the amenities you need for a comfortable and enjoyable driving experience.",
    host: {
      name: "Jaffar",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      joinDate: "Joined in Jan 2019",
      responseTime: "Responds in about 1 hour",
      isAllStar: true,
    },
    features: [
      "Adaptive cruise control",
      "Backup camera",
      "Bluetooth",
      "Child seat OK",
      "GPS",
      "Heated seats",
      "Pet friendly",
      "Snow tires",
      "Toll pass",
      "USB input",
    ],
    specifications: {
      doors: 4,
      seats: 5,
      transmission: "Automatic transmission",
      fuel: "Petrol",
    },
    distanceIncluded: "200 miles",
    extraMileageFee: "£0.20/mile",
    cancellationPolicy: "Flexible",
    advanceNotice: "1 hour",
    minTripDuration: "1 hour",
    maxTripDuration: "27 days",
    reviews: [
      {
        id: 1,
        author: "Sarah M.",
        rating: 5,
        date: "3 days ago",
        text: "Car was great! 10/10 experience. Clean in the beginning but it was easy, painless. Would definitely use again. The car was the perfect size for my weekend trip.",
      },
      {
        id: 2,
        author: "Mike R.",
        rating: 5,
        date: "1 week ago",
        text: "It was a great pleasure! So available all the time and lots of help.",
      },
      {
        id: 3,
        author: "Emma T.",
        rating: 5,
        date: "2 weeks ago",
        text: "Had a great experience with the host. The car was clean and comfortable. Perfect for our weekend trip. Highly recommend!",
      },
    ],
    rules: [
      "No smoking",
      "Keep it clean and bring it back on time.",
      "No pets (unless you add the pet fee)",
      "Return the car to the same pickup location",
      "All drivers need to be approved to drive",
      "24/7 customer support",
    ],
  };

  const ratingBreakdown = {
    5: 85,
    4: 10,
    3: 3,
    2: 1,
    1: 1,
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === car.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.images.length - 1 : prev - 1,
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="mx-auto px-[15px] lg:px-[120px] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                <img
                  src={car.images[currentImageIndex]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/80 hover:bg-white rounded-full p-2 transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-white/80 hover:bg-white rounded-full p-2 transition-all">
                    <Share className="w-5 h-5" />
                  </button>
                </div>

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-orange-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${car.make} ${car.model} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Title and Basic Info */}
            <div className="mb-8">
              <h1
                className="text-3xl font-bold mb-4"
                style={{ color: "#003552" }}
              >
                {car.make} {car.model} {car.year}
              </h1>

              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{car.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({car.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{car.trips} trips</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{car.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {car.specifications.doors} doors
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {car.specifications.seats} seats
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {car.specifications.transmission}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {car.specifications.fuel}
                </span>
              </div>
            </div>

            {/* Hosted by */}
            <div className="mb-8 p-6 border border-gray-200 rounded-2xl">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#003552" }}
              >
                Hosted by
              </h3>
              <div className="flex items-center space-x-4">
                <img
                  src={car.host.avatar}
                  alt={car.host.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold" style={{ color: "#003552" }}>
                      {car.host.name}
                    </h4>
                    {car.host.isAllStar && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        ⭐ All-Star Host
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{car.host.joinDate}</p>
                  <p className="text-sm text-gray-600">
                    {car.host.responseTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#003552" }}
              >
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Vehicle Features */}
            <div className="mb-8">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#003552" }}
              >
                Vehicle Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-8">
              <h3
                className="text-lg font-semibold mb-6"
                style={{ color: "#003552" }}
              >
                Ratings and reviews
              </h3>

              {/* Overall rating */}
              <div className="flex items-center space-x-8 mb-8">
                <div className="text-center">
                  <div
                    className="text-4xl font-bold"
                    style={{ color: "#003552" }}
                  >
                    {car.rating}
                  </div>
                  <div className="flex justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {car.reviewCount} reviews
                  </p>
                </div>

                <div className="flex-1">
                  {Object.entries(ratingBreakdown)
                    .reverse()
                    .map(([rating, percentage]) => (
                      <div
                        key={rating}
                        className="flex items-center space-x-2 mb-1"
                      >
                        <span className="text-sm w-8">{rating}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              backgroundColor: "#003552",
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {percentage}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Individual reviews */}
              <div className="space-y-6">
                {car.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-6"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h5
                            className="font-semibold text-sm"
                            style={{ color: "#003552" }}
                          >
                            {review.author}
                          </h5>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>

              <button
                className="mt-6 px-6 py-3 border-2 rounded-lg font-semibold transition-all hover:bg-gray-50"
                style={{ borderColor: "#003552", color: "#003552" }}
              >
                Show more
              </button>
            </div>

            {/* Rules of the road */}
            <div className="mb-8">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#003552" }}
              >
                Rules of the road
              </h3>
              <div className="space-y-3">
                {car.rules.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="mt-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                    <span className="text-sm text-gray-600">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map section placeholder */}
            <div className="mb-8">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#003552" }}
              >
                Pickup location
              </h3>
              <div className="h-64 bg-gray-200 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p>Map showing pickup location</p>
                  <p className="text-sm">{car.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="border border-gray-200 rounded-2xl p-6 shadow-lg">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "#003552" }}
                    >
                      £{car.price}
                    </span>
                    <span className="text-gray-500">total</span>
                  </div>
                  <p className="text-sm text-gray-600">For your trip</p>
                </div>

                {/* Trip Settings */}
                <div className="mb-6">
                  <h4
                    className="font-semibold mb-4"
                    style={{ color: "#003552" }}
                  >
                    Trip Settings
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup date & time
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                          value={selectedDates.pickupDate}
                          onChange={(e) =>
                            setSelectedDates({
                              ...selectedDates,
                              pickupDate: e.target.value,
                            })
                          }
                        />
                        <select
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                          value={selectedDates.pickupTime}
                          onChange={(e) =>
                            setSelectedDates({
                              ...selectedDates,
                              pickupTime: e.target.value,
                            })
                          }
                        >
                          <option>10:00</option>
                          <option>11:00</option>
                          <option>12:00</option>
                          <option>13:00</option>
                          <option>14:00</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Return date & time
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                          value={selectedDates.returnDate}
                          onChange={(e) =>
                            setSelectedDates({
                              ...selectedDates,
                              returnDate: e.target.value,
                            })
                          }
                        />
                        <select
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                          value={selectedDates.returnTime}
                          onChange={(e) =>
                            setSelectedDates({
                              ...selectedDates,
                              returnTime: e.target.value,
                            })
                          }
                        >
                          <option>10:00</option>
                          <option>11:00</option>
                          <option>12:00</option>
                          <option>13:00</option>
                          <option>14:00</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4
                    className="font-semibold mb-3"
                    style={{ color: "#003552" }}
                  >
                    Price Breakdown
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Trip fee</span>
                      <span>£{car.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>£15</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>£{car.totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Distance Included */}
                <div className="mb-6">
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: "#003552" }}
                  >
                    Distance included
                  </h4>
                  <p className="text-sm text-gray-600">
                    {car.distanceIncluded}
                  </p>
                  <p className="text-xs text-gray-500">
                    Extra distance: {car.extraMileageFee}
                  </p>
                </div>

                {/* Insurance */}
                <div className="mb-6">
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: "#003552" }}
                  >
                    Insurance
                  </h4>
                  <div className="text-sm text-gray-600">
                    <p>Protection plan included</p>
                    <p className="text-xs text-gray-500">
                      Coverage details available after booking
                    </p>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  className="w-full py-4 text-white font-semibold rounded-lg text-lg transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#003552" }}
                >
                  Continue
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  You won't be charged yet
                </p>

                {/* Additional Info */}
                <div className="mt-6 text-xs text-gray-500 space-y-1">
                  <p>• Cancellation: {car.cancellationPolicy}</p>
                  <p>• Advance notice: {car.advanceNotice}</p>
                  <p>• Min trip: {car.minTripDuration}</p>
                  <p>• Max trip: {car.maxTripDuration}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
