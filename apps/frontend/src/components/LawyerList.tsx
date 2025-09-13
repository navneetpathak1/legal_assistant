import React, { useEffect, useState } from 'react';
import { Clock, MapPin, Star, Phone, Mail, Calendar } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAvailableLawyers } from '../store/slices/userSlice';

interface LawyerListProps {
  onSelectLawyer?: (lawyer: any) => void;
}

const LawyerList: React.FC<LawyerListProps> = ({ onSelectLawyer }) => {
  const dispatch = useAppDispatch();
  const { availableLawyers, loading } = useAppSelector((state) => state.user);
  const [selectedLawyer, setSelectedLawyer] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAvailableLawyers());
  }, [dispatch]);

  const handleSelectLawyer = (lawyer: any) => {
    setSelectedLawyer(lawyer);
    if (onSelectLawyer) {
      onSelectLawyer(lawyer);
    }
  };

  const formatAvailability = (from: string, to: string) => {
    if (!from || !to) return 'Not specified';
    const fromDate = new Date(from);
    const toDate = new Date(to);
    return `${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}`;
  };

  const formatCharge = (charge: number) => {
    return `₹${charge / 100}`; // Convert from paise to rupees
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Available Lawyers
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with qualified legal professionals
        </p>
      </div>

      {availableLawyers.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No lawyers available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check back later for available legal professionals.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 transition-all duration-200 cursor-pointer ${
                selectedLawyer?.id === lawyer.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
              onClick={() => handleSelectLawyer(lawyer)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {lawyer.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lawyer.specialization || 'General Practice'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {lawyer.subscription === 'PREMIUM' ? 'Premium' : 'Standard'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{lawyer.country}</span>
                  </div>

                  {lawyer.phone && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{lawyer.phone}</span>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{lawyer.email}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{formatAvailability(lawyer.availableFrom, lawyer.availableTo)}</span>
                  </div>

                  {lawyer.charge && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Consultation Fee:</span>
                      <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {formatCharge(lawyer.charge)}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLawyer(lawyer);
                  }}
                >
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedLawyer && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Selected: {selectedLawyer.name}
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Ready to book a consultation with {selectedLawyer.name}?
          </p>
        </div>
      )}
    </div>
  );
};

export default LawyerList;
