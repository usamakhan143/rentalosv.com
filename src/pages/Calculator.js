import React, { useState } from "react";
import {
  Calculator as CalculatorIcon,
  Car,
  DollarSign,
  Calendar,
  MapPin,
  TrendingUp,
  Star,
  Users,
  Camera,
} from "lucide-react";

const Calculator = () => {
  const [formData, setFormData] = useState({
    carMake: "",
    carModel: "",
    carYear: "",
    location: "",
    daysPerMonth: 15,
    carValue: "",
    condition: "excellent",
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const carMakes = [
    "Audi",
    "BMW",
    "Ford",
    "Honda",
    "Hyundai",
    "Kia",
    "Mercedes-Benz",
    "Nissan",
    "Peugeot",
    "Renault",
    "Toyota",
    "Vauxhall",
    "Volkswagen",
    "Volvo",
  ];

  const locations = [
    "London",
    "Manchester",
    "Birmingham",
    "Liverpool",
    "Leeds",
    "Glasgow",
    "Edinburgh",
    "Bristol",
    "Newcastle",
    "Cardiff",
    "Belfast",
    "Brighton",
    "Oxford",
    "Cambridge",
    "Bath",
    "York",
  ];

  const calculateEarnings = () => {
    // Base daily rates by location (simplified calculation)
    const locationRates = {
      London: 45,
      Manchester: 35,
      Birmingham: 32,
      Liverpool: 30,
      Leeds: 28,
      Glasgow: 30,
      Edinburgh: 35,
      Bristol: 33,
      Newcastle: 28,
      Cardiff: 30,
      Belfast: 25,
      Brighton: 38,
      Oxford: 40,
      Cambridge: 38,
      Bath: 35,
      York: 30,
    };

    // Car value multipliers
    const valueMultiplier = {
      "under-10k": 0.8,
      "10k-20k": 1.0,
      "20k-30k": 1.2,
      "30k-50k": 1.4,
      "over-50k": 1.6,
    };

    // Condition multipliers
    const conditionMultiplier = {
      excellent: 1.1,
      good: 1.0,
      fair: 0.9,
    };

    const baseRate = locationRates[formData.location] || 30;
    const carValueKey = formData.carValue;
    const valueMulti = valueMultiplier[carValueKey] || 1.0;
    const conditionMulti = conditionMultiplier[formData.condition] || 1.0;

    const dailyRate = Math.round(baseRate * valueMulti * conditionMulti);
    const monthlyGross = dailyRate * formData.daysPerMonth;
    const rentalosevFee = Math.round(monthlyGross * 0.25); // 25% platform fee
    const monthlyNet = monthlyGross - rentalosevFee;
    const yearlyNet = monthlyNet * 12;

    setResults({
      dailyRate,
      monthlyGross,
      rentalosevFee,
      monthlyNet,
      yearlyNet,
      utilizationRate: Math.round((formData.daysPerMonth / 30) * 100),
    });
    setShowResults(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEarnings();
  };

  const marketInsights = [
    {
      icon: TrendingUp,
      title: "High Demand Locations",
      description:
        "London, Manchester, and Birmingham show the highest earning potential",
      stat: "£35-45/day",
    },
    {
      icon: Car,
      title: "Popular Vehicle Types",
      description: "Compact and mid-size cars have the best booking rates",
      stat: "85% occupancy",
    },
    {
      icon: Calendar,
      title: "Peak Seasons",
      description: "Summer months and holidays see 40% higher demand",
      stat: "+40% earnings",
    },
    {
      icon: Star,
      title: "Host Rating Impact",
      description: "5-star hosts earn 25% more than average",
      stat: "+25% premium",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20 px-4">
        <div className="mx-auto px-0 lg:px-[170px]">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#FF7500" }}
              >
                <CalculatorIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: "#003552" }}
            >
              Earnings Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Discover how much you could earn by sharing your car on Rentalosv.
              Get personalized estimates based on your vehicle, location, and
              availability.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[170px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <h2
                className="text-3xl font-bold mb-8"
                style={{ color: "#003552" }}
              >
                Calculate Your Earnings
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Car Make */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Car Make
                  </label>
                  <select
                    value={formData.carMake}
                    onChange={(e) =>
                      handleInputChange("carMake", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select make</option>
                    {carMakes.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Car Model */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Car Model
                  </label>
                  <input
                    type="text"
                    value={formData.carModel}
                    onChange={(e) =>
                      handleInputChange("carModel", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g. Golf, Focus, 3 Series"
                    required
                  />
                </div>

                {/* Car Year */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year
                  </label>
                  <select
                    value={formData.carYear}
                    onChange={(e) =>
                      handleInputChange("carYear", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 15 }, (_, i) => 2024 - i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Car Value */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Car Value
                  </label>
                  <select
                    value={formData.carValue}
                    onChange={(e) =>
                      handleInputChange("carValue", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select value range</option>
                    <option value="under-10k">Under £10,000</option>
                    <option value="10k-20k">£10,000 - £20,000</option>
                    <option value="20k-30k">£20,000 - £30,000</option>
                    <option value="30k-50k">£30,000 - £50,000</option>
                    <option value="over-50k">Over £50,000</option>
                  </select>
                </div>

                {/* Car Condition */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Car Condition
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) =>
                      handleInputChange("condition", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>

                {/* Days per Month */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Days per Month: {formData.daysPerMonth}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={formData.daysPerMonth}
                    onChange={(e) =>
                      handleInputChange(
                        "daysPerMonth",
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #FF7500 0%, #FF7500 ${(formData.daysPerMonth / 30) * 100}%, #e5e5e5 ${(formData.daysPerMonth / 30) * 100}%, #e5e5e5 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1 day</span>
                    <span>30 days</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#FF7500" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#e66a00")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#FF7500")
                  }
                >
                  Calculate My Earnings
                </button>
              </form>
            </div>

            {/* Results Panel */}
            <div className="bg-gray-50 rounded-2xl p-8">
              {showResults && results ? (
                <div>
                  <h3
                    className="text-3xl font-bold mb-8"
                    style={{ color: "#003552" }}
                  >
                    Your Earning Potential
                  </h3>

                  <div className="space-y-6">
                    {/* Main Results */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="text-center">
                        <div
                          className="text-5xl font-bold mb-2"
                          style={{ color: "#FF7500" }}
                        >
                          £{results.monthlyNet.toLocaleString()}
                        </div>
                        <p className="text-gray-600">
                          Estimated monthly earnings
                        </p>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4
                        className="text-lg font-semibold mb-4"
                        style={{ color: "#003552" }}
                      >
                        Earnings Breakdown
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Daily rate</span>
                          <span className="font-semibold">
                            £{results.dailyRate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Monthly gross ({formData.daysPerMonth} days)
                          </span>
                          <span className="font-semibold">
                            £{results.monthlyGross.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Rentalosv fee (25%)
                          </span>
                          <span className="font-semibold text-red-600">
                            -£{results.rentalosevFee.toLocaleString()}
                          </span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <span className="font-semibold">
                            Monthly net earnings
                          </span>
                          <span
                            className="font-bold"
                            style={{ color: "#FF7500" }}
                          >
                            £{results.monthlyNet.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">
                            Annual potential
                          </span>
                          <span
                            className="font-bold"
                            style={{ color: "#FF7500" }}
                          >
                            £{results.yearlyNet.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Utilization */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4
                        className="text-lg font-semibold mb-4"
                        style={{ color: "#003552" }}
                      >
                        Utilization Rate
                      </h4>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 mr-4">
                          <div
                            className="h-3 rounded-full"
                            style={{
                              backgroundColor: "#FF7500",
                              width: `${results.utilizationRate}%`,
                            }}
                          ></div>
                        </div>
                        <span
                          className="font-bold"
                          style={{ color: "#FF7500" }}
                        >
                          {results.utilizationRate}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        You're planning to share your car{" "}
                        {formData.daysPerMonth} days per month
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                      <button
                        className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg"
                        style={{ backgroundColor: "#FF7500" }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#e66a00")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#FF7500")
                        }
                      >
                        Start Hosting Today
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <CalculatorIcon className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: "#003552" }}
                  >
                    Ready to Calculate?
                  </h3>
                  <p className="text-gray-600">
                    Fill out the form to see your personalized earning
                    potential.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[170px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Market Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Data-driven insights to help you maximize your hosting potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm text-center min-h-[280px] flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#FF7500" }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div
                      className="text-2xl font-bold mb-3"
                      style={{ color: "#003552" }}
                    >
                      {insight.stat}
                    </div>
                    <h3
                      className="text-lg font-semibold mb-3 leading-tight"
                      style={{ color: "#003552" }}
                    >
                      {insight.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[170px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Maximize Your Earnings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pro tips from successful hosts to boost your income.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Professional Photos",
                description:
                  "High-quality photos can increase bookings by up to 40%. Show your car's best angles and keep it clean.",
              },
              {
                icon: DollarSign,
                title: "Dynamic Pricing",
                description:
                  "Adjust your rates based on demand, events, and seasons. Higher rates during peak times maximize revenue.",
              },
              {
                icon: Users,
                title: "Guest Communication",
                description:
                  "Quick responses and clear communication lead to better reviews and more repeat bookings.",
              },
              {
                icon: Star,
                title: "Maintain High Ratings",
                description:
                  "Keep your car clean, well-maintained, and fully fueled. 5-star hosts earn 25% more than average.",
              },
              {
                icon: MapPin,
                title: "Strategic Location",
                description:
                  "List your car in high-demand areas like airports, city centers, and transport hubs for maximum visibility.",
              },
              {
                icon: Calendar,
                title: "Flexible Availability",
                description:
                  "Offer instant booking and maintain high availability to capture spontaneous bookings and last-minute trips.",
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div
                  className="w-12 h-12 mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#FF7500" }}
                >
                  <tip.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#003552" }}
                >
                  {tip.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ backgroundColor: "#003552" }}>
        <div className="mx-auto px-0 lg:px-[170px]">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Earning with Your Car Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of hosts who are already earning extra income by
              sharing their cars on Rentalosv.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-12 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg"
                style={{ backgroundColor: "#FF7500" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e66a00")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#FF7500")
                }
              >
                List Your Car
              </button>
              <button className="px-12 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-white hover:text-gray-900 border-2 border-white text-white">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
