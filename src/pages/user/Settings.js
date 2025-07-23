import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { ChevronRight, X } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const { addNotification } = useApp();

  const [formData, setFormData] = useState({
    email: currentUser?.email || "",
    mobileNotifications: true,
    emailNotifications: true,
    transmissionExpert: "no",
    travelCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        email: userProfile.email || currentUser?.email || "",
        mobileNotifications: userProfile.mobileNotifications ?? true,
        emailNotifications: userProfile.emailNotifications ?? true,
        transmissionExpert: userProfile.transmissionExpert || "no",
      }));
    }
  }, [userProfile, currentUser]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await updateUserProfile(currentUser.uid, {
        mobileNotifications: formData.mobileNotifications,
        emailNotifications: formData.emailNotifications,
      });
      
      addNotification({
        type: "success",
        title: "Settings updated",
        message: "Your account settings have been saved.",
      });
    } catch (error) {
      addNotification({
        type: "error",
        title: "Update failed",
        message: "Failed to update settings. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTransmission = async () => {
    setLoading(true);
    try {
      await updateUserProfile(currentUser.uid, {
        transmissionExpert: formData.transmissionExpert,
      });
      
      addNotification({
        type: "success",
        title: "Transmission preference saved",
        message: "Your driving expertise has been updated.",
      });
    } catch (error) {
      addNotification({
        type: "error",
        title: "Update failed",
        message: "Failed to update transmission preference.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyTravelCode = () => {
    if (!formData.travelCode.trim()) {
      addNotification({
        type: "error",
        title: "Invalid code",
        message: "Please enter a valid travel code.",
      });
      return;
    }

    addNotification({
      type: "success",
      title: "Travel code applied",
      message: "Your travel credit has been applied to your account.",
    });
    setFormData(prev => ({ ...prev, travelCode: "" }));
  };

  const handleResendVerification = () => {
    addNotification({
      type: "info",
      title: "Verification email sent",
      message: "A verification link has been sent to your email address.",
    });
  };

  const handleDownloadData = () => {
    addNotification({
      type: "info",
      title: "Download started",
      message: "Your account data download will begin shortly.",
    });
  };

  const handleCloseAccount = () => {
    setShowCloseModal(true);
  };

  const handleConfirmClose = () => {
    addNotification({
      type: "warning",
      title: "Account closure",
      message: "Account closure process would be initiated.",
    });
    setShowCloseModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#003552' }}>
            Account
          </h1>
        </div>

        <div className="space-y-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#003552' }}>
              Contact information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="flex items-center justify-between">
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  />
                  <button
                    onClick={handleResendVerification}
                    className="ml-4 text-sm font-medium"
                    style={{ color: '#FF7500' }}
                  >
                    Resend verification link
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-900">Link to your Google account</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">PASSWORD</h3>
            <button
              onClick={() => navigate('/change-password')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Update
            </button>
          </div>

          {/* Mobile Phone */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">MOBILE PHONE</h3>
            <button
              onClick={() => navigate('/change-phone')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Update
            </button>
          </div>

          {/* Mobile Notifications */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">MOBILE NOTIFICATIONS</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="mobileNotifications"
                  checked={formData.mobileNotifications}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                  style={{ accentColor: '#003552' }}
                />
                <span className="ml-3 text-sm text-gray-700">Enable text message notifications</span>
              </label>
            </div>
          </div>

          {/* Email Notifications */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">EMAIL NOTIFICATIONS</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                  style={{ accentColor: '#003552' }}
                />
                <span className="ml-3 text-sm text-gray-700">Promotions and announcements</span>
              </label>
            </div>
          </div>

          {/* Save Changes Button */}
          <div>
            <button
              onClick={handleSaveChanges}
              disabled={loading}
              className="px-6 py-2 text-white rounded-md font-medium transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#003552' }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#002a40')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#003552')}
            >
              Save changes
            </button>
          </div>

          {/* Transmission */}
          <div>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#003552' }}>
              Transmission
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Some cars on Rentalosv do not have automatic transmissions. Are you an expert at driving manual transmissions?
            </p>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transmissionExpert"
                  value="yes"
                  checked={formData.transmissionExpert === "yes"}
                  onChange={handleInputChange}
                  className="h-4 w-4 border-gray-300 focus:ring-2"
                  style={{ accentColor: '#003552' }}
                />
                <span className="ml-3 text-sm text-gray-700">Yes, I am an expert</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transmissionExpert"
                  value="no"
                  checked={formData.transmissionExpert === "no"}
                  onChange={handleInputChange}
                  className="h-4 w-4 border-gray-300 focus:ring-2"
                  style={{ accentColor: '#003552' }}
                />
                <span className="ml-3 text-sm text-gray-700">No, I am not an expert</span>
              </label>
            </div>
          </div>

          {/* Save Transmission Button */}
          <div>
            <button
              onClick={handleSaveTransmission}
              disabled={loading}
              className="px-6 py-2 text-white rounded-md font-medium transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#003552' }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#002a40')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#003552')}
            >
              Save changes
            </button>
          </div>

          {/* Approval Status */}
          <div>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#003552' }}>
              Approval status
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Before you can drive a Rentalosv car, we need a bit more information.
            </p>
            <button
              className="text-sm font-medium"
              style={{ color: '#FF7500' }}
            >
              Get approved to drive
            </button>
          </div>

          {/* Travel Credit */}
          <div>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#003552' }}>
              Travel credit
            </h2>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">TRAVEL CREDIT CODE</h3>
              <p className="text-sm text-gray-600 mb-3">
                Travel credit will automatically apply towards your next trip. Promo codes must be entered at checkout.
              </p>
              <div className="flex space-x-3">
                <input
                  type="text"
                  name="travelCode"
                  value={formData.travelCode}
                  onChange={handleInputChange}
                  placeholder="Code here"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleApplyTravelCode}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <strong>Balance: $0</strong>
            </div>
          </div>

          {/* Download Account Data */}
          <div>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#003552' }}>
              Download account data
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              You can download a copy of all information Rentalosv has accumulated throughout your time as a Rentalosv user. You may download your data as often as you'd like.
            </p>
            <button
              onClick={handleDownloadData}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Download my data
            </button>
          </div>

          {/* Close Account */}
          <div>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#003552' }}>
              Close account
            </h2>
            <button
              onClick={handleCloseAccount}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close my account
            </button>
          </div>
        </div>

        {/* Close Account Modal */}
        {showCloseModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setShowCloseModal(false)}
              ></div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-6 pt-6 pb-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold" style={{ color: '#003552' }}>
                      Closing your account?
                    </h3>
                    <button
                      onClick={() => setShowCloseModal(false)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">What that means</h4>
                    <p className="text-gray-600 mb-4">
                      We hate to see you go. Are you sure you want to close your Rentalosv account? Please be advised if you choose to proceed, your account closure will be irreversible.
                    </p>

                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        You will no longer be able to book trips or list your car on Rentalosv.
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Your vehicle listing(s) will be deleted.
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Any information associated with your account will not be publicly viewable on our website and apps.
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Any booked or pending trips will be cancelled immediately.
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Currently, you have 0 booked and/or pending trips.
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        You will no longer be able to login to your account.
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        You are still financially responsible for any fees, claims, or reimbursements related to your past or pending trips.
                      </li>
                    </ul>

                    <p className="text-gray-600 mt-4 font-medium">
                      Do you want to continue?
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={handleConfirmClose}
                      className="flex-1 px-4 py-2 text-white rounded-md font-medium transition-colors"
                      style={{ backgroundColor: '#003552' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#002a40'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#003552'}
                    >
                      Continue
                    </button>
                    <button
                      onClick={() => setShowCloseModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
