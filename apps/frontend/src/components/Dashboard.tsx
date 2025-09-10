import React, { useState } from 'react';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import ChatArea from './ChatArea.tsx';
import PaymentPage from './PaymentPage.tsx';

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('chat');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'payment':
        return <PaymentPage onBack={() => setCurrentPage('chat')} />;
      case 'chat':
      default:
        return (
          <div className="flex-1 flex flex-col">
            <Header onToggleSidebar={toggleSidebar} />
            <ChatArea />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {currentPage === 'chat' && <Sidebar isCollapsed={isSidebarCollapsed} onNavigate={handleNavigate} />}
      {currentPage === 'chat' ? renderCurrentPage() : <PaymentPage onBack={() => setCurrentPage('chat')} />}
    </div>
  );
};

export default Dashboard;