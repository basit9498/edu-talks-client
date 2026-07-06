/**
 * Protected Route Component
 * 
 * Wraps routes that require authentication.
 * Supports:
 * - Basic authentication check (token in localStorage)
 * - Role-based access control (RBAC) - ready for future implementation
 * - Permission-based access control - ready for future implementation
 * 
 * Usage:
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 * 
 * For role/permission-based routes:
 * <Route element={<ProtectedRoute requiredRoles={['admin']} requiredPermissions={['dashboard:view']} />}>
 *   <Route path="/admin" element={<AdminPanel />} />
 * </Route>
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated, hasAccess } from '../utils/auth';

const ProtectedRoute = ({ 
  requiredRoles = [], 
  requiredPermissions = [],
  redirectTo = '/login' 
}) => {
  const location = useLocation();
  const authenticated = isAuthenticated();

  // If not authenticated, redirect to login
  if (!authenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role and permission access (for future implementation)
  // Currently, if roles/permissions are provided, we check them
  // In the future, you can uncomment and enhance this logic
  if (requiredRoles.length > 0 || requiredPermissions.length > 0) {
    const hasAccessToRoute = hasAccess(requiredRoles, requiredPermissions);
    
    if (!hasAccessToRoute) {
      // Redirect to unauthorized page or dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  // User is authenticated and has required access
  return <Outlet />;
};

export default ProtectedRoute;
