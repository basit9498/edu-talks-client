/**
 * User Service
 * 
 * Handles all user-related API calls:
 * - Get user profile
 * - Update user profile
 * - Change password
 * - Update preferences
 * - Upload avatar
 * - Delete account
 * 
 * All methods return promises that resolve with response data
 * or reject with standardized error objects.
 */

import api from './api';
import { setUser, setUserRole, setUserPermissions } from '../utils/auth';

/**
 * User API endpoints
 */
const USER_ENDPOINTS = {
  PROFILE: '/user/profile',

};


export const getProfile = async () => {
  try {
    const response = await api.get(USER_ENDPOINTS.PROFILE);
  
return response.data; 


    
  } catch (error) {
   
    throw error;
  }
};



// Export all user methods as a service object
const userService = {
  getProfile,

};

export default userService;

