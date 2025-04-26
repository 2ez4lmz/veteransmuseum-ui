import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authUtils } from '../../utils/auth';

export const ProtectedRoute = () => {
  const isAuthenticated = authUtils.isAuthenticated();
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};