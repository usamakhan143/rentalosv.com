import React, { useState } from "react";
import { Shield, AlertTriangle, Phone, Car } from "lucide-react";
import { useLoginModal } from "../contexts/LoginModalContext";

const InsuranceProtection = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { openLoginModal } = useLoginModal();

  const coverageDetails = [
    {
      icon: Shield,
      title: "Third-Party Liability",
      description:
        "Up to £750,000 coverage for damage to other people's property and injury to third parties.",
      included: "All plans",
    },
    {
      icon: Car,
      title: "Physical Damage",
      description:
        "Protection against damage to the rental vehicle from collisions, vandalism, and weather.",
      included: "All plans",
    },
    {
      icon: AlertTriangle,
      title: "Theft Protection",
      description:
        "Coverage in case the vehicle is stolen during your rental period.",
      included: "Standard & Premium",
    },
    {
      icon: Phone,
      title: "24/7 Roadside Assistance",
      description:
        "Emergency roadside help including towing, jump-starts, and flat tire assistance.",
      included: "All plans",
    },
  ];

  const claimsProcess = [
    {
      step: 1,
      title: "Report the incident",
      description:
        "Contact us immediately through the app or emergency hotline to report any incident.",
    },
    {
      step: 2,
      title: "Document everything",
      description:
        "Take photos of any damage, get contact information, and file a police report if necessary.",
    },
    {
      step: 3,
      title: "Work with our team",
      description:
        "Our claims specialists will guide you through the process and handle communications.",
    },
    {
      step: 4,
      title: "Resolution",
      description:
        "We work quickly to resolve claims and get you back on the road as soon as possible.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20 px-4">
        <div className="mx-auto px-0 lg:px-[150px]">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#FF7500" }}
              >
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: "#003552" }}
            >
              Insurance & Protection
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Every trip on Rentalosv comes with comprehensive insurance
              coverage and protection. Drive with confidence knowing you're
              covered every mile of the way.
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
                Learn More
              </button>
              <button
                className="px-8 py-4 rounded-lg border-2 font-semibold text-lg transition-all hover:bg-gray-50"
                style={{ borderColor: "#003552", color: "#003552" }}
              >
                File a Claim
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-4 border-b border-gray-200">
        <div className="mx-auto px-0 lg:px-[150px]">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: "overview", label: "Coverage Overview" },
              { id: "claims", label: "Claims Process" },
              { id: "faq", label: "FAQ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? "text-white shadow-lg"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? "#FF7500" : undefined,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4">
        <div className="mx-auto px-0 lg:px-[150px]">
          {/* Coverage Overview */}
          {activeTab === "overview" && (
            <div>
              <div className="text-center mb-16">
                <h2
                  className="text-4xl font-bold mb-4"
                  style={{ color: "#003552" }}
                >
                  What's Covered
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our comprehensive coverage protects both hosts and guests with
                  industry-leading insurance and support services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {coverageDetails.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="bg-gray-50 rounded-2xl p-8">
                      <div className="flex items-start">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                          style={{ backgroundColor: "#FF7500" }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: "#003552" }}
                          >
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {item.description}
                          </p>
                          <span
                            className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                            style={{ backgroundColor: "#FF7500" }}
                          >
                            {item.included}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trust Indicators */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: "#003552" }}
                  >
                    Trusted Protection
                  </h3>
                  <p className="text-gray-600">
                    Our insurance is provided by leading insurers and backed by
                    years of experience in the car sharing industry.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{ color: "#FF7500" }}
                    >
                      £750K
                    </div>
                    <p className="text-gray-600">
                      Third-party liability coverage
                    </p>
                  </div>
                  <div>
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{ color: "#FF7500" }}
                    >
                      24/7
                    </div>
                    <p className="text-gray-600">
                      Roadside assistance available
                    </p>
                  </div>
                  <div>
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{ color: "#FF7500" }}
                    >
                      95%
                    </div>
                    <p className="text-gray-600">
                      Claims resolved within 48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Claims Process */}
          {activeTab === "claims" && (
            <div>
              <div className="text-center mb-16">
                <h2
                  className="text-4xl font-bold mb-4"
                  style={{ color: "#003552" }}
                >
                  Filing a Claim
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  If something happens during your trip, we're here to help. Our
                  claims process is designed to be simple and fast.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {claimsProcess.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                        style={{ backgroundColor: "#FF7500" }}
                      >
                        <span className="text-2xl font-bold text-white">
                          {step.step}
                        </span>
                      </div>
                      {index < claimsProcess.length - 1 && (
                        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                      )}
                    </div>
                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ color: "#003552" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 mr-3 text-red-600" />
                  <h3 className="text-2xl font-bold text-red-800">
                    Emergency Contact
                  </h3>
                </div>
                <div className="text-center">
                  <p className="text-red-700 mb-4">
                    In case of emergency or serious incident, contact us
                    immediately:
                  </p>
                  <div className="text-3xl font-bold text-red-800 mb-4">
                    +44 800 123 4567
                  </div>
                  <p className="text-red-600 text-sm">
                    Available 24/7 for emergencies and urgent support
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeTab === "faq" && (
            <div>
              <div className="text-center mb-16">
                <h2
                  className="text-4xl font-bold mb-4"
                  style={{ color: "#003552" }}
                >
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Common questions about our insurance and protection coverage.
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                {[
                  {
                    question: "What does the insurance cover?",
                    answer:
                      "Our insurance includes third-party liability up to £750,000, physical damage protection, theft coverage, and 24/7 roadside assistance. The exact coverage depends on your selected protection plan.",
                  },
                  {
                    question: "How much is the excess?",
                    answer:
                      "The excess varies by protection plan: Basic (£1,000), Standard (£500), Premium (£200). You're only responsible for the excess amount in case of a claim.",
                  },
                  {
                    question: "What should I do if I have an accident?",
                    answer:
                      "First, ensure everyone is safe and call emergency services if needed. Then contact Rentalosv immediately through the app or emergency hotline. Document the scene with photos and get contact information from other parties involved.",
                  },
                  {
                    question: "Are there any exclusions?",
                    answer:
                      "Standard exclusions include driving under the influence, racing, off-road driving, and using the vehicle for commercial purposes. Full terms are available in your rental agreement.",
                  },
                  {
                    question: "How long does the claims process take?",
                    answer:
                      "Most claims are resolved within 48 hours. Complex cases may take longer, but we keep you updated throughout the process and provide support every step of the way.",
                  },
                  {
                    question: "Can I add additional drivers?",
                    answer:
                      "Yes, additional drivers can be added to your booking. All drivers must meet our eligibility requirements and will be covered under the same insurance policy.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="p-6">
                      <h3
                        className="text-lg font-semibold mb-3"
                        style={{ color: "#003552" }}
                      >
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ backgroundColor: "#003552" }}>
        <div className="mx-auto px-0 lg:px-[150px]">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Drive Protected?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book your next trip with confidence knowing you're covered by
              comprehensive insurance and protection.
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
                Find a Car
              </button>
              <button
                className="px-12 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-white hover:text-gray-900 border-2 border-white text-white"
                onClick={openLoginModal}
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsuranceProtection;
