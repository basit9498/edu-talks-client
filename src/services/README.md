# API Services Documentation

Professional API service layer built with Axios for the EduTalks application.

## Structure

```
services/
├── api.js          # Main axios instance with interceptors
├── auth.js         # Authentication service
├── user.js         # User service
└── index.js        # Central export point
```

## Setup

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Usage

### Import Services

```javascript
// Import specific service
import authService from '@/services/auth';
import userService from '@/services/user';

// Or import from index
import { authService, userService } from '@/services';
```

### Authentication Service

#### Login

```javascript
import authService from '@/services/auth';

try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123',
    rememberMe: true
  });
  
  console.log('User:', response.user);
  console.log('Token:', response.token);
  // User is automatically stored in localStorage
} catch (error) {
  console.error('Login failed:', error.message);
  // error.code, error.status, error.errors available
}
```

#### Register

```javascript
try {
  const response = await authService.register({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    acceptTerms: true
  });
  
  if (response.requiresVerification) {
    // Redirect to email verification
  }
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

#### Verify Email

```javascript
try {
  const response = await authService.verifyEmail({
    email: 'user@example.com',
    code: '123456'
  });
  
  // User is automatically logged in after verification
  console.log('Verified:', response.user);
} catch (error) {
  console.error('Verification failed:', error.message);
}
```

#### Forgot Password

```javascript
try {
  const response = await authService.forgotPassword('user@example.com');
  console.log('Reset link sent:', response.message);
} catch (error) {
  console.error('Request failed:', error.message);
}
```

### User Service

#### Get Profile

```javascript
import userService from '@/services/user';

try {
  const { user } = await userService.getProfile();
  console.log('Profile:', user);
} catch (error) {
  console.error('Failed to fetch profile:', error.message);
}
```

#### Update Profile

```javascript
try {
  const response = await userService.updateProfile({
    name: 'John Doe',
    bio: 'Software Developer',
    phone: '+1234567890'
  });
  
  console.log('Updated:', response.user);
} catch (error) {
  console.error('Update failed:', error.message);
}
```

#### Change Password

```javascript
try {
  const response = await userService.changePassword({
    currentPassword: 'oldpass123',
    newPassword: 'newpass123',
    confirmPassword: 'newpass123'
  });
  
  console.log('Password changed:', response.message);
} catch (error) {
  console.error('Password change failed:', error.message);
}
```

#### Upload Avatar

```javascript
const file = document.querySelector('input[type="file"]').files[0];

try {
  const response = await userService.uploadAvatar(file);
  console.log('Avatar URL:', response.avatar_url);
} catch (error) {
  console.error('Upload failed:', error.message);
}
```

## Error Handling

All services return standardized error objects:

```javascript
{
  message: 'Error message',
  code: 'ERROR_CODE',
  status: 400,
  data: { /* API response data */ },
  errors: { /* Validation errors */ },
  timestamp: '2024-01-01T00:00:00.000Z'
}
```

### Error Codes

- `NETWORK_ERROR` - Network connectivity issue
- `UNAUTHORIZED` - Authentication required (401)
- `FORBIDDEN` - Insufficient permissions (403)
- `NOT_FOUND` - Resource not found (404)
- `VALIDATION_ERROR` - Input validation failed (422)
- `SERVER_ERROR` - Server error (500+)
- `UNKNOWN_ERROR` - Unexpected error

## Request Cancellation

```javascript
import { createCancelToken, isCancel } from '@/services/api';
import authService from '@/services/auth';

const cancelToken = createCancelToken();

try {
  await authService.login({ email, password }, { cancelToken: cancelToken.token });
} catch (error) {
  if (isCancel(error)) {
    console.log('Request cancelled');
  } else {
    console.error('Error:', error);
  }
}

// Cancel the request
cancelToken.cancel('User cancelled the request');
```

## Features

- ✅ Automatic token injection
- ✅ Request/Response interceptors
- ✅ Centralized error handling
- ✅ Request cancellation support
- ✅ Environment-based configuration
- ✅ Automatic token refresh (ready for implementation)
- ✅ Request timeout handling
- ✅ Network error detection
- ✅ Validation error handling
- ✅ Type-safe error objects

## Adding New Services

1. Create a new service file (e.g., `discussion.js`)
2. Import the main `api` instance
3. Define endpoints
4. Create service methods
5. Export from `index.js`

Example:

```javascript
// services/discussion.js
import api from './api';

const DISCUSSION_ENDPOINTS = {
  LIST: '/discussions',
  CREATE: '/discussions',
  GET: '/discussions/:id',
};

export const getDiscussions = async () => {
  const response = await api.get(DISCUSSION_ENDPOINTS.LIST);
  return response;
};

export default { getDiscussions };
```

