import React, { useState } from "react";
import {
  Calendar,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

const Press = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const pressReleases = [
    {
      title: "Rentalosv Expands to 7th Country with Launch in Germany",
      date: "January 15, 2024",
      category: "expansion",
      excerpt:
        "Car sharing marketplace continues European growth with Berlin and Munich launches, bringing platform to over 7,500 cities worldwide.",
      downloadUrl: "#",
    },
    {
      title: "Rentalosv Reaches 14 Million Guests Milestone",
      date: "December 8, 2023",
      category: "milestone",
      excerpt:
        "Platform celebrates serving 14 million guests since inception, with 325,000+ vehicles now available for sharing globally.",
      downloadUrl: "#",
    },
    {
      title: "New Safety Features Launch Across All Markets",
      date: "November 22, 2023",
      category: "product",
      excerpt:
        "Enhanced verification processes, real-time trip monitoring, and 24/7 support now available to all hosts and guests.",
      downloadUrl: "#",
    },
    {
      title: "Rentalosv Partners with Leading Insurance Providers",
      date: "October 30, 2023",
      category: "partnership",
      excerpt:
        "Strategic partnerships enhance coverage options and provide additional protection for car sharing community.",
      downloadUrl: "#",
    },
    {
      title: "Q3 2023 Financial Results Exceed Expectations",
      date: "October 15, 2023",
      category: "financial",
      excerpt:
        "Strong growth in bookings and revenue driven by increased travel demand and platform expansion.",
      downloadUrl: "#",
    },
    {
      title: "Rentalosv Launches Electric Vehicle Initiative",
      date: "September 18, 2023",
      category: "sustainability",
      excerpt:
        "New program incentivizes electric vehicle hosts and promotes sustainable transportation options across all markets.",
      downloadUrl: "#",
    },
  ];

  const mediaKit = [
    {
      title: "Company Logo Pack",
      description: "High-resolution logos in various formats and color schemes",
      type: "ZIP",
      size: "2.4 MB",
      downloadUrl: "#",
    },
    {
      title: "Brand Guidelines",
      description: "Complete brand style guide and usage instructions",
      type: "PDF",
      size: "8.1 MB",
      downloadUrl: "#",
    },
    {
      title: "Product Screenshots",
      description: "App and website screenshots for editorial use",
      type: "ZIP",
      size: "15.2 MB",
      downloadUrl: "#",
    },
    {
      title: "Executive Photos",
      description: "High-resolution headshots of leadership team",
      type: "ZIP",
      size: "12.8 MB",
      downloadUrl: "#",
    },
  ];

  const categories = [
    { id: "all", label: "All news" },
    { id: "expansion", label: "Expansion" },
    { id: "milestone", label: "Milestones" },
    { id: "product", label: "Product" },
    { id: "partnership", label: "Partnerships" },
    { id: "financial", label: "Financial" },
    { id: "sustainability", label: "Sustainability" },
  ];

  const filteredReleases =
    selectedCategory === "all"
      ? pressReleases
      : pressReleases.filter(
          (release) => release.category === selectedCategory,
        );

  const awards = [
    {
      year: "2023",
      title: "Best Sharing Economy Platform",
      organization: "TechCrunch Awards",
    },
    {
      year: "2023",
      title: "Sustainable Transportation Innovation",
      organization: "Green Business Awards",
    },
    {
      year: "2022",
      title: "Top 50 Most Innovative Companies",
      organization: "Fast Company",
    },
    {
      year: "2022",
      title: "Excellence in Marketplace Design",
      organization: "UX Design Awards",
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
              Press center
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Latest news, press releases, and media resources from Rentalosv.
              Get the latest updates on our mission to put the world's cars to
              better use.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: "#FF7500" }}
                >
                  325K+
                </div>
                <div className="text-gray-600">Cars shared</div>
              </div>
              <div className="text-center">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: "#FF7500" }}
                >
                  14M
                </div>
                <div className="text-gray-600">Guests served</div>
              </div>
              <div className="text-center">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: "#FF7500" }}
                >
                  7,500+
                </div>
                <div className="text-gray-600">Cities worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: "#003552" }}
              >
                Media inquiries
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                For press inquiries, interview requests, or media resources,
                please contact our communications team. We're here to help tell
                the Rentalosv story.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" style={{ color: "#FF7500" }} />
                  <a
                    href="mailto:press@rentalosv.com"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    press@rentalosv.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone
                    className="w-5 h-5 mr-3"
                    style={{ color: "#FF7500" }}
                  />
                  <span className="text-gray-700">+1 (555) 123-PRESS</span>
                </div>
                <div className="flex items-center">
                  <MapPin
                    className="w-5 h-5 mr-3"
                    style={{ color: "#FF7500" }}
                  />
                  <span className="text-gray-700">San Francisco, CA</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "#003552" }}
              >
                Press contact
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-gray-600">
                    Director of Communications
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Mike Rodriguez
                  </div>
                  <div className="text-gray-600">PR Manager</div>
                </div>
              </div>
              <button
                className="w-full mt-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
                style={{ backgroundColor: "#FF7500", color: "white" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e66a00")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#FF7500")
                }
              >
                Send media inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Latest news
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay up to date with Rentalosv announcements, product launches,
              and company milestones.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === category.id
                    ? "text-white shadow-lg"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === category.id ? "#FF7500" : undefined,
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Press Release List */}
          <div className="space-y-6">
            {filteredReleases.map((release, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white capitalize"
                        style={{ backgroundColor: "#FF7500" }}
                      >
                        {release.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {release.date}
                      </div>
                    </div>
                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ color: "#003552" }}
                    >
                      {release.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {release.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 lg:mt-0 lg:ml-8 flex gap-3">
                    <button
                      className="flex items-center px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all hover:bg-gray-50"
                      style={{ borderColor: "#003552", color: "#003552" }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read more
                    </button>
                    <button
                      className="flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:shadow-lg"
                      style={{ backgroundColor: "#FF7500", color: "white" }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Media kit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download high-resolution assets, brand guidelines, and other
              resources for editorial use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mediaKit.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#FF7500" }}
                >
                  {item.title.includes("Logo") ||
                  item.title.includes("Screenshots") ||
                  item.title.includes("Photos") ? (
                    <ImageIcon className="w-6 h-6 text-white" />
                  ) : (
                    <FileText className="w-6 h-6 text-white" />
                  )}
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#003552" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex justify-center items-center gap-4 text-xs text-gray-500 mb-4">
                  <span>{item.type}</span>
                  <span>•</span>
                  <span>{item.size}</span>
                </div>
                <button
                  className="flex items-center justify-center w-full py-2 rounded-lg font-semibold text-sm transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#FF7500", color: "white" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#e66a00")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#FF7500")
                  }
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 px-4">
        <div className="mx-auto px-0 lg:px-[120px]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#003552" }}
            >
              Awards & recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry recognition for our innovation in transportation and
              commitment to building sustainable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0"
                  style={{ backgroundColor: "#FF7500" }}
                >
                  <span className="text-white font-bold">{award.year}</span>
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: "#003552" }}
                  >
                    {award.title}
                  </h3>
                  <p className="text-gray-600">{award.organization}</p>
                </div>
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
              Stay connected
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Follow us for the latest news and updates from Rentalosv. Join our
              community and be part of the car sharing revolution.
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
                Subscribe to updates
              </button>
              <button className="px-12 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-white hover:text-gray-900 border-2 border-white text-white">
                Follow us on social
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Press;
