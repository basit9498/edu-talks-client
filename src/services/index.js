/**
 * Services Index
 * 
 * Central export point for all API services.
 * This allows for clean imports across the application.
 * 
 * Usage:
 * import { authService, userService } from '@/services';
 * import api from '@/services/api';
 */

// Main API instance
export { default as api, createCancelToken, isCancel, setAuthToken, removeAuthToken, getApiBaseUrl } from './api';

// Authentication service
export { default as authService } from './auth';
export * from './auth';

// User service
export { default as userService } from './user';
export * from './user';

// Future services can be added here:
// export { default as discussionService } from './discussion';
// export { default as worksheetService } from './worksheet';
// export { default as documentService } from './document';
// export { default as paperService } from './paper';

