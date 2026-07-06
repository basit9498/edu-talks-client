/**
 * App Router Component
 * 
 * Main router configuration for the application.
 * Uses route configuration from config.js for maintainability.
 * 
 * Features:
 * - Public routes (login, register, landing page)
 * - Protected routes (dashboard and all sub-routes)
 * - Role and permission-based access (ready for future implementation)
 * - 404 handling
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { publicRoutes, protectedRoutes } from './config';
import EduTalksLanding from '../page/MainLanding';
import Login from '../page/auth/Login';
import Signup from '../page/auth/Signup';
import ForgotPassword from '../page/auth/ForgotPassword';
import VerifyEmail from '../page/auth/VerifyEmail';
import DashboardLayout from '../components/layout/dashboard/DashboardLayout';

// Component to handle route title updates
const RouteWrapper = ({ children, title }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return children;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route 
            path="/" 
            element={
              <RouteWrapper title="Home - EduTalks">
                <EduTalksLanding />
              </RouteWrapper>
            } 
          />
          <Route 
            path="/login" 
            element={
              <RouteWrapper title="Login - EduTalks">
                <Login />
              </RouteWrapper>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <RouteWrapper title="Sign Up - EduTalks">
                <Signup />
              </RouteWrapper>
            } 
          />
          <Route 
            path="/forgot-password" 
            element={
              <RouteWrapper title="Forgot Password - EduTalks">
                <ForgotPassword />
              </RouteWrapper>
            } 
          />
          <Route 
            path="/verify-email" 
            element={
              <RouteWrapper title="Verify Email - EduTalks">
                <VerifyEmail />
              </RouteWrapper>
            } 
          />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {protectedRoutes.map((route) => {
            const RouteComponent = route.element;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <RouteWrapper title={route.title}>
                    <DashboardLayout>
                    <RouteComponent />
                    </DashboardLayout>
                  
                  </RouteWrapper>
                }
              />
            );
          })}
        </Route>

        {/* Fallback - Redirect to home for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
