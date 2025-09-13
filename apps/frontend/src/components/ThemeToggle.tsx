import React, { useState } from 'react';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme, setProUser } from '../store/slices/themeSlice';
import type { RootState } from '../store';

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTheme, isDark, isProUser } = useAppSelector((state: RootState) => state.theme);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    dispatch(setTheme(theme));
    setShowDropdown(false);
  };

  const handleProUpgrade = () => {
    dispatch(setProUser(true));
    // Here you would typically redirect to payment page
    window.location.href = '/upgrade';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
          isDark
            ? 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 shadow-lg shadow-slate-900/20'
            : 'bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 shadow-lg shadow-gray-900/10'
        } border ${isDark ? 'border-slate-600' : 'border-gray-200'}`}
        title={`Current theme: ${currentTheme}`}
      >
        <div className="flex items-center space-x-2">
          {currentTheme === 'light' ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : currentTheme === 'dark' ? (
            <Moon className="w-5 h-5 text-indigo-400" />
          ) : (
            <Monitor className="w-5 h-5 text-slate-500" />
          )}
          {isProUser && <Palette className="w-4 h-4 text-purple-500" />}
        </div>
      </button>

      {/* Enhanced Theme dropdown */}
      {showDropdown && (
        <div className={`absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl border backdrop-blur-lg z-50 ${
          isDark
            ? 'bg-slate-800/95 border-slate-600 shadow-slate-900/50'
            : 'bg-white/95 border-gray-200 shadow-gray-900/20'
        }`}>
          <div className="p-4">
            <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
              Theme Settings
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={() => handleThemeChange('light')}
                className={`w-full px-4 py-3 text-left flex items-center space-x-3 rounded-xl transition-all duration-200 ${
                  currentTheme === 'light'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : isDark
                    ? 'hover:bg-slate-700 text-slate-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Sun className="w-5 h-5" />
                <div>
                  <div className="font-medium">Light Mode</div>
                  <div className="text-xs opacity-75">Bright and clean</div>
                </div>
              </button>
              
              <button
                onClick={() => handleThemeChange('dark')}
                className={`w-full px-4 py-3 text-left flex items-center space-x-3 rounded-xl transition-all duration-200 ${
                  currentTheme === 'dark'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : isDark
                    ? 'hover:bg-slate-700 text-slate-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Moon className="w-5 h-5" />
                <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-xs opacity-75">Easy on the eyes</div>
                </div>
              </button>
              
              <button
                onClick={() => handleThemeChange('system')}
                className={`w-full px-4 py-3 text-left flex items-center space-x-3 rounded-xl transition-all duration-200 ${
                  currentTheme === 'system'
                    ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg'
                    : isDark
                    ? 'hover:bg-slate-700 text-slate-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Monitor className="w-5 h-5" />
                <div>
                  <div className="font-medium">System</div>
                  <div className="text-xs opacity-75">Follow system preference</div>
                </div>
              </button>
            </div>

            {!isProUser && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                <button
                  onClick={handleProUpgrade}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Palette className="w-4 h-4" />
                    <span>Upgrade to Pro</span>
                  </div>
                  <div className="text-xs opacity-90 mt-1">Unlock premium themes</div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Backdrop */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default ThemeToggle;
