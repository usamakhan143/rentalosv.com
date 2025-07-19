import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Car,
  Calendar,
  Settings,
  LogOut,
  Shield,
  Clock,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoginModal } from "../../contexts/LoginModalContext";
import { useSignupModal } from "../../contexts/SignupModalContext";
import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { currentUser, userProfile, logout } = useAuth();
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useLoginModal();
  const { isSignupModalOpen, openSignupModal, closeSignupModal } =
    useSignupModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const profileMenuItems = [
    { to: "/profile", label: "Profile", icon: User },
    { to: "/my-trips", label: "My trips", icon: Calendar },
    ...(userProfile?.role === "host" || userProfile?.role === "admin"
      ? [
          { to: "/my-cars", label: "My cars", icon: Car },
          { to: "/host-bookings", label: "Bookings", icon: Clock },
        ]
      : []),
    ...(userProfile?.role === "admin"
      ? [{ to: "/admin", label: "Admin Panel", icon: Shield }]
      : []),
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-purple-50 px-2 md:px-4 py-1 md:py-2 text-center text-xs md:text-sm text-gray-700 border-b border-purple-100">
        Tell us about your dream journey for a chance to make it happen!
        <a
          href="#"
          className="text-blue-600 hover:text-blue-700 ml-1 underline"
        >
          Learn more about Pitch a Trip
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F59fb5da5a9b342648db0a1edf457b3c1%2F24f372255ce74bdc83eae55f9a3ea5f6?format=webp&width=800"
                alt="Rentalosv.com"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-6">
            {/* Become a host button */}
            <Link
              to="/become-host"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition duration-200 hidden md:block"
              style={{ fontSize: "12px" }}
            >
              Become a host
            </Link>

            {currentUser ? (
              /* Authenticated User Menu */
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <Menu className="w-4 h-4 text-gray-600" />
                </button>

                {isProfileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {userProfile?.firstName} {userProfile?.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {currentUser.email}
                        </p>
                      </div>

                      {profileMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <Icon className="w-4 h-4 mr-3" />
                            {item.label}
                          </Link>
                        );
                      })}

                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Guest User - Menu button */
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition duration-200"
              >
                <Menu className="w-5 h-5 text-gray-700" />
                <User className="w-5 h-5 text-gray-700" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop/Tablet menu */}
        {isMenuOpen && (
          <>
            {/* Desktop/Tablet Dropdown */}
            <div className="hidden md:block absolute right-8 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-4 z-50">
              <div className="space-y-1">
                {!currentUser && (
                  <>
                    <button
                      className="w-full text-left block px-6 py-3 text-gray-700 hover:bg-gray-50 font-normal"
                      style={{ fontSize: "16px" }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        openLoginModal();
                      }}
                    >
                      Log in
                    </button>
                    <button
                      className="w-full text-left block px-6 py-3 text-gray-700 hover:bg-gray-50 font-normal"
                      style={{ fontSize: "16px" }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        openSignupModal();
                      }}
                    >
                      Sign up
                    </button>
                    <hr className="my-2" />
                  </>
                )}

                <Link
                  to="/become-host"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Car className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Become a host
                  </span>
                </Link>

                <Link
                  to="/how-it-works"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    How Rentalosv works
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Contact support
                  </span>
                </Link>

                <Link
                  to="/legal"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Legal
                  </span>
                </Link>

                <Link
                  to="/insurance"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Insurance & protection
                  </span>
                </Link>

                <Link
                  to="/host-tools"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Host tools
                  </span>
                </Link>

                <Link
                  to="/calculator"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Calculator
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile Full-Screen Overlay */}
            <div className="md:hidden fixed inset-0 bg-white z-50">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div></div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              <div className="p-4 space-y-1">
                {!currentUser && (
                  <>
                    <button
                      className="w-full text-left block px-4 py-4 text-gray-700 hover:bg-gray-50 font-normal"
                      style={{ fontSize: "16px" }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        openLoginModal();
                      }}
                    >
                      Log in
                    </button>
                    <button
                      className="w-full text-left block px-4 py-4 text-gray-700 hover:bg-gray-50 font-normal"
                      style={{ fontSize: "16px" }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        openSignupModal();
                      }}
                    >
                      Sign up
                    </button>
                    <hr className="my-2" />
                  </>
                )}

                <Link
                  to="/become-host"
                  className="flex items-center px-4 py-4 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Car className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Become a host
                  </span>
                </Link>

                <Link
                  to="/how-it-works"
                  className="flex items-center px-4 py-4 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    How Rentalosv works
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center px-4 py-4 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Contact support
                  </span>
                </Link>

                <Link
                  to="/legal"
                  className="flex items-center px-4 py-4 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Legal
                  </span>
                </Link>

                <Link
                  to="/insurance"
                  className="flex items-center px-4 py-4 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Insurance & protection
                  </span>
                </Link>

                <Link
                  to="/host-tools"
                  className="flex items-center px-4 py-4 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Host tools
                  </span>
                </Link>

                <Link
                  to="/calculator"
                  className="flex items-center px-4 py-4 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  <span className="font-normal" style={{ fontSize: "16px" }}>
                    Calculator
                  </span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

      {/* Signup Modal */}
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </nav>
  );
};

export default Navbar;
