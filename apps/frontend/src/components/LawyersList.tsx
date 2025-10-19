import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Briefcase, Star, CheckCircle } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import type { RootState } from '../store/store';

interface Lawyer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  country: string;
  specialization: string | null;
  availableFrom: string | null;
  availableTo: string | null;
  subscription: string | null;
}

const LawyersList: React.FC = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useAppSelector((state: RootState) => state.theme);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin/user');
          return;
        }

        const response = await fetch('http://localhost:3003/api/v1/users/availableProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch lawyers');
        }

        const data = await response.json();
        setLawyers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [navigate]);

  const handleBookAppointment = (lawyerId: number) => {
    navigate(`/payment/${lawyerId}`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg font-medium">Loading lawyers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="text-center p-6 max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Error Loading Lawyers</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (lawyers.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="text-center p-6 max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">No Lawyers Available</h2>
          <p className="mb-4">There are currently no lawyers available. Please check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Available Lawyers</h1>
          <p className="text-lg text-gray-500">
            Connect with experienced legal professionals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lawyers.map((lawyer) => (
            <div 
              key={lawyer.id} 
              className={`rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                      {lawyer.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg">{lawyer.name}</h3>
                      <p className="text-sm text-gray-500">{lawyer.specialization || 'Legal Expert'}</p>
                    </div>
                  </div>
                  {lawyer.subscription === 'PREMIUM' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      Premium
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{lawyer.country}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{lawyer.specialization || 'General Practice'}</span>
                  </div>
                  {lawyer.availableFrom && lawyer.availableTo && (
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span>
                        {new Date(lawyer.availableFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(lawyer.availableTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleBookAppointment(lawyer.id)}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyersList;
