import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
interface ProtectedRouteProps {
  children?: React.ReactNode;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children
}) => {
  const {
    isAuthenticated,
    isLoading
  } = useAuth();
  const location = useLocation();
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E88E5]"></div>
      </div>;
  }
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{
      from: location
    }} replace />;
  }
  // Render children or outlet
  return children ? <>{children}</> : <Outlet />;
};