import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthRoute() {
  const identifier = localStorage.getItem('identifier');
  return identifier ? <Outlet /> : <Navigate to="/login" />;
}