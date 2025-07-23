import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { ChevronDown } from "lucide-react";

const ChangePhone = () => {
  const navigate = useNavigate();
  const { currentUser, updateUserProfile } = useAuth();
  const { addNotification } = useApp();
  
  const [formData, setFormData] = useState({
    countryCode: "United Kingdom",
    phoneNumber: "",
    allowUpdates: true
  });
  
  const [loading, setLoading] = useState(false);

  const countryOptions = [
    { code: "+44", name: "United Kingdom" },
    { code: "+1", name: "United States" },
    { code: "+33", name: "France" },
    { code: "+49", name: "Germany" },
    { code: "+34", name: "Spain" },
    { code: "+39", name: "Italy" },
    { code: "+31", name: "Netherlands" },
    { code: "+32", name: "Belgium" },
  ];

  const selectedCountry = countryOptions.find(c => c.name === formData.countryCode) || countryOptions[0];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.phoneNumber.trim()) {
      addNotification({
        type: "error",
        title: "Invalid Phone Number",
        message: "Please enter a valid phone number."
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate sending verification code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addNotification({
        type: "success",
        title: "Verification Code Sent",
        message: "A verification code has been sent to your phone number."
      });
      
      // In a real app, this would navigate to a verification code page
      navigate("/settings");
    } catch (error) {
      addNotification({
        type: "error",
        title: "Failed to Send Code",
        message: "Failed to send verification code. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#003552' }}>
            Enter mobile phone
          </h1>
          <p className="text-gray-600">
            We'll send you a text message with a code to verify your number. We'll only share your number with your host or guest after you've booked a trip.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          {/* Country Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country code
            </label>
            <div className="relative">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent appearance-none"
                style={{ focusRingColor: '#003552' }}
              >
                {countryOptions.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone number
            </label>
            <div className="flex">
              <div className="flex-shrink-0 px-3 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-700">
                {selectedCountry.code}
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder=""
                required
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#003552' }}
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="allowUpdates"
              name="allowUpdates"
              checked={formData.allowUpdates}
              onChange={handleInputChange}
              className="h-4 w-4 mt-0.5 rounded border-gray-300 focus:ring-2"
              style={{ accentColor: '#003552' }}
            />
            <label htmlFor="allowUpdates" className="ml-3 text-sm text-gray-700">
              Get important trip updates via text message.
            </label>
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
              {loading ? "Sending..." : "Send code"}
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

export default ChangePhone;
