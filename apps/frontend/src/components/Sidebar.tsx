import React from 'react';
import { Plus, MessageSquare, User, Crown, Sun, Moon, LogOut, Trash2 } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserData';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { setCurrentConversation } from '../store/slices/userSlice';
import { toggleTheme } from '../store/slices/themeSlice';

interface SidebarProps {
  isCollapsed: boolean;
  onNavigate: (page: string) => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onNavigate, onNewChat }) => {
  const { profile, conversations, loading } = useUserProfile();
  const dispatch = useDispatch<AppDispatch>();
  const { isDark } = useSelector((state: RootState) => state.theme);
  const { currentConversation } = useSelector((state: RootState) => state.user);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  const handleConversationSelect = (conversation: any) => {
    dispatch(setCurrentConversation(conversation));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`${isDark ? 'bg-gray-900' : 'bg-white border-r border-gray-200'} text-${isDark ? 'white' : 'gray-900'} h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'}`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <button 
          onClick={onNewChat}
          className={`w-full ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg p-3 flex items-center gap-3 transition-colors font-medium`}
        >
          <Plus size={20} />
          {!isCollapsed && <span>New Legal Chat</span>}
        </button>
      </div>

      {/* User Profile Section */}
      {!isCollapsed && profile && (
        <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${profile.subscription === 'PREMIUM' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'} rounded-full flex items-center justify-center`}>
              {profile.subscription === 'PREMIUM' ? (
                <Crown size={20} className="text-white" />
              ) : (
                <User size={20} className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                {profile.name}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}>
                {profile.subscription === 'PREMIUM' && <Crown size={12} className="text-yellow-500" />}
                {profile.subscription} • {profile.country}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="p-2">
            <div className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider px-2 py-3 flex items-center justify-between`}>
              Recent Conversations
              {conversations.length > 0 && (
                <span className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} px-2 py-1 rounded-full text-xs`}>
                  {conversations.length}
                </span>
              )}
            </div>
            
            {loading ? (
              <div className="px-2 py-4">
                <div className={`animate-pulse ${isDark ? 'bg-gray-800' : 'bg-gray-200'} h-4 rounded mb-2`}></div>
                <div className={`animate-pulse ${isDark ? 'bg-gray-800' : 'bg-gray-200'} h-4 rounded w-3/4 mb-2`}></div>
                <div className={`animate-pulse ${isDark ? 'bg-gray-800' : 'bg-gray-200'} h-4 rounded w-1/2`}></div>
              </div>
            ) : conversations.length > 0 ? (
              conversations.slice(0, 10).map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation)}
                  className={`w-full text-left p-3 rounded-lg ${
                    currentConversation?.id === conversation.id 
                      ? (isDark ? 'bg-blue-900/20 border-l-2 border-blue-500' : 'bg-blue-50 border-l-2 border-blue-500')
                      : (isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100')
                  } transition-colors group mb-1`}
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare size={16} className={`mt-1 ${isDark ? 'text-blue-400' : 'text-blue-500'} opacity-70`} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} truncate`}>
                        {conversation.title}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mt-1 flex items-center justify-between`}>
                        <span>{formatTimeAgo(conversation.createdAt)}</span>
                        {conversation.chats && (
                          <span className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} px-2 py-0.5 rounded-full text-xs`}>
                            {conversation.chats.length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <MessageSquare size={32} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No conversations yet</p>
                <p className="text-xs mt-1">Click "New Legal Chat" to begin</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        {!isCollapsed && (
          <div className="space-y-2">
            <button
              onClick={handleThemeToggle}
              className={`w-full flex items-center gap-3 p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
            >
              {isDark ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-gray-600" />}
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
            <button
              onClick={() => onNavigate('logout')}
              className={`w-full flex items-center gap-3 p-2 rounded-lg ${isDark ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-600'} transition-colors`}
            >
              <LogOut size={16} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        )}
        
        {isCollapsed && (
          <div className="space-y-2">
            <button
              onClick={handleThemeToggle}
              className={`w-full flex items-center justify-center p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
            >
              {isDark ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-gray-600" />}
            </button>
            <button
              onClick={() => onNavigate('logout')}
              className={`w-full flex items-center justify-center p-2 rounded-lg ${isDark ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-600'} transition-colors`}
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;