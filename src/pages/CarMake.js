import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ChevronRight, Search, ChevronDown } from "lucide-react";
import { properCapitalization } from "../utils/capitalization";

const CarMake = () => {
  const { make } = useParams();
  const [cars, setCars] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    pickupDate: "19/07/2025",
    dropoffDate: "22/07/2025",
    pickupTime: "10:00",
    dropoffTime: "10:00",
  });

  // Sample car data - memoized to prevent re-creation on every render
  const allCars = useMemo(
    () => [
      {
        id: 1,
        make: "Audi",
        model: "A3",
        year: 2017,
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600",
        price: 35,
        location: "Bow, London",
        rating: 4.91,
        trips: 338,
        features: ["All-Star Host"],
      },
      {
        id: 2,
        make: "Audi",
        model: "A4",
        year: 2019,
        image:
          "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600",
        price: 59,
        location: "Mile End, London",
        rating: 4.9,
        trips: 89,
        features: ["All-Star Host"],
      },
      {
        id: 3,
        make: "Audi",
        model: "A3",
        year: 2019,
        image:
          "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600",
        price: 52,
        location: "Central London",
        rating: 4.95,
        trips: 125,
        features: [],
      },
      {
        id: 4,
        make: "BMW",
        model: "3 Series",
        year: 2020,
        image:
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600",
        price: 65,
        location: "Westminster, London",
        rating: 4.8,
        trips: 203,
        features: ["All-Star Host"],
      },
      {
        id: 5,
        make: "Tesla",
        model: "Model 3",
        year: 2021,
        image:
          "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600",
        price: 85,
        location: "Canary Wharf, London",
        rating: 4.9,
        trips: 156,
        features: [],
      },
    ],
    [],
  );

  const currentMake = properCapitalization(make) || "Audi";

  useEffect(() => {
    const brandCars = allCars.filter(
      (car) => car.make.toLowerCase() === make?.toLowerCase(),
    );
    setCars(brandCars);
  }, [make, allCars]);

  const topModels = [
    {
      name: `${currentMake} Q7`,
      description: `For trips of epic scale: Introducing the ${currentMake} Q7. With seating for up to seven, the Q7 offers one of the most ${currentMake}s from-listing SUV and a long range that's do not eat spare and spacious inside...`,
    },
    {
      name: `${currentMake} TT`,
      description: `Since 1998, four distinct sport ${currentMake} TT generations have graced roads. Experience classic motoring heritage from its signature doors have to the bold...`,
    },
    {
      name: `${currentMake} A3`,
      description: `One of the most popular models among from passengers on tour demand. From relaxed driving from's unmistakable mood being from's to offering for some passengers...`,
    },
  ];

  const reviews = [
    {
      rating: 5,
      text: "Was a very honest review overall. Host. Hope to book again in the future competensi.",
      author: "Zachary P.",
      date: "3 days ago",
    },
    {
      rating: 5,
      text: "Excellent host and great experience with the car. Highly recommended!",
      author: "Sarah M.",
      date: "1 week ago",
    },
    {
      rating: 5,
      text: "Car was in excellent condition, Host was very responsive. 100% recommend!",
      author: "Mike R.",
      date: "2 weeks ago",
    },
  ];

  const destinations = [
    { name: "London", icon: "🏛️" },
    { name: "Manchester", icon: "��" },
    { name: "Edinburgh", icon: "🏰" },
    { name: "Bristol", icon: "🌉" },
    { name: "Las Vegas", icon: "🎰" },
    { name: "Los Angeles", icon: "🌴" },
  ];

  const faqs = [
    "What do I need to book a car on Turo?",
    "Do I need to hold insurance?",
    "What protection rates can I purchase on Turo?",
    "How are the times and safety policies on Turo?",
    "What protection rates can I purchase on Turo?",
    "Is there an unlimited miles model on Turo?",
    "Are there discounts available for renting trips?",
    "How can I find available times during the day on Turo?",
    "What are the cleaning and safety policies on Turo?",
    "How do I cancel a reservation?",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Search */}
      <section className="py-8 px-4 border-b border-gray-200">
        <div className="mx-auto px-0 lg:px-[120px]">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-700">
              Discover Rentalosv
            </Link>
            <span className="mx-2">›</span>
            <span>the world's largest car sharing marketplace</span>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl lg:text-5xl font-bold mb-8"
              style={{ color: "#003552" }}
            >
              Rent a {currentMake}
            </h1>

            {/* Search Form */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-2">
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
                          value={searchFilters.location}
                          onChange={(e) =>
                            setSearchFilters({
                              ...searchFilters,
                              location: e.target.value,
                            })
                          }
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
                              value={searchFilters.pickupDate}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  pickupDate: e.target.value,
                                })
                              }
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
                              value={searchFilters.pickupTime}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  pickupTime: e.target.value,
                                })
                              }
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
                              value={searchFilters.dropoffDate}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  dropoffDate: e.target.value,
                                })
                              }
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
                              value={searchFilters.dropoffTime}
                              onChange={(e) =>
                                setSearchFilters({
                                  ...searchFilters,
                                  dropoffTime: e.target.value,
                                })
                              }
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
                        value={searchFilters.location}
                        onChange={(e) =>
                          setSearchFilters({
                            ...searchFilters,
                            location: e.target.value,
                          })
                        }
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
                            value={searchFilters.pickupDate}
                            onChange={(e) =>
                              setSearchFilters({
                                ...searchFilters,
                                pickupDate: e.target.value,
                              })
                            }
                            className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                            style={{
                              fontSize: "16px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                          >
                            <option value="19/07/2025">19/07/2025</option>
                            <option value="20/07/2025">20/07/2025</option>
                            <option value="21/07/2025">21/07/2025</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="flex-1 relative">
                          <select
                            name="pickupTime"
                            value={searchFilters.pickupTime}
                            onChange={(e) =>
                              setSearchFilters({
                                ...searchFilters,
                                pickupTime: e.target.value,
                              })
                            }
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
                            value={searchFilters.dropoffDate}
                            onChange={(e) =>
                              setSearchFilters({
                                ...searchFilters,
                                dropoffDate: e.target.value,
                              })
                            }
                            className="w-full px-4 border border-gray-300 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                            style={{
                              fontSize: "16px",
                              paddingTop: "2px",
                              paddingBottom: "2px",
                            }}
                          >
                            <option value="22/07/2025">22/07/2025</option>
                            <option value="23/07/2025">23/07/2025</option>
                            <option value="24/07/2025">24/07/2025</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="flex-1 relative">
                          <select
                            name="dropoffTime"
                            value={searchFilters.dropoffTime}
                            onChange={(e) =>
                              setSearchFilters({
                                ...searchFilters,
                                dropoffTime: e.target.value,
                              })
                            }
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Cars Section */}
      <section className="py-12 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: "#003552" }}>
              Rental {currentMake}
            </h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Link
                key={car.id}
                to={`/cars/${car.id}`}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover"
                  />
                  {car.features.includes("All-Star Host") && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-white px-2 py-1 rounded text-xs font-semibold text-purple-600">
                        ⭐ All-Star Host
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3
                    className="font-semibold text-lg mb-1"
                    style={{ color: "#003552" }}
                  >
                    {car.make} {car.model} {car.year}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    <span className="font-semibold">{car.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{car.trips} trips</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{car.location}</p>

                  <div className="flex justify-between items-center">
                    <div>
                      <span
                        className="text-lg font-bold"
                        style={{ color: "#003552" }}
                      >
                        £{car.price}
                      </span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        £{car.price * 7} total
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              className="px-8 py-3 text-white font-semibold rounded-lg"
              style={{ backgroundColor: "#003552" }}
            >
              View all {currentMake}
            </button>
          </div>
        </div>
      </section>

      {/* Drive Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: "#003552" }}
              >
                Drive an {currentMake}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Sleek design and performance built with German luxury precision
                and cutting-edge engineering. Bold vehicle architecture uniquely
                tuned {currentMake} in a class by its own. Discover the{" "}
                {currentMake} collection and embrace the thrill of being behind
                the wheel of one of these impressive machines.
              </p>
              <p className="text-gray-600 leading-relaxed">
                And with a portfolio of cars from the most special to{" "}
                {currentMake} sedan line, there is a service to make your
                vehicle selection that meets the demanding standards of{" "}
                {currentMake}istics engineered to perfection.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F0e650a9ecae440bc99b86892484972a3?format=webp&width=800"
                alt={`${currentMake} vehicle`}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three Column Features */}
      <section className="py-16 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#003552" }}
              >
                More car looks
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Just had instant and highly for {currentMake} experience. Our{" "}
                {currentMake} portfolio offers choice car in the foreground.
                Book all with for, and best and few plenty car including
                additional rentals.
              </p>
            </div>
            <div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#003552" }}
              >
                Quality appeal
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Book an impressive-looking {currentMake} rental care in the UK.
                There will be time to review experience and appeal of car. It's
                important and test for being. We'll cars enable vehicles choose
                in the most of the ${currentMake}.
              </p>
            </div>
            <div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#003552" }}
              >
                Smart and savy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Just being diverse topics bring for cars without expensive.
                Simplicity car just be with being: based from high top VfB —
                along comfortable software ${currentMake} e automotive
                technology from the and top for the key {currentMake}.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              className="px-8 py-3 text-white font-semibold rounded-lg"
              style={{ backgroundColor: "#003552" }}
            >
              Book a {currentMake} today
            </button>
          </div>
        </div>
      </section>

      {/* Hire Section with City Background */}
      <section
        className="py-20 px-4 text-white relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="mx-auto px-0 lg:px-[120px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Hire an {currentMake} on Rentalosv
              </h2>
              <p className="text-lg leading-relaxed">
                From city cars to rides for work, and everything in between.
                Find the perfect ${currentMake} for fit for form-cars and size
                from the luxurious 4K and powered sedan a single of trips and
                entertainment features.
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </section>

      {/* Top Models */}
      <section className="py-16 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "#003552" }}
          >
            Top {currentMake} models
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topModels.map((model, index) => (
              <div key={index} className="text-center">
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#003552" }}
                >
                  {model.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {model.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              className="px-8 py-3 text-white font-semibold rounded-lg"
              style={{ backgroundColor: "#003552" }}
            >
              Book a {currentMake}
            </button>
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: "#003552" }}>
              Recent reviews
            </h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {review.date}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">"{review.text}"</p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#003552" }}
                >
                  {review.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Destination */}
      <section className="py-16 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: "#003552" }}>
              Browse {currentMake} by destination
            </h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((dest, index) => (
              <Link
                key={index}
                to={`/${make}/location/${dest.name.toLowerCase()}`}
                className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{dest.icon}</div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#003552" }}
                >
                  {dest.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "#003552" }}
          >
            Frequently asked questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#003552" }}
                  >
                    {faq}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarMake;
