import React, { useState } from 'react';
import { Menu, BookOpen, Users, User, LogOut, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownItems = [
    { icon: BookOpen, label: "Books", color: "text-blue-500" },
    { icon: Users, label: "Lawyer Meeting", color: "text-green-500" },
    { icon: User, label: "Update Profile", color: "text-purple-500" },
    { icon: LogOut, label: "Logout", color: "text-red-500" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Legal Assistance</h1>
            <p className="text-sm text-gray-500">Your AI-powered legal companion</p>
          </div>
        </div>

        {/* Right side */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">John Doe</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-900">John Doe</div>
                <div className="text-xs text-gray-500">john.doe@email.com</div>
              </div>
              
              {dropdownItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Icon size={16} className={item.color} />
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
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