import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    rentalosv: [
      { label: "About", to: "/about" },
      { label: "Team", to: "/team" },
      { label: "Policies", to: "/legal" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
    ],
    locations: [
      { label: "USA (EN)", to: "/usa" },
      { label: "Australia (EN)", to: "/australia" },
      { label: "Canada (EN)", to: "/canada" },
      { label: "Canada (FR)", to: "/canada-fr" },
      { label: "France (FR)", to: "/france" },
      { label: "UK (EN)", to: "/uk" },
    ],
    explore: [
      { label: "Business", to: "/business" },
      { label: "Long-term car rentals", to: "/long-term" },
    ],
    hosting: [
      { label: "List your car", to: "/become-host" },
      { label: "Carculator", to: "/calculator" },
      { label: "Host tools", to: "/host-tools" },
      { label: "Insurance & protection", to: "/insurance" },
    ],
    vehicleTypes: [
      { label: "Car rentals", to: "/car-rentals" },
      { label: "SUV rentals", to: "/suv-rentals" },
      { label: "Truck rentals", to: "/truck-rentals" },
      { label: "Minivan rentals", to: "/minivan-rentals" },
      { label: "Luxury car rentals", to: "/luxury-rentals" },
      { label: "Electric car rentals", to: "/electric-rentals" },
    ],
    makes: [
      { label: "BMW", to: "/bmw" },
      { label: "Volvo", to: "/volvo" },
      { label: "Audi", to: "/audi" },
      { label: "Porsche", to: "/porsche" },
      { label: "Tesla", to: "/tesla" },
      { label: "Volkswagen", to: "/volkswagen" },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-2 sm:px-8 lg:px-16 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 mb-8 md:mb-12">
          {/* Rentalosv */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Rentalosv
            </h3>
            <ul className="space-y-2">
              {footerLinks.rentalosv.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-gray-600 hover:text-gray-900 transition duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Locations
            </h3>
            <ul className="space-y-2">
              {footerLinks.locations.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-gray-600 hover:text-gray-900 transition duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-gray-600 hover:text-gray-900 transition duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Hosting
            </h3>
            <ul className="space-y-2">
              {footerLinks.hosting.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-gray-600 hover:text-gray-900 transition duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle types */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Vehicle types
            </h3>
            <ul className="space-y-2">
              {footerLinks.vehicleTypes.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-gray-600 hover:text-gray-900 transition duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Makes */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Makes
            </h3>
            <ul className="space-y-2">
              {footerLinks.makes.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-xs text-gray-600 hover:text-gray-900 transition duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media and App Links */}
        <div className="border-t border-gray-200 pt-6 md:pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>

            {/* App Store Links */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <a
                href="#"
                className="block transition duration-200 hover:opacity-80"
              >
                <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2">
                  <div className="text-xs">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="block transition duration-200 hover:opacity-80"
              >
                <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2">
                  <div className="text-xs">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-200 pt-4 md:pt-8 mt-6 md:mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-6 text-xs text-gray-600">
              <Link
                to="/legal"
                className="hover:text-gray-900 transition duration-200"
              >
                Terms
              </Link>
              <Link
                to="/legal"
                className="hover:text-gray-900 transition duration-200"
              >
                Privacy
              </Link>
              <Link
                to="/legal"
                className="hover:text-gray-900 transition duration-200"
              >
                Cookie preferences
              </Link>
            </div>

            <div className="text-xs text-gray-500">
              © {currentYear} Rentalosv.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
