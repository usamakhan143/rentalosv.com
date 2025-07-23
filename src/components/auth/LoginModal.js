import React, { useState } from "react";
import { X, Eye, EyeOff, Mail } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { useSignupModal } from "../../contexts/SignupModalContext";

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const { signin, signInWithGoogle } = useAuth();
  const { addNotification } = useApp();
  const { openSignupModal } = useSignupModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signin(formData.email, formData.password);
      addNotification({
        type: "success",
        title: "Welcome back!",
        message: "You have successfully signed in.",
      });
      onClose();
      // Reset form
      setFormData({ email: "", password: "" });
      setShowEmailForm(false);
    } catch (error) {
      addNotification({
        type: "error",
        title: "Sign in failed",
        message: error.message || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      addNotification({
        type: "success",
        title: "Welcome!",
        message: "You have successfully signed in with Google.",
      });
      onClose();
      setShowEmailForm(false);
    } catch (error) {
      addNotification({
        type: "error",
        title: "Sign in failed",
        message: error.message || "Failed to sign in with Google",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
                {showEmailForm ? "Log in with email" : "Log in"}
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
              // Initial login view
              <>
                {/* Country code section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country code
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                      style={{ color: "#003552" }}
                    >
                      <option>+44 United Kingdom</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Phone number section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ color: "#003552" }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll text you a code to confirm your number
                  </p>
                </div>

                {/* Continue button */}
                <button
                  className="w-full py-3 px-4 rounded-md text-white font-medium mb-4 transition-colors"
                  style={{ backgroundColor: "#FF7500" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#e66a00")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#FF7500")
                  }
                >
                  Continue
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                {/* Continue with email button */}
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors mb-3"
                >
                  <Mail className="w-5 h-5 mr-2 text-gray-400" />
                  <span style={{ color: "#003552" }}>Continue with email</span>
                </button>

                {/* Social login buttons */}
                <div className="space-y-3">
                  {/* Apple Sign In */}
                  <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
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

                  {/* Google Sign In */}
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
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
                </div>

                {/* Sign up link */}
                <div className="mt-6 text-center">
                  <span className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => {
                        onClose();
                        setShowEmailForm(false);
                        openSignupModal();
                      }}
                      className="font-medium hover:underline"
                      style={{ color: "#FF7500" }}
                    >
                      Sign up
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
              // Email login form view
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Test Account Notice */}
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Test Account:</strong> Use email: <code>test@example.com</code> and password: <code>password123</code>
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email"
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
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Password"
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

                {/* Forgot password link */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm hover:underline"
                    style={{ color: "#FF7500" }}
                  >
                    Forgot password? Log in with passcode
                  </button>
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
                  {loading ? "Signing in..." : "Continue"}
                </button>

                {/* Cancel button */}
                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>

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
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
