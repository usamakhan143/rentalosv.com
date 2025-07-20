import React, { useState } from "react";
import {
  Car,
  DollarSign,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Camera,
  MessageCircle,
  Shield,
  Clock,
  Star,
  TrendingUp,
} from "lucide-react";

const HostTools = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const tools = [
    {
      id: 1,
      category: "listing",
      icon: Car,
      title: "Vehicle Listing Manager",
      description:
        "Create and manage your vehicle listings with professional photos, detailed descriptions, and availability calendars.",
      features: [
        "Photo optimization",
        "Instant booking",
        "Calendar sync",
        "Multi-platform listing",
      ],
      popular: true,
    },
    {
      id: 2,
      category: "pricing",
      icon: DollarSign,
      title: "Dynamic Pricing Tool",
      description:
        "Maximize your earnings with AI-powered pricing recommendations based on demand, location, and market trends.",
      features: [
        "Real-time pricing",
        "Demand forecasting",
        "Competitor analysis",
        "Revenue optimization",
      ],
      popular: false,
    },
    {
      id: 3,
      category: "management",
      icon: Calendar,
      title: "Booking Management",
      description:
        "Streamline your booking process with automated confirmations, guest screening, and trip coordination.",
      features: [
        "Auto-approval rules",
        "Guest verification",
        "Trip timeline",
        "Communication tools",
      ],
      popular: false,
    },
    {
      id: 4,
      category: "analytics",
      icon: BarChart3,
      title: "Performance Analytics",
      description:
        "Track your hosting performance with detailed insights on bookings, revenue, and guest satisfaction.",
      features: [
        "Revenue tracking",
        "Booking analytics",
        "Guest feedback",
        "Market insights",
      ],
      popular: false,
    },
    {
      id: 5,
      category: "listing",
      icon: Camera,
      title: "Photo Enhancement Suite",
      description:
        "Professional photo editing and optimization tools to make your vehicles stand out.",
      features: [
        "Auto-enhancement",
        "Background removal",
        "360° photos",
        "Virtual staging",
      ],
      popular: false,
    },
    {
      id: 6,
      category: "management",
      icon: MessageCircle,
      title: "Guest Communication Hub",
      description:
        "Centralized messaging platform with automated responses and translation services.",
      features: [
        "Auto-responses",
        "Multi-language",
        "SMS notifications",
        "Guest profiles",
      ],
      popular: false,
    },
    {
      id: 7,
      category: "analytics",
      icon: TrendingUp,
      title: "Revenue Optimizer",
      description:
        "Advanced analytics to identify opportunities for increasing your hosting income.",
      features: [
        "Income forecasting",
        "Pricing suggestions",
        "Market trends",
        "ROI analysis",
      ],
      popular: false,
    },
    {
      id: 8,
      category: "safety",
      icon: Shield,
      title: "Safety & Security Tools",
      description:
        "Comprehensive safety features including guest verification and vehicle tracking.",
      features: [
        "Background checks",
        "ID verification",
        "GPS tracking",
        "Insurance claims",
      ],
      popular: false,
    },
  ];

  const categories = [
    { id: "all", label: "All Tools", count: tools.length },
    {
      id: "listing",
      label: "Listing & Marketing",
      count: tools.filter((t) => t.category === "listing").length,
    },
    {
      id: "pricing",
      label: "Pricing & Revenue",
      count: tools.filter((t) => t.category === "pricing").length,
    },
    {
      id: "management",
      label: "Trip Management",
      count: tools.filter((t) => t.category === "management").length,
    },
    {
      id: "analytics",
      label: "Analytics & Insights",
      count: tools.filter((t) => t.category === "analytics").length,
    },
    {
      id: "safety",
      label: "Safety & Security",
      count: tools.filter((t) => t.category === "safety").length,
    },
  ];

  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  const benefits = [
    {
      icon: DollarSign,
      title: "Increase Earnings",
      description: "Hosts using our tools earn 40% more on average",
      stat: "40%",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Automated tools save hosts 10+ hours per week",
      stat: "10+ hrs",
    },
    {
      icon: Star,
      title: "Better Ratings",
      description: "Improved guest experience leads to higher ratings",
      stat: "4.8★",
    },
    {
      icon: Users,
      title: "More Bookings",
      description: "Professional listings get 3x more booking requests",
      stat: "3x",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20 px-4">
        <div className="mx-auto px-0 lg:px-[100px]">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#FF7500" }}
              >
                <Settings className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: "#003552" }}
            >
              Host Tools
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Professional tools and resources to help you succeed as a
              Rentalosv host. Maximize your earnings, streamline operations, and
              provide exceptional guest experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                Get Started
              </button>
              <button
                className="px-8 py-4 rounded-lg border-2 font-semibold text-lg transition-all hover:bg-gray-50"
                style={{ borderColor: "#003552", color: "#003552" }}
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="mx-auto px-0 lg:px-[100px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{ color: "#003552" }}
                  >
                    {benefit.stat}
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "#003552" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-t border-gray-200">
        <div className="mx-auto px-0 lg:px-[100px]">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center ${
                  activeCategory === category.id
                    ? "text-white shadow-lg"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor:
                    activeCategory === category.id ? "#FF7500" : undefined,
                }}
              >
                {category.label}
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                    activeCategory === category.id
                      ? "bg-white bg-opacity-20"
                      : "bg-gray-200"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4">
        <div className="mx-auto px-0 lg:px-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className={`rounded-2xl p-8 border-2 hover:shadow-lg transition-all ${tool.popular ? "border-orange-500 shadow-md" : "border-gray-200"} relative`}
                >
                  {tool.popular && (
                    <div className="absolute -top-3 -right-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: "#FF7500" }}
                      >
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-center mb-6">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{ backgroundColor: "#FF7500" }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: "#003552" }}
                    >
                      {tool.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <div
                          className="w-2 h-2 rounded-full mr-3"
                          style={{ backgroundColor: "#FF7500" }}
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full py-3 rounded-lg font-semibold transition-all hover:shadow-md"
                    style={{
                      backgroundColor: tool.popular ? "#FF7500" : "transparent",
                      border: `2px solid ${tool.popular ? "#FF7500" : "#003552"}`,
                      color: tool.popular ? "white" : "#003552",
                    }}
                  >
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HostTools;
