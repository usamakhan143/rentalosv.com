import React, { useState } from "react";
import { FileText, Shield, Scale, Users } from "lucide-react";
import { useLoginModal } from "../contexts/LoginModalContext";

const Legal = () => {
  const [openSection, setOpenSection] = useState(0);
  const { openLoginModal } = useLoginModal();

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const legalSections = [
    {
      title: "Terms of Service",
      icon: FileText,
      content: `These Terms of Service ("Terms") govern your use of the Rentalosv platform, website, and services. By accessing or using our services, you agree to be bound by these Terms.

1. ACCEPTANCE OF TERMS
By creating an account or using our services, you acknowledge that you have read, understood, and agree to these Terms.

2. DESCRIPTION OF SERVICE
Rentalosv operates a peer-to-peer car sharing marketplace that connects car owners ("Hosts") with people who need to rent cars ("Guests").

3. USER ACCOUNTS
- You must be at least 18 years old to use our services
- You must provide accurate and complete information
- You are responsible for maintaining account security
- One account per person is permitted

4. HOST RESPONSIBILITIES
- Maintain valid insurance and registration
- Provide accurate vehicle information
- Ensure vehicle is safe and roadworthy
- Comply with local laws and regulations

5. GUEST RESPONSIBILITIES
- Hold a valid driver's license
- Use vehicle responsibly and legally
- Return vehicle in same condition
- Report any incidents immediately

6. PROHIBITED USES
- Illegal activities
- Commercial transportation services
- Racing or off-road driving
- Smoking in vehicles (unless permitted)
- Pet transportation (unless permitted)

7. FEES AND PAYMENTS
- Service fees apply to all bookings
- Payment processing via secure third parties
- Cancellation policies vary by booking
- Additional fees may apply for violations

8. LIMITATION OF LIABILITY
Rentalosv's liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, or consequential damages.

9. MODIFICATIONS
We reserve the right to modify these Terms at any time. Continued use constitutes acceptance of modified Terms.`,
    },
    {
      title: "Privacy Policy",
      icon: Shield,
      content: `This Privacy Policy describes how Rentalosv collects, uses, and protects your personal information.

1. INFORMATION WE COLLECT
- Personal identification information
- Vehicle and driving information
- Payment and financial information
- Location data when using our services
- Communication records

2. HOW WE USE YOUR INFORMATION
- Provide and improve our services
- Process bookings and payments
- Verify identity and eligibility
- Communicate important updates
- Ensure safety and security

3. INFORMATION SHARING
We may share your information with:
- Other users as necessary for bookings
- Service providers and partners
- Law enforcement when required
- Insurance providers for claims

4. DATA SECURITY
We implement industry-standard security measures to protect your information, including encryption and secure servers.

5. YOUR RIGHTS
- Access your personal information
- Correct inaccurate information
- Delete your account and data
- Control marketing communications
- Data portability rights

6. COOKIES AND TRACKING
We use cookies to improve your experience and analyze usage patterns. You can control cookie settings in your browser.

7. INTERNATIONAL TRANSFERS
Your information may be transferred to and processed in countries outside your residence for service provision.

8. RETENTION
We retain your information for as long as necessary to provide services and comply with legal obligations.

9. CONTACT US
For privacy-related questions, contact our Data Protection Officer at privacy@rentalosv.com.`,
    },
    {
      title: "Community Guidelines",
      icon: Users,
      content: `Our Community Guidelines help ensure a safe, respectful experience for all Rentalosv users.

1. BE RESPECTFUL
- Treat all users with courtesy and respect
- Communicate clearly and professionally
- Respect cultural differences and preferences

2. BE HONEST
- Provide accurate information in your profile
- Be truthful about vehicle condition and availability
- Report issues promptly and honestly

3. BE RESPONSIBLE
- Follow all local laws and regulations
- Use vehicles safely and appropriately
- Maintain vehicles in good condition
- Honor booking commitments

4. BE SAFE
- Meet in public, well-lit locations when possible
- Verify identity before vehicle handover
- Report suspicious activity immediately
- Don't share personal contact information unnecessarily

5. PROHIBITED BEHAVIOR
- Harassment or discriminatory behavior
- Fraudulent or deceptive practices
- Damage to vehicles or property
- Violation of local laws
- Circumventing the platform

6. CONSEQUENCES
Violations may result in:
- Warning notifications
- Account restrictions
- Account suspension
- Permanent ban from platform
- Legal action when appropriate

7. REPORTING
Report violations through:
- In-app reporting tools
- Customer support
- Emergency hotline for urgent safety issues

8. DISPUTE RESOLUTION
We encourage users to resolve disputes amicably. Our support team is available to mediate when needed.`,
    },
    {
      title: "Cookie Policy",
      icon: Scale,
      content: `This Cookie Policy explains how Rentalosv uses cookies and similar technologies.

1. WHAT ARE COOKIES
Cookies are small text files stored on your device that help us provide and improve our services.

2. TYPES OF COOKIES WE USE

ESSENTIAL COOKIES
- Required for basic site functionality
- Authentication and security
- Cannot be disabled

PERFORMANCE COOKIES
- Analytics and usage statistics
- Site performance monitoring
- Error tracking and debugging

FUNCTIONALITY COOKIES
- Personalization preferences
- Language and region settings
- Enhanced user experience

ADVERTISING COOKIES
- Targeted advertising
- Marketing campaign tracking
- Social media integration

3. THIRD-PARTY COOKIES
We work with partners who may set cookies:
- Google Analytics
- Payment processors
- Social media platforms
- Advertising networks

4. MANAGING COOKIES
You can control cookies through:
- Browser settings
- Our cookie preference center
- Third-party opt-out tools

5. COOKIE RETENTION
- Essential cookies: Session or up to 1 year
- Performance cookies: Up to 2 years
- Functionality cookies: Up to 1 year
- Advertising cookies: Up to 13 months

6. UPDATES
This policy may be updated to reflect changes in our cookie practices or legal requirements.

7. CONTACT
For questions about our cookie practices, contact us at cookies@rentalosv.com.`,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="mx-auto px-0 lg:px-[100px]">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-5xl font-bold mb-6"
              style={{ color: "#003552" }}
            >
              Legal Information
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Important legal documents, policies, and guidelines for using
              Rentalosv. Please read these carefully to understand your rights
              and responsibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-8 px-4 border-b border-gray-200">
        <div className="mx-auto px-0 lg:px-[100px]">
          <div className="flex flex-wrap justify-center gap-4">
            {legalSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button
                  key={index}
                  onClick={() => toggleSection(index)}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                    openSection === index
                      ? "text-white shadow-lg"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      openSection === index ? "#FF7500" : undefined,
                  }}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {section.title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="mx-auto px-0 lg:px-[100px]">
          <div className="max-w-4xl mx-auto">
            {openSection !== null ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    {React.createElement(legalSections[openSection].icon, {
                      className: "w-8 h-8 mr-3",
                      style: { color: "#FF7500" },
                    })}
                    <h2
                      className="text-3xl font-bold"
                      style={{ color: "#003552" }}
                    >
                      {legalSections[openSection].title}
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">
                      {legalSections[openSection].content}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-8">
                  <Scale className="w-24 h-24 mx-auto text-gray-300" />
                </div>
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: "#003552" }}
                >
                  Select a Legal Document
                </h3>
                <p className="text-gray-600 text-lg">
                  Choose from the options above to view our legal documents and
                  policies.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto px-0 lg:px-[100px]">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl font-bold text-center mb-12"
              style={{ color: "#003552" }}
            >
              Quick Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "#003552" }}
                >
                  Need Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our support team is here to help with any questions about our
                  policies or terms.
                </p>
                <button
                  className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#FF7500" }}
                  onClick={openLoginModal}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#e66a00")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#FF7500")
                  }
                >
                  Contact Support
                </button>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "#003552" }}
                >
                  Report an Issue
                </h3>
                <p className="text-gray-600 mb-4">
                  Found a problem or have concerns about our platform? Let us
                  know immediately.
                </p>
                <button
                  className="px-6 py-3 rounded-lg border-2 font-semibold transition-all hover:bg-gray-50"
                  style={{ borderColor: "#003552", color: "#003552" }}
                >
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated Section */}
      <section className="py-8 px-4 border-t border-gray-200">
        <div className="mx-auto px-0 lg:px-[100px]">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm text-gray-500">
              Last updated: January 2024. We may update these documents from
              time to time. Continued use of our services constitutes acceptance
              of any changes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Legal;
