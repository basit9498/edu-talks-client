/**
 * Route Utilities
 * 
 * Helper functions for route management and navigation
 */

import { getRouteByPath, getRouteRoles, getRoutePermissions, isRouteProtected } from '../routes/config';

/**
 * Get route information by path
 * @param {string} path - Route path
 * @returns {Object|null} Route configuration object
 */
export const getRouteInfo = (path) => {
  return getRouteByPath(path);
};

/**
 * Check if a route requires authentication
 * @param {string} path - Route path
 * @returns {boolean} True if route is protected
 */
export const isProtectedRoute = (path) => {
  return isRouteProtected(path);
};

/**
 * Get allowed roles for a route
 * @param {string} path - Route path
 * @returns {string[]} Array of allowed roles
 */
export const getAllowedRoles = (path) => {
  return getRouteRoles(path);
};

/**
 * Get required permissions for a route
 * @param {string} path - Route path
 * @returns {string[]} Array of required permissions
 */
export const getRequiredPermissions = (path) => {
  return getRoutePermissions(path);
};

/**
 * Route path constants for easy reference
 */
export const ROUTE_PATHS = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  DISCUSSION: '/dashboard/discussion',
  WORKSHEET: '/dashboard/worksheet',
  DOCUMENTS: '/dashboard/documents',
  PAPER: '/dashboard/paper',
  SETTING: '/dashboard/setting',
  PROFILE: '/dashboard/profile',
};

