import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Users,
  MessageCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLoginModal } from "../contexts/LoginModalContext";

const BecomeHost = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { openLoginModal } = useLoginModal();
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleGetStarted = () => {
    if (currentUser) {
      // User is logged in, navigate to list your car
      navigate('/list-your-car');
    } else {
      // User is not logged in, show login modal
      openLoginModal();
    }
  };

  const earningsData = [
    { location: "LONDON", price: "£1,085", period: "/mo" },
    { location: "BRISTOL", price: "£743", period: "/mo" },
    { location: "LIVERPOOL", price: "£526", period: "/mo" },
    { location: "CARDIFF", price: "£456", period: "/mo" },
    { location: "BELFAST", price: "£398", period: "/mo" },
  ];

  const faqs = [
    {
      question: "What happens if my car gets damaged?",
      answer:
        "All bookings come with liability insurance and physical damage protections. Rentalosv provides up to £750,000 of third-party liability insurance and comprehensive physical damage protection.",
    },
    {
      question: "How do I screen guests?",
      answer:
        "Every guest is pre-screened, including identity verification and driving record checks. You can also review guest profiles and ratings before accepting bookings.",
    },
    {
      question: "How much money can I make?",
      answer:
        "Earnings vary by location, car type, and how often you share. Many hosts earn £200-£1000+ per month. Our calculator can give you a personalised estimate.",
    },
    {
      question: "When do I get paid?",
      answer:
        "You'll receive payment 3 hours after your trip starts. Payments are sent directly to your bank account via direct deposit.",
    },
    {
      question: "Can I decline booking requests?",
      answer:
        "Yes, you have full control over your bookings. You can decline any request that doesn't work for you, though we recommend maintaining a good acceptance rate.",
    },
    {
      question: "What if a guest damages my car?",
      answer:
        "Rentalosv's protection covers physical damage, and we'll help you through the claims process. Most claims are resolved quickly and smoothly.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-white py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: "#003552" }}
            >
              Start your car sharing business on Rentalosv
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join top UK hosts who make an average of £6,492 every year for
              each car they list on Rentalosv*
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg"
                style={{ backgroundColor: "#FF7500" }}
                onClick={handleGetStarted}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e66a00")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#FF7500")
                }
              >
                Get started
              </button>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="text-gray-500">INSURANCE PROVIDER</span>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: "#DC2626" }}
                  >
                    HIS
                  </div>
                  <span className="text-gray-700 font-medium">
                    The specialist motor insurer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Image Section */}
      <section
        className="w-full h-[348px] lg:h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Fa0bfa441a1e5489588e7540e69467f83?format=webp&width=800')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </section>

      {/* What is Rentalosv Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px] text-center">
          <div className="max-w-4xl mx-auto">
            <div
              className="inline-block px-6 py-2 rounded-full mb-6"
              style={{ backgroundColor: "#E8E5FF" }}
            >
              <h2 className="text-4xl font-bold" style={{ color: "#003552" }}>
                What is Rentalosv?
              </h2>
            </div>

            <p className="text-xl text-gray-700 mb-16 max-w-2xl mx-auto">
              Rentalosv is an international marketplace where guests book any
              car they want and hosts build successful businesses sharing their
              cars
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    <circle
                      cx="32"
                      cy="32"
                      r="32"
                      fill="#A855F7"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
                      fill="#A855F7"
                    />
                  </svg>
                </div>
                <h3
                  className="text-3xl font-bold mb-1"
                  style={{ color: "#003552" }}
                >
                  3.2M+
                </h3>
                <p className="text-gray-600 text-sm">active guests*</p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    <rect
                      x="16"
                      y="16"
                      width="32"
                      height="32"
                      rx="4"
                      fill="#A855F7"
                      fillOpacity="0.1"
                    />
                    <rect x="20" y="20" width="6" height="24" fill="#A855F7" />
                    <rect x="29" y="26" width="6" height="18" fill="#A855F7" />
                    <rect x="38" y="22" width="6" height="22" fill="#A855F7" />
                  </svg>
                </div>
                <h3
                  className="text-3xl font-bold mb-1"
                  style={{ color: "#003552" }}
                >
                  12,000+
                </h3>
                <p className="text-gray-600 text-sm">cities*</p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    <path
                      d="M16 32 L32 16 L48 32 L40 32 L40 48 L24 48 L24 32 Z"
                      fill="#A855F7"
                      fillOpacity="0.1"
                    />
                    <path d="M28 24 L36 24 L36 28 L28 28 Z" fill="#A855F7" />
                    <circle cx="30" cy="38" r="2" fill="#A855F7" />
                    <circle cx="34" cy="38" r="2" fill="#A855F7" />
                  </svg>
                </div>
                <h3
                  className="text-3xl font-bold mb-1"
                  style={{ color: "#003552" }}
                >
                  350,000+
                </h3>
                <p className="text-gray-600 text-sm">active vehicles*</p>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    <circle
                      cx="32"
                      cy="28"
                      r="8"
                      fill="#A855F7"
                      fillOpacity="0.1"
                    />
                    <circle cx="32" cy="28" r="4" fill="#A855F7" />
                    <path
                      d="M20 48 C20 40 25.373 34 32 34 C38.627 34 44 40 44 48"
                      fill="#A855F7"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M24 48 C24 42 27.582 38 32 38 C36.418 38 40 42 40 48"
                      fill="#A855F7"
                    />
                  </svg>
                </div>
                <h3
                  className="text-3xl font-bold mb-1"
                  style={{ color: "#003552" }}
                >
                  175,000+
                </h3>
                <p className="text-gray-600 text-sm">active hosts*</p>
              </div>
            </div>

            {/* Purple accent line */}
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How much could you earn Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ color: "#003552" }}
              >
                How much could you earn on Rentalosv?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                On average, hosts in the UK who share their car 15 days per
                month earn the amounts below. Actual earnings vary depending on
                vehicle type, location, and other factors.
              </p>

              <div className="space-y-4 mb-8">
                {earningsData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-200"
                  >
                    <span
                      className="font-semibold text-lg"
                      style={{ color: "#003552" }}
                    >
                      {item.location}
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "#FF7500" }}
                    >
                      {item.price}
                      <span className="text-lg text-gray-600">
                        {item.period}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <button
                className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg"
                style={{ backgroundColor: "#FF7500" }}
                onClick={() => navigate('/calculator')}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e66a00")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#FF7500")
                }
              >
                Calculate your earnings
              </button>
            </div>

            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F8061a6e08b114da38a5dee0706b6ffce?format=webp&width=800"
                alt="Earnings potential"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the hosts Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <h2
            className="text-4xl font-bold text-center mb-16"
            style={{ color: "#003552" }}
          >
            Meet the hosts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b17c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="Host Sarah"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "#003552" }}
                  >
                    Sarah M.
                  </h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        style={{ color: "#FF7500" }}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">Host since 2019</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I've been hosting my BMW on Rentalosv for over 2 years and it's
                been fantastic. The platform is easy to use, guests are
                respectful, and I've earned enough to cover my car payments plus
                extra for holidays!"
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="Host James"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "#003552" }}
                  >
                    James R.
                  </h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        style={{ color: "#FF7500" }}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">Host since 2020</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Sharing my cars on Rentalosv has been a game-changer. I started
                with one car and now have three vehicles earning income. The
                insurance coverage gives me peace of mind, and the extra income
                helps fund my business."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Car Collection Photo */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Car collection"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
              <div className="max-w-2xl mx-auto text-center text-white px-8">
                <h2 className="text-4xl font-bold mb-4">
                  From everyday cars to luxury vehicles
                </h2>
                <p className="text-xl">
                  Whatever car you have, there's a guest for it. From practical
                  city cars to luxury sports cars, all types of vehicles earn on
                  Rentalosv.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The sky's the limit Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px] text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: "#003552" }}>
            The sky's the limit
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We can't predict customer demand
          </p>
          <div
            className="w-32 h-1 mx-auto"
            style={{ backgroundColor: "#FF7500" }}
          ></div>
          <p className="text-lg text-gray-600 mt-8 max-w-2xl mx-auto">
            Many hosts start with one car and expand their fleet as they see
            success. Some turn it into a full-time business, others use it to
            offset car costs. The choice is yours.
          </p>
        </div>
      </section>

      {/* Getting started Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl font-bold mb-8"
                style={{ color: "#003552" }}
              >
                Getting started on Rentalosv
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: "#003552" }}
                    >
                      Sign up
                    </h3>
                    <p className="text-gray-600">
                      Create your account and tell us about your car. It only
                      takes a few minutes and listing is always free.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: "#003552" }}
                    >
                      Set up your profile
                    </h3>
                    <p className="text-gray-600">
                      Add photos of your car, set your availability, and decide
                      on your pricing. Our tools help you maximize your
                      earnings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: "#003552" }}
                    >
                      Welcome your guests
                    </h3>
                    <p className="text-gray-600">
                      Once approved, you'll start receiving booking requests.
                      You choose which requests to accept and when to share your
                      car.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: "#003552" }}
                    >
                      Get back your keys
                    </h3>
                    <p className="text-gray-600">
                      After each trip, you'll receive payment and can review
                      your guest. Most trips go smoothly, but we're here to help
                      if anything comes up.
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="mt-8 px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg"
                style={{ backgroundColor: "#FF7500" }}
                onClick={handleGetStarted}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e66a00")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#FF7500")
                }
              >
                Get started
              </button>
            </div>

            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F0350a67356a34365af1cc3550d41101f?format=webp&width=800"
                alt="Getting started"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* You're protected Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Fc05c7ddaa042410ba130ca0d05632d22?format=webp&width=800"
                alt="Protected car"
                className="rounded-2xl shadow-xl"
              />
            </div>

            <div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ color: "#003552" }}
              >
                You're protected
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Every booking on Rentalosv is backed by comprehensive protection
                and insurance, so you can share with confidence.
              </p>

              <div className="space-y-6">
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#003552" }}
                  >
                    Physical damage protection
                  </h3>
                  <p className="text-gray-600">
                    All trips include physical damage protection up to the
                    actual cash value of your car.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#003552" }}
                  >
                    Liability insurance
                  </h3>
                  <p className="text-gray-600">
                    £750,000 of third-party liability insurance is included with
                    every booking.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#003552" }}
                  >
                    24/7 support
                  </h3>
                  <p className="text-gray-600">
                    Our customer support team is available around the clock to
                    help with any issues.
                  </p>
                </div>
              </div>

              <button
                className="mt-8 px-8 py-4 border-2 rounded-lg font-semibold text-lg transition-all hover:bg-gray-50"
                style={{ borderColor: "#003552", color: "#003552" }}
              >
                Learn about protection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* We've got your back Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <h2
            className="text-4xl font-bold text-center mb-16"
            style={{ color: "#003552" }}
          >
            We've got your back
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#FF7500" }}
              >
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "#003552" }}
              >
                24/7 guest support
              </h3>
              <p className="text-gray-600">
                Rentalosv provides customer support for guests during their
                trip, so you don't have to.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#FF7500" }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "#003552" }}
              >
                Host support chat line
              </h3>
              <p className="text-gray-600">
                Get help when you need it with our dedicated host support team
                via chat or phone.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#FF7500" }}
              >
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "#003552" }}
              >
                We send out help
              </h3>
              <p className="text-gray-600">
                If your car breaks down during a trip, we'll send roadside
                assistance to help your guest.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: "#FF7500" }}
              onClick={handleGetStarted}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e66a00")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF7500")}
            >
              Get started
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <h2
            className="text-4xl font-bold text-center mb-16"
            style={{ color: "#003552" }}
          >
            Frequently asked questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
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
      </section>

      {/* Final CTA Section */}
      <section
        className="py-20 px-4 text-center"
        style={{ backgroundColor: "#003552" }}
      >
        <div className="mx-auto px-0 lg:px-[120px]">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to start earning?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of hosts who are already earning with Rentalosv
          </p>
          <button
            className="px-12 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: "#FF7500" }}
            onClick={handleGetStarted}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e66a00")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF7500")}
          >
            List your car today
          </button>
        </div>
      </section>
    </div>
  );
};

export default BecomeHost;
