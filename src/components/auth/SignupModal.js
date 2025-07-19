import React, { useState } from "react";
import { X, Eye, EyeOff, Mail } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { useLoginModal } from "../../contexts/LoginModalContext";

const SignupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "renter",
    agreeToTerms: false,
    promotionalEmails: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const { signup, signInWithGoogle } = useAuth();
  const { addNotification } = useApp();
  const { openLoginModal } = useLoginModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.agreeToTerms) {
      addNotification({
        type: "error",
        title: "Terms Required",
        message: "Please agree to the terms of service and privacy policy",
      });
      setLoading(false);
      return;
    }

    try {
      await signup(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.role,
      );
      addNotification({
        type: "success",
        title: "Welcome!",
        message: "Your account has been created successfully.",
      });
      onClose();
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "renter",
        agreeToTerms: false,
        promotionalEmails: false,
      });
      setShowEmailForm(false);
    } catch (error) {
      addNotification({
        type: "error",
        title: "Sign up failed",
        message: error.message || "Failed to create account",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      addNotification({
        type: "success",
        title: "Welcome!",
        message: "You have successfully signed up with Google.",
      });
      onClose();
      setShowEmailForm(false);
    } catch (error) {
      addNotification({
        type: "error",
        title: "Sign up failed",
        message: error.message || "Failed to sign up with Google",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          {/* Modal content */}
          <div className="bg-white px-6 pt-6 pb-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {showEmailForm ? "Sign up" : "Welcome to Rentalosv"}
              </h3>
              <button
                onClick={() => {
                  onClose();
                  setShowEmailForm(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!showEmailForm ? (
              // Initial signup view
              <>
                {/* Subtitle */}
                <p className="text-gray-600 mb-6 text-center">
                  Create an account to get started
                </p>

                {/* Social login buttons */}
                <div className="space-y-3 mb-6">
                  {/* Apple Sign Up */}
                  <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                    </svg>
                    <span style={{ color: "#003552" }}>
                      Continue with Apple
                    </span>
                  </button>

                  {/* Google Sign Up */}
                  <button
                    onClick={handleGoogleSignUp}
                    disabled={loading}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span style={{ color: "#003552" }}>
                      Continue with Google
                    </span>
                  </button>

                  {/* Continue with email button */}
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2 text-gray-400" />
                    <span style={{ color: "#003552" }}>
                      Continue with email
                    </span>
                  </button>
                </div>

                {/* Sign in link */}
                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        onClose();
                        setShowEmailForm(false);
                        openLoginModal();
                      }}
                      className="font-medium hover:underline"
                      style={{ color: "#FF7500" }}
                    >
                      Log in
                    </button>
                  </span>
                </div>

                {/* Terms */}
                <div className="mt-4">
                  <p className="text-xs text-gray-500 text-center">
                    By logging in, you agree to Rentalosv Inc's{" "}
                    <a
                      href="#"
                      className="underline"
                      style={{ color: "#FF7500" }}
                    >
                      terms of service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="underline"
                      style={{ color: "#FF7500" }}
                    >
                      privacy policy
                    </a>
                  </p>
                </div>
              </>
            ) : (
              // Email signup form view
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ color: "#003552" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ color: "#003552" }}
                    />
                  </div>
                </div>

                {/* Note */}
                <p className="text-xs text-gray-500">
                  Enter your name as it appears on your driver's license
                </p>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ color: "#003552" }}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ color: "#003552" }}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      style={{ accentColor: "#FF7500" }}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="underline"
                        style={{ color: "#FF7500" }}
                      >
                        terms of service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="underline"
                        style={{ color: "#FF7500" }}
                      >
                        privacy policy
                      </a>
                      .
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="promotionalEmails"
                      checked={formData.promotionalEmails}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      style={{ accentColor: "#FF7500" }}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Send me promotions and announcements via email
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-md text-white font-medium transition-colors disabled:opacity-50"
                  style={{ backgroundColor: "#FF7500" }}
                  onMouseEnter={(e) =>
                    !loading && (e.target.style.backgroundColor = "#e66a00")
                  }
                  onMouseLeave={(e) =>
                    !loading && (e.target.style.backgroundColor = "#FF7500")
                  }
                >
                  {loading ? "Creating account..." : "Sign up"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
