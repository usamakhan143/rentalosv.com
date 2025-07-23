import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { User, CheckCircle, Info } from "lucide-react";
import Button from "../../components/ui/Button";

const Profile = () => {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const { addNotification } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: userProfile?.firstName || '',
    lastName: userProfile?.lastName || '',
    location: userProfile?.location || '',
    about: userProfile?.about || '',
    languages: userProfile?.languages || '',
    work: userProfile?.work || '',
    school: userProfile?.school || ''
  });

  const userName = userProfile?.firstName 
    ? `${userProfile.firstName} ${userProfile.lastName?.charAt(0) || ''}${userProfile.lastName ? '.' : ''}`
    : currentUser?.displayName || 'User';

  const joinDate = userProfile?.createdAt 
    ? new Date(userProfile.createdAt.toDate ? userProfile.createdAt.toDate() : userProfile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Jul 2025';

  const handleVerifyID = () => {
    addNotification({
      type: "info",
      title: "ID Verification",
      message: "ID verification process would start here"
    });
  };

  const handleVerifyEmail = () => {
    addNotification({
      type: "info",
      title: "Email Verification",
      message: "Email verification link sent"
    });
  };

  const handleVerifyPhone = () => {
    addNotification({
      type: "info",
      title: "Phone Verification",
      message: "Phone verification process would start here"
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(currentUser.uid, editData);
      addNotification({
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been successfully updated."
      });
      setIsEditing(false);
    } catch (error) {
      addNotification({
        type: "error",
        title: "Update Failed",
        message: "Failed to update profile. Please try again."
      });
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      location: userProfile?.location || '',
      about: userProfile?.about || '',
      languages: userProfile?.languages || '',
      work: userProfile?.work || '',
      school: userProfile?.school || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start space-x-6">
            {/* Profile Picture */}
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
              {userProfile?.avatar || currentUser?.photoURL ? (
                <img
                  src={userProfile?.avatar || currentUser?.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>

            {/* Profile Info */}
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: '#003552' }}>
                {userName}
              </h1>
              <p className="text-gray-600 text-sm">
                Joined {joinDate}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white rounded-md font-medium transition-colors"
              style={{ backgroundColor: '#003552' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#002a40'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#003552'}
            >
              Edit profile
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 text-white rounded-md font-medium transition-colors"
                style={{ backgroundColor: '#003552' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#002a40'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#003552'}
              >
                Save profile
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Edit Profile Form or Regular Profile Content */}
        {isEditing ? (
          <div className="space-y-6 mb-8">
            {/* Change Profile Photo */}
            <div className="text-center">
              <button className="px-4 py-2 text-white rounded-md font-medium transition-colors mb-4"
                style={{ backgroundColor: '#003552' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#002a40'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#003552'}
              >
                Change profile photo
              </button>
              <p className="text-sm text-gray-500">
                Add a photo so other guests and hosts can know it's you
              </p>
            </div>

            {/* About Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">About Usama</h3>
              <textarea
                name="about"
                value={editData.about}
                onChange={handleInputChange}
                placeholder="Tell hosts and guests about yourself and why you're a responsible, trustworthy person. Share your favorite travel experiences, your hobbies, your dream car, or your driving experience. Feel free to include links to your LinkedIn, or Twitter profiles so they get to know you even better."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#003552' }}
              />
            </div>

            {/* Lives */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Lives</h3>
              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleInputChange}
                placeholder="London, UK"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#003552' }}
              />
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Languages</h3>
              <input
                type="text"
                name="languages"
                value={editData.languages}
                onChange={handleInputChange}
                placeholder="English, Spanish, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#003552' }}
              />
            </div>

            {/* Work */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Work</h3>
              <input
                type="text"
                name="work"
                value={editData.work}
                onChange={handleInputChange}
                placeholder="Your profession or job title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#003552' }}
              />
            </div>

            {/* School */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">School</h3>
              <input
                type="text"
                name="school"
                value={editData.school}
                onChange={handleInputChange}
                placeholder="Your school or university"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: '#003552' }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Verified Info Section */}
            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
                Verified Info
              </h2>

              <div className="space-y-4">
                {/* Approved to drive */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-900">Approved to drive</span>
                    <Info className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                  <button
                    onClick={handleVerifyID}
                    className="text-sm font-medium"
                    style={{ color: '#FF7500' }}
                  >
                    Verify ID
                  </button>
                </div>

                {/* Email address */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-900">Email address</span>
                  </div>
                  <button
                    onClick={handleVerifyEmail}
                    className="text-sm font-medium"
                    style={{ color: '#FF7500' }}
                  >
                    Verify email
                  </button>
                </div>

                {/* Phone number */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-900">Phone number</span>
                  </div>
                  <button
                    onClick={handleVerifyPhone}
                    className="text-sm font-medium"
                    style={{ color: '#FF7500' }}
                  >
                    Verify phone number
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Build trust with other users on Rentalosv by verifying your contact information.
              </p>
            </div>
          </>
        )}

        {/* Reviews Section - Only show when not editing */}
        {!isEditing && (
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
                  Reviews from hosts
                </h2>

                {/* No reviews state */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">No reviews yet</h3>
                    <p className="text-gray-600 text-sm">
                      {userName.split(' ')[0]} hasn't received a review on Rentalosv yet.
                    </p>
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

export default Profile;
