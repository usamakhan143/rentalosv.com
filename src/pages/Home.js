import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "../contexts/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const { setSearchFilters } = useApp();
  const [searchData, setSearchData] = useState({
    location: "",
    pickupDate: "19/07/2025",
    dropoffDate: "22/07/2025",
    pickupTime: "10:00",
    dropoffTime: "10:00",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchData.location) {
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

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const browseByMake = [
    {
      name: "Mercedes-Benz",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F68a6b9ee4717408c803a78c1d017687c?format=webp&width=800",
    },
    {
      name: "Tesla",
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop",
    },
    {
      name: "Volkswagen",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
    },
    {
      name: "Porsche",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=200&fit=crop",
    },
    {
      name: "BMW",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
    },
  ];

  const browseByDestination = [
    {
      name: "Miami",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Ff89f67d56d4d40d0b40363c513e44417?format=webp&width=800",
    },
    {
      name: "Manchester",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F46b7c8494e1946ac855420a058aaa14c?format=webp&width=800",
    },
    {
      name: "London",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Faf218cdb0bfa477d9a25a53fa6208a5e?format=webp&width=800",
    },
    {
      name: "Dubai",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F63a82f49e31a448da8ce668491fb9a7b?format=webp&width=800",
    },
    {
      name: "Los Angeles",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F46ca9b21d1be479a9bde6a4403c2281f?format=webp&width=800",
    },
    {
      name: "Las Vegas",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Fc02ea3c8be7540f585945d451e0e1679?format=webp&width=800",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with couple and red car background */}
      <section
        className="relative min-h-[500px] md:min-h-[550px] bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Ff337fed407f146e28195206db7b1a860?format=webp&width=1920')`,
          backgroundPosition: "bottom center",
        }}
      >
        {/* Desktop background image overlay */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F8c882181656e42d98121816c41c1bbb9?format=webp&width=1920')`,
            backgroundPosition: "center center",
          }}
        ></div>
        {/* SEARCH FORM - Turo Style */}
        <div className="absolute inset-x-0 top-4 md:top-8 px-2 md:px-4 lg:px-8">
          <div className="mx-auto max-w-4xl px-2 md:px-0">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <form onSubmit={handleSearch} className="p-2">
                {/* Desktop Form */}
                <div className="hidden md:flex items-stretch bg-white rounded-lg overflow-hidden min-h-[48px]">
                  {/* WHERE FIELD */}
                  <div className="flex-1 min-w-0 bg-white border-r border-gray-200">
                    <div className="px-3 py-0 h-full flex flex-col justify-center">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Where
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={searchData.location}
                        onChange={handleChange}
                        placeholder="City, airport, address or hotel"
                        className="w-full text-base text-gray-900 placeholder-gray-500 border-none outline-none bg-transparent"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                  </div>

                  {/* FROM FIELD */}
                  <div className="flex-shrink-0 w-48 bg-white border-r border-gray-200">
                    <div className="px-3 py-0 h-full flex flex-col justify-center">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        From
                      </label>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <select
                            name="pickupDate"
                            value={searchData.pickupDate}
                            onChange={handleChange}
                            className="appearance-none bg-transparent font-medium text-gray-900 pr-4 border-none outline-none cursor-pointer"
                            style={{ fontSize: "16px", paddingRight: "17px" }}
                          >
                            <option value="19/07/2025">19/07/2025</option>
                            <option value="20/07/2025">20/07/2025</option>
                            <option value="21/07/2025">21/07/2025</option>
                          </select>
                          <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <select
                            name="pickupTime"
                            value={searchData.pickupTime}
                            onChange={handleChange}
                            className="appearance-none bg-transparent text-gray-700 pr-4 border-none outline-none cursor-pointer"
                            style={{ fontSize: "16px", paddingRight: "17px" }}
                          >
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                          </select>
                          <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UNTIL FIELD */}
                  <div className="flex-shrink-0 w-48 bg-white border-r border-gray-200">
                    <div className="px-3 py-0 h-full flex flex-col justify-center">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Until
                      </label>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <select
                            name="dropoffDate"
                            value={searchData.dropoffDate}
                            onChange={handleChange}
                            className="appearance-none bg-transparent font-medium text-gray-900 pr-4 border-none outline-none cursor-pointer"
                            style={{ fontSize: "16px", paddingRight: "17px" }}
                          >
                            <option value="22/07/2025">22/07/2025</option>
                            <option value="23/07/2025">23/07/2025</option>
                            <option value="24/07/2025">24/07/2025</option>
                          </select>
                          <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <select
                            name="dropoffTime"
                            value={searchData.dropoffTime}
                            onChange={handleChange}
                            className="appearance-none bg-transparent text-gray-700 pr-4 border-none outline-none cursor-pointer"
                            style={{ fontSize: "16px", paddingRight: "17px" }}
                          >
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                          </select>
                          <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEARCH BUTTON */}
                  <div className="flex-shrink-0 bg-white">
                    <div className="px-3 py-0 h-full flex items-center justify-center">
                      <button
                        type="submit"
                        className="bg-primary-500 hover:bg-primary-600 text-white p-2.5 rounded-full transition duration-200 shadow-md"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Form */}
                <div
                  className="md:hidden space-y-3"
                  style={{ padding: "4px 16px 16px" }}
                >
                  {/* WHERE FIELD */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Where
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={searchData.location}
                      onChange={handleChange}
                      placeholder="City, airport, address or hotel"
                      className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      style={{
                        fontSize: "16px",
                        paddingTop: "2px",
                        paddingBottom: "2px",
                      }}
                    />
                  </div>

                  {/* FROM FIELD */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      From
                    </label>
                    <div className="flex space-x-3">
                      <div className="flex-1 relative">
                        <select
                          name="pickupDate"
                          value={searchData.pickupDate}
                          onChange={handleChange}
                          className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                          style={{
                            fontSize: "16px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                          }}
                        >
                          <option value="19/07/2025">21/07/2025</option>
                          <option value="20/07/2025">20/07/2025</option>
                          <option value="21/07/2025">21/07/2025</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      <div className="flex-1 relative">
                        <select
                          name="pickupTime"
                          value={searchData.pickupTime}
                          onChange={handleChange}
                          className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                          style={{
                            fontSize: "16px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                          }}
                        >
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* UNTIL FIELD */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Until
                    </label>
                    <div className="flex space-x-3">
                      <div className="flex-1 relative">
                        <select
                          name="dropoffDate"
                          value={searchData.dropoffDate}
                          onChange={handleChange}
                          className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                          style={{
                            fontSize: "16px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                          }}
                        >
                          <option value="22/07/2025">24/07/2025</option>
                          <option value="23/07/2025">23/07/2025</option>
                          <option value="24/07/2025">24/07/2025</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      <div className="flex-1 relative">
                        <select
                          name="dropoffTime"
                          value={searchData.dropoffTime}
                          onChange={handleChange}
                          className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                          style={{
                            fontSize: "16px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                          }}
                        >
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* SEARCH BUTTON */}
                  <button
                    type="submit"
                    className="w-full text-white rounded-lg font-medium transition duration-200"
                    style={{
                      backgroundColor: "#003552",
                      fontSize: "16px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    }}
                  >
                    Search for cars
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section - Exactly like Turo */}
      <section
        className="py-8 md:py-16 px-2 md:px-4"
        style={{ backgroundColor: "#F4F4F4" }}
      >
        <div className="max-w-7xl mx-auto px-2 md:px-0">
          {/* Title */}
          <div className="text-center mb-8 md:mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Skip the rental car counter
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Rent just about any car, just about anywhere
            </p>
          </div>

          {/* Car Grid and Text Layout - Side by Side like Turo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-24 items-start">
            {/* Left: Car Grid Image */}
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F2d052ed0699f46948523987b7bfb060d?format=webp&width=800"
                  alt="Car collection grid"
                  className="w-full h-auto object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </div>

            {/* Right: Text and Purple Button */}
            <div className="lg:col-span-1 lg:pr-[120px]">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Rent cars for any occasion
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Browse an incredible selection of cars, from the everyday to the
                extraordinary.
              </p>
              <button className="bg-accent-500 text-white px-6 py-3 rounded-lg hover:bg-accent-600 transition duration-200 font-medium">
                Explore cars
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by make - Turo Style */}
      <section className="py-8 md:py-16 px-2 md:px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-bold text-gray-900"
              style={{ fontSize: "21px" }}
            >
              Browse by make
            </h2>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition duration-200">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition duration-200">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
            {browseByMake.map((make, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 group cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-10">
                  <img
                    src={make.image}
                    alt={make.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-base text-gray-900 text-center">
                    {make.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by destination */}
      <section className="py-8 md:py-16 px-2 md:px-4 bg-white">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-bold text-gray-900"
              style={{ fontSize: "21px" }}
            >
              Browse by destination
            </h2>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
            {browseByDestination.map((destination, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-gray-200 flex items-center justify-center p-4 group-hover:border-blue-500 transition duration-200 bg-gray-50">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition duration-200">
                  {destination.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2025 car ownership index */}
      <section className="py-8 md:py-16 px-2 md:px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 md:px-0 lg:pl-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                2025 car ownership index
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                Explore Rentalosv.com's estimated costs of owning the top 10
                most popular cars around the country vs. renting on
                Rentalosv.com.
              </p>
              <button className="bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition duration-200 font-medium">
                Read more
              </button>
            </div>
            <div className="lg:pl-8">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F8a8b9468dde64c4f9a8d1c46698462e8?format=webp&width=800"
                alt="2025 Car Ownership Index"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fuel your daydreams */}
      <section className="py-10 md:py-20 px-2 md:px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Fuel your daydreams
          </h2>
          <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Travel stories, news, and inspiration to help you live a remarkable
            life.
          </p>
          <button className="bg-accent-500 text-white px-6 md:px-10 py-3 md:py-4 rounded-lg hover:bg-accent-600 transition duration-200 font-medium mb-8 md:mb-16">
            Explore the Rentalosv blog
          </button>

          <div className="relative max-w-6xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop"
              alt="Scottish Highlands"
              className="w-full h-48 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-gray-900 text-white p-4 md:p-8 rounded-lg max-w-xs md:max-w-sm shadow-xl">
              <span className="text-sm text-gray-300 font-medium tracking-wide uppercase">
                FEATURE BLOG
              </span>
              <h3 className="text-2xl font-bold mb-3 leading-tight">
                The ultimate Scottish Highlands road trip
              </h3>
              <button className="text-accent-400 hover:text-accent-300 font-medium underline">
                Read more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Sections with Two Hands Image */}
      <section className="py-10 md:py-20 px-2 md:px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Desktop: Image with overlays */}
          <div className="relative hidden md:block">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F83e8d9586c944cee859cf7ae4f72bf3c?format=webp&width=800"
              alt="Two hands exchanging keys"
              className="w-full h-auto rounded-2xl"
            />

            {/* Book a Car - Left Side Above Left Hand */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-95 p-8 rounded-lg max-w-sm text-center shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Book a Car >
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Down the street or across the country, find the perfect vehicle
                for your next adventure.
              </p>
            </div>

            {/* Become a Host - Right Side Below Right Hand */}
            <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 bg-white bg-opacity-95 p-8 rounded-lg max-w-sm text-center shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Become a Host >
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Accelerate your entrepreneurship and start building a small car
                sharing business on rentalosv.com.
              </p>
            </div>
          </div>

          {/* Mobile: Only boxes without background image */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {/* Book a Car */}
            <div className="bg-white p-6 rounded-lg text-center shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Book a Car >
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Down the street or across the country, find the perfect vehicle
                for your next adventure.
              </p>
            </div>

            {/* Become a Host */}
            <div className="bg-white p-6 rounded-lg text-center shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Become a Host >
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Accelerate your entrepreneurship and start building a small car
                sharing business on rentalosv.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
