import React from "react";
import { Users, Globe, Car, Shield, Heart, Award } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Cars shared", value: "325,000+" },
    { label: "Guests served", value: "14 million" },
    { label: "Countries", value: "7" },
    { label: "Cities", value: "7,500+" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Put people first",
      description:
        "We believe in the power of human connection and building meaningful relationships with our community.",
    },
    {
      icon: Shield,
      title: "Be an owner",
      description:
        "We take responsibility for our actions and decisions, always striving for excellence and accountability.",
    },
    {
      icon: Globe,
      title: "Embrace the adventure",
      description:
        "We encourage curiosity, exploration, and taking on new challenges that help us grow and innovate.",
    },
    {
      icon: Award,
      title: "Win and fail together",
      description:
        "We celebrate successes as a team and learn from failures together, supporting each other every step of the way.",
    },
  ];

  const leadership = [
    {
      name: "Andre Haddad",
      title: "CEO & Co-founder",
      image: "/api/placeholder/400/400",
      bio: "Andre founded Rentalosv with a vision to transform transportation through the power of sharing.",
    },
    {
      name: "Shelby Clark",
      title: "Founder",
      image: "/api/placeholder/400/400",
      bio: "Shelby started the car sharing movement and continues to innovate in sustainable transportation.",
    },
    {
      name: "Steve Webb",
      title: "Chief Financial Officer",
      image: "/api/placeholder/400/400",
      bio: "Steve leads our financial strategy and operations, driving sustainable growth and profitability.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[85px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                {/* Decorative elements */}
                <div
                  className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-20"
                  style={{ backgroundColor: "#FF7500" }}
                ></div>
                <div
                  className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-10"
                  style={{ backgroundColor: "#003552" }}
                ></div>

                {/* Main image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F7e7c1c8fc0cb4fc1825aeea2f2555464?format=webp&width=800"
                    alt="Woman with phone by car"
                    className="w-full h-auto object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: "#FF7500" }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      Available 24/7
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2">
              <h1
                className="text-3xl lg:text-4xl font-bold mb-4"
                style={{ color: "#003552" }}
              >
                A world where everyone can go anywhere
              </h1>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Rentalosv is the world's largest car sharing marketplace where
                you can book any car you want, wherever you want it, from a
                community of local hosts.
              </p>

              <div className="grid grid-cols-4 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center bg-gray-50 rounded-xl p-4"
                  >
                    <div
                      className="text-base font-bold mb-1"
                      style={{ color: "#FF7500" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-xs font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[170px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ color: "#003552" }}
              >
                Our mission
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Put the world's 1+ billion cars to better use. We believe that
                cars shouldn't sit parked 95% of the time. When they're not
                being used by their owners, they could be helping people go
                places and do things.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By connecting car owners with people who need to rent cars, we
                make transportation more accessible, affordable, and convenient
                for everyone while promoting sustainable travel.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 text-center relative overflow-hidden">
                {/* Background decoration */}
                <div
                  className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20"
                  style={{ backgroundColor: "#FF7500" }}
                ></div>

                {/* Key image */}
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F05e167f7837f4439ae1347687576627c?format=webp&width=800"
                  alt="Car keys being handed over"
                  className="w-48 h-32 mx-auto mb-6 object-cover rounded-lg shadow-md"
                />
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#003552" }}
                >
                  Better utilization
                </h3>
                <p className="text-gray-600">
                  Making the world's cars work harder for everyone
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[170px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Our values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and help us build a better
              future for transportation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: "#003552" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[170px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Leadership team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the leaders driving our mission to transform transportation
              through sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#003552" }}
                >
                  {leader.name}
                </h3>
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: "#FF7500" }}
                >
                  {leader.title}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[170px]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: "#003552" }}
              >
                Our story
              </h2>
              <p className="text-xl text-gray-600">
                From a simple idea to a global movement
              </p>
            </div>

            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: "#003552" }}
                  >
                    2009: The beginning
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Shelby Clark had an idea: what if people could rent cars
                    from each other? He started building a platform to connect
                    car owners with people who needed to rent cars, laying the
                    foundation for what would become Rentalosv.
                  </p>
                </div>
                <div className="bg-gray-100 rounded-2xl overflow-hidden">
                  <img
                    src="https://cdn.builder.io/o/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F7d68d1bb77cb4280b6302caf330311c6?alt=media&token=e95cdc71-77b0-414f-9029-bc0f78eae25d&apiKey=59fb5da5a9b342648db0a1edf457b3c1"
                    alt="Luxury limousine"
                    className="w-full h-48 object-contain bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: "#003552" }}
                  >
                    2012: Growing the community
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Andre Haddad joined as CEO, bringing experience in scaling
                    marketplaces. Together, they expanded Rentalosv across
                    multiple cities and countries, building a global community
                    of car sharers.
                  </p>
                </div>
                <div className="lg:order-1 bg-gray-100 rounded-2xl overflow-hidden">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2Fdd275373395c4481ac542da1f2136604?format=webp&width=800"
                    alt="Yellow toy car"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: "#003552" }}
                  >
                    Today: Transforming transportation
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    With millions of guests and hundreds of thousands of cars
                    shared worldwide, Rentalosv continues to lead the car
                    sharing revolution, making transportation more accessible,
                    sustainable, and community-driven.
                  </p>
                </div>
                <div className="bg-gray-100 rounded-2xl overflow-hidden">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F64372539cb974f9790604bfb1a585876?format=webp&width=800"
                    alt="Man using mobile phone inside car"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ backgroundColor: "#003552" }}>
        <div className="mx-auto px-0 lg:px-[170px]">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Join our mission
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of the movement that's transforming transportation.
              Whether you're looking to share your car or find the perfect ride,
              Rentalosv makes it possible.
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
                List your car
              </button>
              <button className="px-12 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-white hover:text-gray-900 border-2 border-white text-white">
                Find a car
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
