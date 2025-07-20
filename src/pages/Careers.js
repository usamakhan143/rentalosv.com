import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  Briefcase,
  Globe,
  Heart,
  Award,
  ArrowRight,
} from "lucide-react";

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const jobOpenings = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: true,
      description:
        "Build scalable systems that power the world's largest car sharing marketplace.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: false,
      description:
        "Drive product strategy and roadmap for our core marketplace platform.",
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      remote: true,
      description:
        "Create beautiful, intuitive experiences for millions of users worldwide.",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "London, UK",
      type: "Full-time",
      remote: false,
      description:
        "Lead marketing campaigns and brand initiatives across European markets.",
    },
    {
      title: "Data Scientist",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: true,
      description:
        "Use data to optimize pricing, matching, and user experience across the platform.",
    },
    {
      title: "Operations Specialist",
      department: "Operations",
      location: "Austin, TX",
      type: "Full-time",
      remote: false,
      description:
        "Ensure smooth operations and exceptional support for our host community.",
    },
  ];

  const departments = [
    "all",
    "Engineering",
    "Product",
    "Design",
    "Marketing",
    "Operations",
  ];

  const filteredJobs =
    selectedDepartment === "all"
      ? jobOpenings
      : jobOpenings.filter((job) => job.department === selectedDepartment);

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive health, dental, and vision insurance plus wellness stipends.",
    },
    {
      icon: Globe,
      title: "Remote-First",
      description:
        "Work from anywhere with flexible schedules and home office stipends.",
    },
    {
      icon: Award,
      title: "Growth & Learning",
      description:
        "Professional development budget and opportunities to attend conferences.",
    },
    {
      icon: Users,
      title: "Inclusive Culture",
      description:
        "Diverse, welcoming environment where everyone can do their best work.",
    },
  ];

  const values = [
    {
      title: "Put people first",
      description:
        "We prioritize human connection and meaningful relationships in everything we do.",
    },
    {
      title: "Be an owner",
      description:
        "Take responsibility, show accountability, and always strive for excellence.",
    },
    {
      title: "Embrace the adventure",
      description:
        "Stay curious, explore new challenges, and help us innovate and grow.",
    },
    {
      title: "Win and fail together",
      description:
        "Celebrate successes as a team and learn from failures collectively.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: "#003552" }}
            >
              Join our journey
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're building the future of transportation and looking for
              passionate people to join our mission. Discover opportunities to
              grow your career while making a real impact.
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
                  8
                </div>
                <div className="text-gray-600">Global offices</div>
              </div>
              <div className="text-center">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: "#FF7500" }}
                >
                  15+
                </div>
                <div className="text-gray-600">Open positions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Our values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide how we work together and build products
              that serve millions of people worldwide.
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

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Why work at Rentalosv?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer competitive benefits and a culture that supports your
              growth, well-being, and work-life balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#FF7500" }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: "#003552" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Open positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your next opportunity and join a team that's passionate about
              transforming transportation.
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all capitalize ${
                  selectedDepartment === dept
                    ? "text-white shadow-lg"
                    : "text-gray-700 bg-white hover:bg-gray-100"
                }`}
                style={{
                  backgroundColor:
                    selectedDepartment === dept ? "#FF7500" : undefined,
                }}
              >
                {dept === "all" ? "All departments" : dept}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3
                        className="text-xl font-semibold"
                        style={{ color: "#003552" }}
                      >
                        {job.title}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: "#FF7500" }}
                      >
                        {job.department}
                      </span>
                      {job.remote && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Remote OK
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {job.department}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <button
                      className="flex items-center px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
                      style={{ backgroundColor: "#FF7500", color: "white" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#e66a00")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#FF7500")
                      }
                    >
                      Apply now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No positions available in this department right now.
              </p>
              <p className="text-gray-500 mt-2">
                Check back soon or explore other departments!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Our hiring process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've designed our process to be transparent, efficient, and
              respectful of your time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Application",
                description:
                  "Submit your application and we'll review it within 5 business days.",
              },
              {
                step: "2",
                title: "Phone Screen",
                description:
                  "Brief conversation with our talent team to learn more about you.",
              },
              {
                step: "3",
                title: "Interviews",
                description:
                  "Meet with team members and showcase your skills through relevant exercises.",
              },
              {
                step: "4",
                title: "Decision",
                description:
                  "We'll make a decision quickly and provide feedback regardless of outcome.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: "#FF7500" }}
                >
                  {step.step}
                </div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "#003552" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ backgroundColor: "#003552" }}>
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to join our mission?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Help us build the future of transportation while growing your
              career alongside passionate, talented people from around the
              world.
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
                View all positions
              </button>
              <button className="px-12 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-white hover:text-gray-900 border-2 border-white text-white">
                Learn about our culture
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
