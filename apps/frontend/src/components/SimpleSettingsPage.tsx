import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Eye,
  EyeOff,
  Moon,
  Sun
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { toggleTheme } from '../store/slices/themeSlice';
import { useUserProfile, useAuth } from '../hooks/useUserData';

const SimpleSettingsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useUserProfile();
  const { logout } = useAuth();
  const { isDark } = useSelector((state: RootState) => state.theme);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Profile Information</h3>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 space-y-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Full Name
              </label>
              <input
                type="text"
                defaultValue={profile?.name || ''}
                className={`w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Email
              </label>
              <input
                type="email"
                defaultValue={profile?.email || ''}
                className={`w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg`}
              />
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Notification Preferences</h3>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Email Notifications</h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Receive updates via email</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Push Notifications</h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Receive browser notifications</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Marketing Emails</h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Receive promotional content</p>
            </div>
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Appearance</h3>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Theme</h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Choose your preferred theme</p>
            </div>
            <button
              onClick={handleThemeToggle}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
            >
              {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Privacy & Security</h3>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 space-y-4`}>
          <div>
            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Change Password</h4>
            <div className="space-y-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Current password"
                className={`w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg`}
              />
              <input
                type="password"
                placeholder="New password"
                className={`w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showPassword ? 'Hide' : 'Show'} current password</span>
              </button>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'privacy':
        return renderPrivacySettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-blue-600" />
              <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? (isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700')
                        : (isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleSettingsPage;
