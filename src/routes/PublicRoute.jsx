/**
 * Public Route Component
 * 
 * Wraps routes that should only be accessible when NOT authenticated.
 * Redirects authenticated users to dashboard.
 * 
 * Usage:
 * <Route element={<PublicRoute />}>
 *   <Route path="/login" element={<Login />} />
 *   <Route path="/register" element={<Register />} />
 * </Route>
 */

import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PublicRoute = ({ redirectTo = '/dashboard' }) => {
  const authenticated = isAuthenticated();

  // If authenticated, redirect to dashboard
  if (authenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // User is not authenticated, allow access
  return <Outlet />;
};

export default PublicRoute;
