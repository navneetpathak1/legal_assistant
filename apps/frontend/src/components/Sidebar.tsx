import React from 'react';
import { Plus, MessageSquare, History, Scale, Users, FileText, Crown } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onNavigate }) => {
  const chats = [
    { id: 1, title: "Contract Review Discussion", time: "2 hours ago" },
    { id: 2, title: "Employment Law Query", time: "Yesterday" },
    { id: 3, title: "Personal Injury Case", time: "2 days ago" },
    { id: 4, title: "Property Law Consultation", time: "3 days ago" },
    { id: 5, title: "Business Formation Help", time: "1 week ago" },
  ];

  const navigationItems = [
    { icon: MessageSquare, label: "Chat", active: true },
    { icon: FileText, label: "Documents" },
    { icon: Users, label: "Lawyers" },
    { icon: Crown, label: "Upgrade to Pro", isPro: true },
    { icon: History, label: "History" },
  ];

  return (
    <div className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <button className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg p-3 flex items-center gap-3 transition-colors">
          <Plus size={20} />
          {!isCollapsed && <span className="font-medium">New Legal Chat</span>}
        </button>
      </div>

      {/* Navigation */}
      <div className="px-2 py-4 border-b border-gray-700">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => item.isPro ? onNavigate('payment') : onNavigate('chat')}
              className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors mb-1 ${
                item.isPro
                  ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-700 hover:to-orange-700'
                  : item.active 
                    ? 'bg-gray-700 text-blue-400' 
                    : 'hover:bg-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && (
                <span className={`font-medium ${item.isPro ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 py-3">
              Recent Conversations
            </div>
            {chats.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-800 transition-colors group mb-1"
              >
                <div className="flex items-start gap-3">
                  <Scale size={16} className="mt-1 text-blue-400 opacity-70" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-200 truncate">
                      {chat.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {chat.time}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Scale size={16} className="text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-medium text-sm">Legal Assist</div>
              <div className="text-xs text-gray-400">AI Legal Helper</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;