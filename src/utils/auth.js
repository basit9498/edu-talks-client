/**
 * Authentication Utilities
 * 
 * Handles authentication state, token management, and user permissions
 */

// Token Management
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  removeToken();
  // Clear any other user-related data
  localStorage.removeItem('user');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userPermissions');
};

// User Data Management
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Role Management (for future RBAC implementation)
export const getUserRole = () => {
  return localStorage.getItem('userRole') || null;
};

export const setUserRole = (role) => {
  localStorage.setItem('userRole', role);
};

export const hasRole = (requiredRoles = []) => {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  const userRole = getUserRole();
  return userRole && requiredRoles.includes(userRole);
};

// Permission Management (for future permission-based access)
export const getUserPermissions = () => {
  const permissionsStr = localStorage.getItem('userPermissions');
  return permissionsStr ? JSON.parse(permissionsStr) : [];
};

export const setUserPermissions = (permissions) => {
  localStorage.setItem('userPermissions', JSON.stringify(permissions));
};

export const hasPermission = (requiredPermissions = []) => {
  if (!requiredPermissions || requiredPermissions.length === 0) return true;
  const userPermissions = getUserPermissions();
  return requiredPermissions.every((permission) => userPermissions.includes(permission));
};

// Combined access check (role and permission)
export const hasAccess = (requiredRoles = [], requiredPermissions = []) => {
  const roleCheck = hasRole(requiredRoles);
  const permissionCheck = hasPermission(requiredPermissions);
  return roleCheck && permissionCheck;
};
