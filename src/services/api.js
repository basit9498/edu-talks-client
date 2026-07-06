/**
 * API Service Configuration
 * 
 * Main axios instance with interceptors, error handling, and configuration.
 * This is the base for all API calls in the application.
 * 
 * Features:
 * - Automatic token injection
 * - Request/Response interceptors
 * - Centralized error handling
 * - Request cancellation support
 * - Environment-based configuration
 */

import axios from 'axios';
import { getToken, removeToken, logout } from '../utils/auth';

/**
 * API Configuration
 * Base URL is set from environment variable or defaults to development
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

/**
 * Request timeout in milliseconds
 */
const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Create axios instance with default configuration
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor
 * Automatically adds authentication token to requests
 */
api.interceptors.request.use(
  (config) => {
    // Get token from storage
    const token = getToken();
    
    // Add token to Authorization header if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(handleError(error));
  }
);

/**
 * Response Interceptor
 * Handles responses, errors, and token refresh logic
 */
api.interceptors.response.use(
  (response) => {
    // Calculate request duration for monitoring
    if (response.config.metadata?.startTime) {
      const duration = new Date() - response.config.metadata.startTime;
      console.debug(`API Request: ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
    }

    // Return response data directly for cleaner API calls
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (!error.response) {
      return Promise.reject(handleError({
        message: 'Network error. Please check your internet connection.',
        code: 'NETWORK_ERROR',
        originalError: error,
      }));
    }

    const { status, data } = error.response;

    // Handle 401 Unauthorized - Token expired or invalid
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear invalid token
      removeToken();
      logout();

      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      return Promise.reject(handleError({
        message: 'Your session has expired. Please login again.',
        code: 'UNAUTHORIZED',
        status,
        data,
      }));
    }

    // Handle 403 Forbidden
    if (status === 403) {
      return Promise.reject(handleError({
        message: 'You do not have permission to perform this action.',
        code: 'FORBIDDEN',
        status,
        data,
      }));
    }

    // Handle 404 Not Found
    if (status === 404) {
      return Promise.reject(handleError({
        message: 'The requested resource was not found.',
        code: 'NOT_FOUND',
        status,
        data,
      }));
    }

    // Handle 500 Server Error
    if (status >= 500) {
      return Promise.reject(handleError({
        message: 'Server error. Please try again later.',
        code: 'SERVER_ERROR',
        status,
        data,
      }));
    }

    // Handle validation errors (422)
    if (status === 422) {
      return Promise.reject(handleError({
        message: data?.message || 'Validation error. Please check your input.',
        code: 'VALIDATION_ERROR',
        status,
        data,
        errors: data?.errors,
      }));
    }

    // Handle other errors
    return Promise.reject(handleError({
      message: data?.message || error.message || 'An unexpected error occurred.',
      code: 'UNKNOWN_ERROR',
      status,
      data,
      originalError: error,
    }));
  }
);

/**
 * Error Handler
 * Standardizes error format across the application
 * 
 * @param {Object} error - Error object
 * @returns {Object} Formatted error object
 */
const handleError = (error) => {
  const formattedError = {
    message: error.message || 'An unexpected error occurred',
    code: error.code || 'UNKNOWN_ERROR',
    status: error.status || null,
    data: error.data || null,
    errors: error.errors || null,
    timestamp: new Date().toISOString(),
  };

  // Log error in development
  if (import.meta.env.DEV) {
    console.error('API Error:', formattedError);
  }

  return formattedError;
};

/**
 * Create a cancel token source for request cancellation
 * 
 * @returns {Object} Cancel token source
 */
export const createCancelToken = () => {
  return axios.CancelToken.source();
};

/**
 * Check if error is a cancellation
 * 
 * @param {Error} error - Error to check
 * @returns {boolean} True if error is a cancellation
 */
export const isCancel = (error) => {
  return axios.isCancel(error);
};

/**
 * Set authentication token
 * 
 * @param {string} token - Authentication token
 */
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * Remove authentication token
 */
export const removeAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

/**
 * Get API base URL
 * 
 * @returns {string} API base URL
 */
export const getApiBaseUrl = () => {
  return API_BASE_URL;
};

// Export the configured axios instance
export default api;

