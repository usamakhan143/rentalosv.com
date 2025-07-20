import React, { useState } from "react";
import {
  Search,
  Calendar,
  Key,
  Star,
  Shield,
  Clock,
  CreditCard,
  CheckCircle,
  MessageCircle,
  Users,
  Car,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("guests");
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const guestSteps = [
    {
      icon: Search,
      title: "Find the perfect car",
      description:
        "Choose from hundreds of cars in your area. From everyday cars to luxury vehicles, find exactly what you need.",
    },
    {
      icon: Calendar,
      title: "Book instantly",
      description:
        "Book instantly or request approval from the host. Most trips are approved within 8 hours.",
    },
    {
      icon: Key,
      title: "Grab the keys",
      description:
        "Meet your host or find the car using our app. Unlock with your phone and hit the road.",
    },
    {
      icon: Star,
      title: "Drive and enjoy",
      description:
        "Drive with peace of mind knowing you're covered by insurance. Return the car and rate your experience.",
    },
  ];

  const hostSteps = [
    {
      icon: Car,
      title: "List your car",
      description:
        "Take photos, add details, and set your availability. Listing is always free on Rentalosv.",
    },
    {
      icon: Users,
      title: "Meet your guests",
      description:
        "Review guest profiles and approve bookings. You decide who drives your car.",
    },
    {
      icon: CreditCard,
      title: "Get paid",
      description:
        "Earn money each time your car is booked. Get paid 3 hours after each trip starts.",
    },
    {
      icon: Shield,
      title: "Stay protected",
      description:
        "Every trip includes insurance coverage and 24/7 roadside assistance for peace of mind.",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Insurance included",
      description:
        "Every booking includes comprehensive insurance coverage up to £750,000 third-party liability.",
      color: "#FF7500",
    },
    {
      icon: Clock,
      title: "24/7 support",
      description:
        "Our customer support team is available around the clock to help with any questions or issues.",
      color: "#003552",
    },
    {
      icon: CheckCircle,
      title: "Verified users",
      description:
        "All users are verified with government ID and driving record checks for safety and security.",
      color: "#FF7500",
    },
    {
      icon: Star,
      title: "Trusted community",
      description:
        "Join millions of users who trust Rentalosv for safe, convenient car sharing experiences.",
      color: "#003552",
    },
  ];

  const faqs = [
    {
      question: "How do I unlock the car?",
      answer:
        "You can unlock cars using the Rentalosv app on your phone. For some cars, you'll meet the host in person to get the keys.",
    },
    {
      question: "What happens if I have an accident?",
      answer:
        "All trips include insurance coverage. If you have an accident, contact Rentalosv support immediately and we'll guide you through the process.",
    },
    {
      question: "Can I extend my trip?",
      answer:
        "Yes, you can extend your trip through the app if the car is available. Extensions are subject to host approval and availability.",
    },
    {
      question: "How do I cancel a booking?",
      answer:
        "You can cancel a booking through the app or website. Cancellation policies vary depending on when you cancel relative to your trip start time.",
    },
    {
      question: "What if the car breaks down?",
      answer:
        "All trips include 24/7 roadside assistance. If the car breaks down, call the emergency number in the app and we'll send help.",
    },
    {
      question: "How do I become a host?",
      answer:
        "To become a host, sign up on our website, add your car details and photos, and complete the verification process. Listing is free!",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-white py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Fbeb8cf854fab40cb8345566ac5393040?format=webp&width=800"
                alt="Woman using Rentalosv app"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>

            {/* Right side - Content */}
            <div>
              <h1
                className="text-5xl lg:text-6xl font-bold mb-6"
                style={{ color: "#003552" }}
              >
                How Rentalosv works
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Whether you're looking to book a car or share your own,
                Rentalosv makes car sharing simple, safe, and convenient for
                everyone.
              </p>

              {/* Tab Navigation */}
              <div className="mb-8">
                <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                  <button
                    className={`px-8 py-3 rounded-md font-semibold transition-all ${
                      activeTab === "guests"
                        ? "text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    style={{
                      backgroundColor:
                        activeTab === "guests" ? "#FF7500" : "transparent",
                    }}
                    onClick={() => setActiveTab("guests")}
                  >
                    For guests
                  </button>
                  <button
                    className={`px-8 py-3 rounded-md font-semibold transition-all ${
                      activeTab === "hosts"
                        ? "text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    style={{
                      backgroundColor:
                        activeTab === "hosts" ? "#FF7500" : "transparent",
                    }}
                    onClick={() => setActiveTab("hosts")}
                  >
                    For hosts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(activeTab === "guests" ? guestSteps : hostSteps).map(
              (step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div
                        className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: "#FF7500" }}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: "#003552" }}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ color: "#003552" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              },
            )}
          </div>

          <div className="text-center mt-12">
            <button
              className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: "#FF7500" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e66a00")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF7500")}
            >
              {activeTab === "guests" ? "Find a car" : "Become a host"}
            </button>
          </div>
        </div>
      </section>

      {/* Background Image Section */}
      <section
        className="w-full h-[348px] lg:h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Fa1aad103009f4005a0dfe867919ef116?format=webp&width=800')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-8">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Join the car sharing revolution
            </h2>
            <p className="text-xl mb-8">
              Over 175,000 hosts and 3.2 million guests trust Rentalosv for
              safe, convenient car sharing experiences worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg border-2 border-white hover:bg-white hover:text-gray-900">
                Book a car
              </button>
              <button
                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg"
                style={{ backgroundColor: "#FF7500", color: "white" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e66a00")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#FF7500")
                }
              >
                List your car
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Why choose Rentalosv?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've built the world's largest car sharing marketplace with
              safety, convenience, and trust at the core of everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div
                    className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: benefit.color }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-4 text-center"
                    style={{ color: "#003552" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px] text-center">
          <h2 className="text-4xl font-bold mb-16" style={{ color: "#003552" }}>
            Trusted by millions worldwide
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3
                className="text-5xl font-bold mb-2"
                style={{ color: "#FF7500" }}
              >
                3.2M+
              </h3>
              <p className="text-gray-600">Active guests</p>
            </div>
            <div className="text-center">
              <h3
                className="text-5xl font-bold mb-2"
                style={{ color: "#FF7500" }}
              >
                175K+
              </h3>
              <p className="text-gray-600">Hosts worldwide</p>
            </div>
            <div className="text-center">
              <h3
                className="text-5xl font-bold mb-2"
                style={{ color: "#FF7500" }}
              >
                12K+
              </h3>
              <p className="text-gray-600">Cities & airports</p>
            </div>
            <div className="text-center">
              <h3
                className="text-5xl font-bold mb-2"
                style={{ color: "#FF7500" }}
              >
                350K+
              </h3>
              <p className="text-gray-600">Vehicles available</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works for both */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Simple. Safe. Convenient.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to make car sharing as easy as possible
              for both guests and hosts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* For Guests */}
            <div>
              <h3
                className="text-2xl font-bold mb-8 text-center"
                style={{ color: "#003552" }}
              >
                For guests
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold mb-2"
                      style={{ color: "#003552" }}
                    >
                      Browse cars near you
                    </h4>
                    <p className="text-gray-600">
                      Find the perfect car for your trip. Filter by location,
                      price, car type, and features.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold mb-2"
                      style={{ color: "#003552" }}
                    >
                      Connect with hosts
                    </h4>
                    <p className="text-gray-600">
                      Message hosts, ask questions, and get to know the car
                      before you book.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold mb-2"
                      style={{ color: "#003552" }}
                    >
                      Get the keys and go
                    </h4>
                    <p className="text-gray-600">
                      Meet your host or use contactless check-in. Unlock with
                      the app and hit the road.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Hosts */}
            <div>
              <h3
                className="text-2xl font-bold mb-8 text-center"
                style={{ color: "#003552" }}
              >
                For hosts
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: "#003552" }}
                  >
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold mb-2"
                      style={{ color: "#003552" }}
                    >
                      List your car for free
                    </h4>
                    <p className="text-gray-600">
                      Create a listing with photos and details. Set your own
                      prices and availability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: "#003552" }}
                  >
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold mb-2"
                      style={{ color: "#003552" }}
                    >
                      Choose your guests
                    </h4>
                    <p className="text-gray-600">
                      Review guest profiles and driving records. Accept or
                      decline booking requests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: "#003552" }}
                  >
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold mb-2"
                      style={{ color: "#003552" }}
                    >
                      Earn money automatically
                    </h4>
                    <p className="text-gray-600">
                      Get paid directly to your bank account 3 hours after each
                      trip starts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-4xl font-bold text-center mb-16"
              style={{ color: "#003552" }}
            >
              Frequently asked questions
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span
                      className="text-lg font-semibold"
                      style={{ color: "#003552" }}
                    >
                      {faq.question}
                    </span>
                    {openFAQ === index ? (
                      <ChevronUp
                        className="w-5 h-5"
                        style={{ color: "#FF7500" }}
                      />
                    ) : (
                      <ChevronDown
                        className="w-5 h-5"
                        style={{ color: "#FF7500" }}
                      />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="py-20 px-4 text-center"
        style={{ backgroundColor: "#003552" }}
      >
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join millions of people who use Rentalosv for convenient,
              affordable car sharing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-12 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg border-2 border-white text-white hover:bg-white hover:text-gray-900">
                Find a car
              </button>
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
                Become a host
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
