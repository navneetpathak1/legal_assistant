import React, { useState, useRef, useEffect } from 'react';
import { 
  Scale,
  Settings,
  LogOut,
  UserCog,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Star,
  Users,
  MessageSquare,
  TrendingUp,
  Award,
  Bell,
  Search
} from 'lucide-react';

interface LawyerData {
  name: string;
  email: string;
  phone: string;
  country: string;
  specialization: string;
  availableFrom: string;
  availableTo: string;
  rating: number;
  totalCases: number;
  activeCases: number;
  completedCases: number;
  joinDate: string;
  profileImage?: string;
}

const LawyerDashboard: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Mock lawyer data - in real app this would come from API/props
  const lawyerData: LawyerData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@legalassist.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    specialization: "Corporate Law",
    availableFrom: "09:00",
    availableTo: "17:00",
    rating: 4.8,
    totalCases: 156,
    activeCases: 12,
    completedCases: 144,
    joinDate: "January 2022"
  };

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    // Handle logout logic here
  };

  const handleUpdateProfile = () => {
    console.log('Opening profile update...');
    // Handle profile update logic here
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color }: {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
  }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">LegalAssist</h1>
                  <p className="text-sm text-gray-500">Lawyer Dashboard</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cases, clients..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings Dropdown */}
              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Settings className="w-6 h-6" />
                </button>

                {showSettings && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={handleUpdateProfile}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                    >
                      <UserCog className="w-4 h-4" />
                      <span>Update Profile</span>
                    </button>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {lawyerData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {lawyerData.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Here's what's happening with your legal practice today.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{lawyerData.rating}</span>
                      <span className="text-gray-500">rating</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-500">Member since {lawyerData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Briefcase}
            title="Total Cases"
            value={lawyerData.totalCases}
            subtitle="All time"
            color="bg-blue-500"
          />
          <StatCard
            icon={Clock}
            title="Active Cases"
            value={lawyerData.activeCases}
            subtitle="In progress"
            color="bg-green-500"
          />
          <StatCard
            icon={Award}
            title="Completed Cases"
            value={lawyerData.completedCases}
            subtitle="Successfully closed"
            color="bg-purple-500"
          />
          <StatCard
            icon={Users}
            title="Client Rating"
            value={`${lawyerData.rating}/5`}
            subtitle="Average rating"
            color="bg-yellow-500"
          />
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <UserCog className="w-6 h-6 mr-3 text-blue-600" />
              Personal Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{lawyerData.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{lawyerData.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Country</p>
                  <p className="text-gray-900">{lawyerData.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
              Professional Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <Scale className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Specialization</p>
                  <p className="text-gray-900">{lawyerData.specialization}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Available Hours</p>
                  <p className="text-gray-900">
                    {lawyerData.availableFrom} - {lawyerData.availableTo}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="text-gray-900">{lawyerData.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { action: "New case assigned", client: "John Smith", time: "2 hours ago", type: "case" },
                { action: "Client consultation completed", client: "Maria Garcia", time: "5 hours ago", type: "consultation" },
                { action: "Document review requested", client: "Tech Corp Inc.", time: "1 day ago", type: "document" },
                { action: "Case successfully closed", client: "Sarah Wilson", time: "2 days ago", type: "success" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'case' ? 'bg-blue-500' :
                    activity.type === 'consultation' ? 'bg-green-500' :
                    activity.type === 'document' ? 'bg-yellow-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-sm">Client: {activity.client}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LawyerDashboard;