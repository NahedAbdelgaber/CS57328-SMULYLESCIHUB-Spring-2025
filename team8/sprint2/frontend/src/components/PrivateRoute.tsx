import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/auth.service';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const isAuthenticated = authService.isAuthenticated();
  
  // If role is required, check if user has that role
  if (requiredRole && !authService.hasRole(requiredRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
