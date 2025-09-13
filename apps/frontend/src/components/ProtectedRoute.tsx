import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: 'user' | 'lawyer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userType }) => {
  const { isAuthenticated, userType: authUserType } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to={`/signin/${userType || 'user'}`} state={{ from: location }} replace />;
  }

  if (userType && authUserType !== userType) {
    // Redirect to appropriate dashboard if user type doesn't match
    const redirectPath = authUserType === 'lawyer' ? '/dashboard' : '/userDashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
