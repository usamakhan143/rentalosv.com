import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Shield,
  Clock,
  Smartphone,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const { setSearchFilters } = useApp();
  const [searchData, setSearchData] = useState({
    location: "",
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "10:00",
    dropoffTime: "10:00",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (
      !searchData.location ||
      !searchData.pickupDate ||
      !searchData.dropoffDate
    ) {
      return;
    }

    setSearchFilters({
      location: searchData.location,
      pickupDate: new Date(searchData.pickupDate + "T" + searchData.pickupTime),
      dropoffDate: new Date(
        searchData.dropoffDate + "T" + searchData.dropoffTime,
      ),
    });

    navigate("/search");
  };

  const featuredCars = [
    {
      id: 1,
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      price: 89,
      rating: 4.9,
      trips: 156,
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      host: "Sarah M.",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      make: "BMW",
      model: "X3",
      year: 2022,
      price: 75,
      rating: 4.8,
      trips: 89,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      host: "Michael R.",
      location: "Los Angeles, CA",
    },
    {
      id: 3,
      make: "Audi",
      model: "A4",
      year: 2023,
      price: 68,
      rating: 4.7,
      trips: 203,
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      host: "Emma K.",
      location: "New York, NY",
    },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Find the perfect car",
      description: "Choose from hundreds of models in your area",
      icon: Search,
    },
    {
      step: 2,
      title: "Book instantly",
      description: "Get approved immediately or book with the host",
      icon: Calendar,
    },
    {
      step: 3,
      title: "Start your trip",
      description: "Pick up your car and start your adventure",
      icon: Clock,
    },
  ];

  const features = [
    {
      title: "24/7 Support",
      description: "Get help whenever you need it",
      icon: Smartphone,
    },
    {
      title: "Insurance Included",
      description: "Every trip includes insurance coverage",
      icon: Shield,
    },
    {
      title: "Trusted Community",
      description: "Join millions of satisfied members",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find your perfect
              <span className="text-primary-600"> car rental</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Book cars from trusted hosts in your neighborhood. Skip the rental
              car counter and discover the perfect car for your next adventure.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Location */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Where
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="City, state"
                      value={searchData.location}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          location: e.target.value,
                        })
                      }
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Pickup Date & Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pick-up
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={searchData.pickupDate}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          pickupDate: e.target.value,
                        })
                      }
                      className="input-field text-sm"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                    <input
                      type="time"
                      value={searchData.pickupTime}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          pickupTime: e.target.value,
                        })
                      }
                      className="input-field text-sm"
                    />
                  </div>
                </div>

                {/* Dropoff Date & Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drop-off
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={searchData.dropoffDate}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          dropoffDate: e.target.value,
                        })
                      }
                      className="input-field text-sm"
                      min={
                        searchData.pickupDate ||
                        new Date().toISOString().split("T")[0]
                      }
                      required
                    />
                    <input
                      type="time"
                      value={searchData.dropoffTime}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          dropoffTime: e.target.value,
                        })
                      }
                      className="input-field text-sm"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Admin Setup Banner - For Testing */}
      <section className="py-4 bg-blue-50 border-y border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center">
            <div className="flex items-center space-x-3 text-blue-700">
              <Shield className="h-5 w-5" />
              <span className="text-sm">
                Testing admin features?
                <Link
                  to="/admin-setup"
                  className="ml-2 font-medium underline hover:text-blue-900"
                >
                  Create Admin User
                </Link>
                {" or "}
                <Link
                  to="/login"
                  className="font-medium underline hover:text-blue-900"
                >
                  Login
                </Link>
                {" with admin@carshare.com"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular cars near you
            </h2>
            <p className="text-xl text-gray-600">
              Discover the most booked cars in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="card-hover">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{car.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        ${car.price}
                      </p>
                      <p className="text-sm text-gray-500">per day</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{car.location}</p>
                  <p className="text-sm text-gray-500">
                    {car.trips} trips • Hosted by {car.host}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => navigate("/search")} className="btn-outline">
              View all cars
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How CarShare works
            </h2>
            <p className="text-xl text-gray-600">
              Book a car in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="mb-4">
                    <span className="text-primary-600 font-semibold text-sm">
                      STEP {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why choose CarShare?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join millions of satisfied members who trust us for their car
                rental needs.
              </p>

              <div className="space-y-6">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Car sharing experience"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fully Insured</p>
                    <p className="text-sm text-gray-500">
                      Every trip protected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of car owners earning extra income by sharing their
            cars, or find the perfect car for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Find cars near you
            </button>
            <button
              onClick={() => navigate("/become-host")}
              className="bg-transparent text-white font-semibold py-3 px-8 rounded-lg border border-white hover:bg-white hover:text-primary-600 transition-colors"
            >
              Become a host
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
