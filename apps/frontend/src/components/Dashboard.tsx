import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { initializeTheme } from '../store/slices/themeSlice';
import { setCurrentConversation } from '../store/slices/userSlice';
import { useUserProfile, useAuth } from '../hooks/useUserData';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import ChatArea from './ChatArea.tsx';
import PaymentPage from './PaymentPage.tsx';
import SimpleProfilePage from './SimpleProfilePage.tsx';
import LawyerList from './LawyerList.tsx';

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('chat');
  
  const dispatch = useDispatch<AppDispatch>();
  const { isDark } = useSelector((state: RootState) => state.theme);
  const { profile, loading } = useUserProfile();
  const { logout } = useAuth();

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNavigate = (page: string) => {
    if (page === 'logout') {
      logout();
      window.location.href = '/';
      return;
    }
    setCurrentPage(page);
  };

  const handleNewChat = () => {
    dispatch(setCurrentConversation(null));
    setCurrentPage('chat');
  };

  const renderCurrentPage = () => {
    if (loading) {
      return (
        <div className={`flex-1 flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? 'border-white' : 'border-gray-900'} mx-auto mb-4`}></div>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Loading your profile...</p>
          </div>
        </div>
      );
    }

    if (!profile) {
      return (
        <div className={`flex-1 flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="text-center">
            <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Please log in to continue</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'profile':
        return (
          <div className="flex-1 flex flex-col">
            <Header onToggleSidebar={toggleSidebar} onNavigate={handleNavigate} />
            <SimpleProfilePage />
          </div>
        );
      case 'lawyers':
        return (
          <div className="flex-1 flex flex-col">
            <Header onToggleSidebar={toggleSidebar} onNavigate={handleNavigate} />
            <LawyerList />
          </div>
        );
      case 'payment':
        return <PaymentPage onBack={() => setCurrentPage('chat')} />;
      case 'chat':
      default:
        return (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <Header onToggleSidebar={toggleSidebar} onNavigate={handleNavigate} />
            <ChatArea />
          </div>
        );
    }
  };

  return (
    <div className={`flex h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} overflow-hidden`}>
      {currentPage !== 'payment' && (
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onNavigate={handleNavigate}
          onNewChat={handleNewChat}
        />
      )}
      {renderCurrentPage()}
    </div>
  );
};

export default Dashboard;