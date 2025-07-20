import React from "react";
import { Users, Linkedin, Twitter, Mail, MapPin } from "lucide-react";

const Team = () => {
  const executiveTeam = [
    {
      name: "Andre Haddad",
      title: "Chief Executive Officer",
      location: "San Francisco, CA",
      bio: "Andre joined Rentalosv as CEO in 2012 with a vision to scale the car sharing marketplace globally. Under his leadership, Rentalosv has expanded to 7 countries and served millions of guests worldwide.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Steve Webb",
      title: "Chief Financial Officer",
      location: "San Francisco, CA",
      bio: "Steve leads our financial operations and strategic planning. With over 15 years in finance and operations, he drives sustainable growth and operational excellence across all markets.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Camille Hart",
      title: "Chief Marketing Officer",
      location: "San Francisco, CA",
      bio: "Camille oversees global marketing strategy and brand development. She's passionate about building authentic connections between Rentalosv and our community of hosts and guests.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Michelle Fang",
      title: "Chief Product Officer",
      location: "San Francisco, CA",
      bio: "Michelle leads product strategy and user experience across all Rentalosv platforms. She focuses on creating innovative solutions that make car sharing seamless and delightful.",
      linkedin: "#",
      twitter: "#",
    },
  ];

  const departments = [
    {
      name: "Engineering",
      description:
        "Building the technology that powers the world's largest car sharing marketplace.",
      teamSize: "45+ engineers",
      locations: "San Francisco, London, Remote",
    },
    {
      name: "Product & Design",
      description:
        "Creating intuitive experiences that connect millions of people with cars worldwide.",
      teamSize: "20+ designers & PMs",
      locations: "San Francisco, New York",
    },
    {
      name: "Operations",
      description:
        "Ensuring smooth operations and exceptional support for our global community.",
      teamSize: "60+ specialists",
      locations: "Global offices",
    },
    {
      name: "Marketing",
      description:
        "Telling the Rentalosv story and building meaningful connections with our community.",
      teamSize: "25+ marketers",
      locations: "San Francisco, London",
    },
    {
      name: "Business Development",
      description:
        "Forging partnerships and expanding Rentalosv's reach into new markets and opportunities.",
      teamSize: "15+ specialists",
      locations: "San Francisco, Remote",
    },
    {
      name: "Legal & Policy",
      description:
        "Navigating regulations and ensuring compliance across all markets we serve.",
      teamSize: "12+ experts",
      locations: "San Francisco, London",
    },
  ];

  const values = [
    {
      title: "Diversity & Inclusion",
      description:
        "We believe diverse teams build better products. We're committed to creating an inclusive environment where everyone can thrive.",
    },
    {
      title: "Remote-First Culture",
      description:
        "We embrace flexible work arrangements and have team members across multiple time zones working together seamlessly.",
    },
    {
      title: "Learning & Growth",
      description:
        "We invest in our team's development through mentorship, training programs, and opportunities to take on new challenges.",
    },
    {
      title: "Work-Life Balance",
      description:
        "We support our team's well-being with flexible schedules, generous time off, and comprehensive health benefits.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[160px]">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: "#003552" }}
            >
              Meet the team
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're a diverse group of builders, dreamers, and doers united by
              our mission to put the world's cars to better use. Get to know the
              people behind Rentalosv.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: "#FF7500" }}
                >
                  200+
                </div>
                <div className="text-gray-600">Team members</div>
              </div>
              <div className="text-center">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: "#FF7500" }}
                >
                  15+
                </div>
                <div className="text-gray-600">Countries represented</div>
              </div>
              <div className="text-center">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: "#FF7500" }}
                >
                  8
                </div>
                <div className="text-gray-600">Office locations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[160px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Executive team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our leadership team brings together decades of experience in
              technology, operations, and building global marketplaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {executiveTeam.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-semibold mb-1"
                      style={{ color: "#003552" }}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="text-sm font-medium mb-2"
                      style={{ color: "#FF7500" }}
                    >
                      {member.title}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {member.location}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex space-x-3">
                      <a
                        href={member.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition duration-200"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={member.twitter}
                        className="text-gray-400 hover:text-blue-400 transition duration-200"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-gray-600 transition duration-200"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[160px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Our departments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each department plays a crucial role in delivering exceptional
              experiences for our global community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#003552" }}
                >
                  {dept.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {dept.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Users
                      className="w-4 h-4 mr-2"
                      style={{ color: "#FF7500" }}
                    />
                    <span className="text-gray-700">{dept.teamSize}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin
                      className="w-4 h-4 mr-2"
                      style={{ color: "#FF7500" }}
                    />
                    <span className="text-gray-700">{dept.locations}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[160px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Our culture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building more than just a company—we're creating a culture
              where everyone can do their best work and grow professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[160px]">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-12 text-center">
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: "#003552" }}
            >
              Join our team
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're always looking for talented people who share our passion for
              transforming transportation. Explore our open positions and become
              part of the Rentalosv story.
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
                View open positions
              </button>
              <button
                className="px-12 py-4 rounded-lg border-2 font-semibold text-lg transition-all hover:bg-gray-50"
                style={{ borderColor: "#003552", color: "#003552" }}
              >
                Learn about benefits
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4" style={{ backgroundColor: "#003552" }}>
        <div className="mx-auto px-0 lg:px-[160px]">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Want to get in touch?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We'd love to hear from you. Whether you have questions about
              working at Rentalosv or want to learn more about our team.
            </p>
            <button
              className="px-12 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: "#FF7500" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e66a00")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF7500")}
            >
              Contact us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
