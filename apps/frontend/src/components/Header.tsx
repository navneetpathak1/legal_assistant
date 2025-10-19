import React, { useState } from 'react';
import { Menu, Scale, User, LogOut, ChevronDown } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserData';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { profile } = useUserProfile();
  const { isDark } = useSelector((state: RootState) => state.theme);

  const navigate = useNavigate();

  const handleAction = (action: string) => {
    switch (action) {
      case 'profile':
        onNavigate('profile');
        break;
      case 'lawyers':
        navigate('/lawyers');
        break;
      case 'logout':
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/');
        break;
      default:
        break;
    }
    setIsDropdownOpen(false);
  };

  const dropdownItems = [
    { icon: User, label: "Profile", action: "profile", color: "text-purple-500" },
    { icon: Scale, label: "Find Lawyers", action: "lawyers", color: "text-blue-500" },
    { icon: LogOut, label: "Logout", action: "logout", color: "text-red-500" },
  ];

  const handleItemClick = (action: string) => {
    handleAction(action);
  };

  return (
    <header className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className={`p-2 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
          >
            <Menu size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
          </button>
          <div>
            <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal Assistance</h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Your AI-powered legal companion</p>
          </div>
        </div>

        {/* Right side */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 p-2 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
          >
            <div className={`w-8 h-8 ${profile?.subscription === 'PREMIUM' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'} rounded-full flex items-center justify-center`}>
              <User size={16} className="text-white" />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{profile?.name || 'User'}</span>
            <ChevronDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-56 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border py-2 z-50`}>
              <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{profile?.name || 'User'}</div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{profile?.email || 'user@email.com'}</div>
              </div>
              
              {dropdownItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    className={`w-full px-4 py-3 text-left ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} flex items-center gap-3 transition-colors`}
                    onClick={() => handleItemClick(item.action)}
                  >
                    <Icon size={16} className={item.color} />
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;