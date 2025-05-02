// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import ResearcherDashboard from './pages/ResearcherDashboard';
import PublicProfile from './pages/PublicProfile';
import AdminDashboard from './pages/AdminDashboard';
import DocumentUpload from './pages/DocumentUpload';
import NotFound from './pages/Not';

// Import components
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

// Theme setup
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <Layout>
              <Navigate to="/dashboard" replace />
            </Layout>
          } />

          <Route path="/researchers" element={
            <Layout>
              <PublicProfile />
            </Layout>
          } />

          {/* Protected routes */}
          <Route path="/dashboard" element={
        
              <Layout>
                <ResearcherDashboard />
              </Layout>
          } />

          <Route path="/upload" element={
              <Layout>
                <DocumentUpload />
              </Layout>
          } />

          <Route path="/admin" element={
          
              <Layout>
                <AdminDashboard />
              </Layout>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
