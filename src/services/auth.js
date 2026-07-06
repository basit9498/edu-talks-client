/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls:
 * - User login
 * - User registration
 * - Email verification
 * - Password reset
 * - Token refresh
 * 
 * All methods return promises that resolve with response data
 * or reject with standardized error objects.
 */

import api from './api';
import { setToken, setUser, setUserRole, setUserPermissions } from '../utils/auth';

/**
 * Authentication API endpoints
 */
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  // VERIFY_EMAIL: '/auth/verify-email',
  // RESEND_VERIFICATION: '/auth/resend-verification',
  // FORGOT_PASSWORD: '/auth/forgot-password',
  // RESET_PASSWORD: '/auth/reset-password',
  // REFRESH_TOKEN: '/auth/refresh-token',
  // LOGOUT: '/auth/logout',
};


export const login = async (payload) => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, payload);
    console.log(response);
    const data = response.data;
    // Store authentication data
    if (data.token) {
      setToken(data.token);
    }

    if (data.user) {
      setUser(data.user);
      
      // Store role and permissions if provided
      // if (response.user.role) {
      //   setUserRole(response.user.role);
      // }
      
      // if (response.user.permissions) {
      //   setUserPermissions(response.user.permissions);
      // }
    }

    return {
      user: response.user,
      token: response.token,
      message: response.message || 'Login successful',
    };
  } catch (error) {
    throw error;
  }
};


export const register = async (payload) => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, payload);

   return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify email with 6-digit code
 * 
 * @param {Object} verificationData - Email verification data
 * @param {string} verificationData.email - User email
 * @param {string} verificationData.code - 6-digit verification code
 * @returns {Promise<Object>} Verification response with token
 * 
 * @example
 * try {
 *   const response = await authService.verifyEmail({
 *     email: 'user@example.com',
 *     code: '123456'
 *   });
 *   console.log('Email verified:', response.user);
 * } catch (error) {
 *   console.error('Verification failed:', error.message);
 * }
 */
// export const verifyEmail = async (verificationData) => {
//   try {
//     const response = await api.post(AUTH_ENDPOINTS.VERIFY_EMAIL, {
//       email: verificationData.email,
//       verification_code: verificationData.code,
//     });

//     // Store authentication data after successful verification
//     if (response.token) {
//       setToken(response.token);
//     }

//     if (response.user) {
//       setUser(response.user);
      
//       if (response.user.role) {
//         setUserRole(response.user.role);
//       }
      
//       if (response.user.permissions) {
//         setUserPermissions(response.user.permissions);
//       }
//     }

//     return {
//       user: response.user,
//       token: response.token,
//       message: response.message || 'Email verified successfully',
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// /**
//  * Resend verification code
//  * 
//  * @param {string} email - User email
//  * @returns {Promise<Object>} Resend response
//  * 
//  * @example
//  * try {
//  *   const response = await authService.resendVerification('user@example.com');
//  *   console.log('Verification code resent:', response.message);
//  * } catch (error) {
//  *   console.error('Resend failed:', error.message);
//  * }
//  */
// export const resendVerification = async (email) => {
//   try {
//     const response = await api.post(AUTH_ENDPOINTS.RESEND_VERIFICATION, {
//       email,
//     });

//     return {
//       message: response.message || 'Verification code has been resent to your email',
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// /**
//  * Request password reset
//  * 
//  * @param {string} email - User email
//  * @returns {Promise<Object>} Password reset response
//  * 
//  * @example
//  * try {
//  *   const response = await authService.forgotPassword('user@example.com');
//  *   console.log('Reset link sent:', response.message);
//  * } catch (error) {
//  *   console.error('Request failed:', error.message);
//  * }
//  */
// export const forgotPassword = async (email) => {
//   try {
//     const response = await api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
//       email,
//     });

//     return {
//       message: response.message || 'Password reset link has been sent to your email',
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// /**
//  * Reset password with token
//  * 
//  * @param {Object} resetData - Password reset data
//  * @param {string} resetData.token - Reset token
//  * @param {string} resetData.email - User email
//  * @param {string} resetData.password - New password
//  * @param {string} resetData.passwordConfirmation - Password confirmation
//  * @returns {Promise<Object>} Reset response
//  * 
//  * @example
//  * try {
//  *   const response = await authService.resetPassword({
//  *     token: 'reset-token',
//  *     email: 'user@example.com',
//  *     password: 'newpassword123',
//  *     passwordConfirmation: 'newpassword123'
//  *   });
//  *   console.log('Password reset successful:', response.message);
//  * } catch (error) {
//  *   console.error('Reset failed:', error.message);
//  * }
//  */
// export const resetPassword = async (resetData) => {
//   try {
//     const response = await api.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
//       token: resetData.token,
//       email: resetData.email,
//       password: resetData.password,
//       password_confirmation: resetData.passwordConfirmation,
//     });

//     return {
//       message: response.message || 'Password has been reset successfully',
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// /**
//  * Refresh authentication token
//  * 
//  * @returns {Promise<Object>} New token data
//  * 
//  * @example
//  * try {
//  *   const response = await authService.refreshToken();
//  *   console.log('Token refreshed:', response.token);
//  * } catch (error) {
//  *   console.error('Token refresh failed:', error.message);
//  * }
//  */
// export const refreshToken = async () => {
//   try {
//     const response = await api.post(AUTH_ENDPOINTS.REFRESH_TOKEN);

//     if (response.token) {
//       setToken(response.token);
//     }

//     return {
//       token: response.token,
//       message: response.message || 'Token refreshed successfully',
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// /**
//  * Logout user
//  * 
//  * @returns {Promise<Object>} Logout response
//  * 
//  * @example
//  * try {
//  *   await authService.logout();
//  *   console.log('Logged out successfully');
//  * } catch (error) {
//  *   console.error('Logout failed:', error.message);
//  * }
//  */
// export const logoutUser = async () => {
//   try {
//     const response = await api.post(AUTH_ENDPOINTS.LOGOUT);
//     return {
//       message: response.message || 'Logged out successfully',
//     };
//   } catch (error) {
//     // Even if API call fails, we should still clear local data
//     throw error;
//   }
// };

// Export all auth methods as a service object
const authService = {
  login,
  register,
  // verifyEmail,
  // resendVerification,
  // forgotPassword,
  // resetPassword,
  // refreshToken,
  // logout: logoutUser,
};

export default authService;

