import React, { useState } from 'react';
import { User, Crown, Edit3, Save, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useUserProfile } from '../hooks/useUserData';

const SimpleProfilePage: React.FC = () => {
  const { profile } = useUserProfile();
  const { isDark } = useSelector((state: RootState) => state.theme);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>({});

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profile || {});
  };

  const handleSave = () => {
    // TODO: Implement save logic
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({});
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getSubscriptionBadge = (subscription: string) => {
    if (subscription === 'PREMIUM') {
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </span>
      );
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
        Free
      </span>
    );
  };

  if (!profile) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? 'border-white' : 'border-gray-900'} mx-auto mb-4`}></div>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6 mb-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {profile.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {profile.name || 'User'}
                </h1>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Client Account
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  {getSubscriptionBadge(profile.subscription || 'FREE')}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className={`flex items-center space-x-2 px-4 py-2 border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-lg transition-colors`}
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6`}>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
              <User className="w-5 h-5 mr-2" />
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                  />
                ) : (
                  <p className={isDark ? 'text-white' : 'text-gray-900'}>{profile.name || 'Not provided'}</p>
                )}
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                  />
                ) : (
                  <p className={isDark ? 'text-white' : 'text-gray-900'}>{profile.email || 'Not provided'}</p>
                )}
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Country
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.country || ''}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className={`w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                  />
                ) : (
                  <p className={isDark ? 'text-white' : 'text-gray-900'}>{profile.country || 'Not provided'}</p>
                )}
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Member Since
                </label>
                <p className={isDark ? 'text-white' : 'text-gray-900'}>
                  {profile.createdAt ? formatDate(profile.createdAt) : 'Not available'}
                </p>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6`}>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Account Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Account Type</span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Client Account
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Subscription</span>
                {getSubscriptionBadge(profile.subscription || 'FREE')}
              </div>
              <div className="flex items-center justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Status</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProfilePage;
