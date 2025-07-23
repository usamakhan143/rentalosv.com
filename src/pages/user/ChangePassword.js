import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addNotification } = useApp();
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      addNotification({
        type: "error",
        title: "Password Mismatch",
        message: "New password and confirmation don't match."
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      addNotification({
        type: "error",
        title: "Weak Password",
        message: "Password must be at least 6 characters long."
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addNotification({
        type: "success",
        title: "Password Changed",
        message: "Your password has been successfully updated."
      });
      
      navigate("/settings");
    } catch (error) {
      addNotification({
        type: "error",
        title: "Update Failed",
        message: "Failed to change password. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    addNotification({
      type: "info",
      title: "Password Reset",
      message: "Password reset link would be sent to your email."
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#003552' }}>
            Change password
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#003552' }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.current ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm mt-2 hover:underline"
              style={{ color: '#FF7500' }}
            >
              Forgot your password?
            </button>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#003552' }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.new ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Re-enter New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Re-enter new password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#003552' }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-white rounded-md font-medium transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#003552' }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#002a40')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#003552')}
            >
              {loading ? "Changing..." : "Change password"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
