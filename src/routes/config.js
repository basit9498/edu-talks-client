/**
 * Route Configuration
 * 
 * This file contains all route definitions for the application.
 * It supports:
 * - Public and protected routes
 * - Role-based access control (ready for future implementation)
 * - Permission-based access (ready for future implementation)
 * 
 * @typedef {Object} RouteConfig
 * @property {string} path - The route path
 * @property {React.Component} element - The component to render
 * @property {boolean} protected - Whether the route requires authentication
 * @property {string[]} [roles] - Allowed roles (optional, for future RBAC)
 * @property {string[]} [permissions] - Required permissions (optional, for future permission-based access)
 * @property {string} [title] - Page title for SEO/document title
 * @property {boolean} [exact] - Whether to match exact path (default: true)
 */

// Import all page components
import Dashboard from '../page/dashboard/Dashboard';
import Discussion from '../page/dashboard/discussion/Discussion';
import DiscussionDetail from '../page/dashboard/discussion/DiscussionDetail';
import Worksheet from '../page/dashboard/worksheet/Worksheet';
import WorksheetPaperList from '../page/dashboard/worksheet/WorksheetPaperList';
import Documents from '../page/dashboard/Documents';
import Paper from '../page/dashboard/Paper';
import Setting from '../page/dashboard/Setting';
import Profile from '../page/dashboard/Profile';
import WorksheetPaperQuestionList from '../page/dashboard/worksheet/WorksheetPaperQuestionList';
import WorksheetPaperStart from '../page/dashboard/worksheet/WorksheetPaperStart';
import AIPlanner from '../page/dashboard/aiPlanner/AIPlanner';
import CreateAIPlanPage from '../page/dashboard/aiPlanner/CreateAIPlanPage';
import DetailAIPlanPage from '../page/dashboard/aiPlanner/DetailAIPlanPage';
import Integrations from '../page/dashboard/Integrations';

// Public Routes (accessible without authentication)
// Note: Public routes are handled directly in AppRouter.jsx for better control
// You can add more public routes in AppRouter.jsx as needed
export const publicRoutes = [
  // Example structure for future public routes:
  // {
  //   path: '/login',
  //   element: () => import('../page/auth/Login'),
  //   protected: false,
  //   title: 'Login - EduTalks',
  // },
];

// Protected Routes (require authentication)
export const protectedRoutes = [
  {
    path: '/dashboard',
    element: Dashboard,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'], // Future: role-based access
    permissions: ['dashboard:view'], // Future: permission-based access
    title: 'Dashboard - EduTalks',
    exact: true,
  },
  {
    path: '/dashboard/discussion',
    element: Discussion,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['discussion:view'],
    title: 'Discussion - EduTalks',
  },
  {
    path: '/dashboard/discussion/detail',
    element: DiscussionDetail,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['discussion:view'],
    title: 'Discussion - EduTalks',
  },
  {
    path: '/dashboard/worksheet',
    element: Worksheet,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['worksheet:view'],
    title: 'Worksheet - EduTalks',
  },
  {
    path: '/dashboard/worksheet/paper-list/:id',
    element: WorksheetPaperList,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['worksheet:view'],
    title: 'Worksheet Paper List - EduTalks',
  },
  {
    path: '/dashboard/worksheet/paper-question-list/:id',
    element: WorksheetPaperQuestionList,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['worksheet:view'],
    title: 'Worksheet Paper Question List - EduTalks',
  },
  {
    path: '/dashboard/worksheet/paper-start/:id',
    element: WorksheetPaperStart,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['worksheet:view'],
    title: 'Worksheet Paper Start - EduTalks',
  },
  {
    path: '/dashboard/documents',
    element: Documents,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['documents:view'],
    title: 'Documents - EduTalks',
  },
  // {
  //   path: '/dashboard/paper',
  //   element: Paper,
  //   protected: true,
  //   roles: ['admin', 'user', 'student', 'teacher'],
  //   permissions: ['paper:view'],
  //   title: 'Paper - EduTalks',
  // },
  {
    path: '/dashboard/setting',
    element: Setting,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['setting:view'],
    title: 'Settings - EduTalks',
  },
  {
    path: '/dashboard/profile',
    element: Profile,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['profile:view'],
    title: 'Profile - EduTalks',
  },
  {
    path: '/dashboard/ai-planner',
    element: AIPlanner,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['planner:view'],
    title: 'AI Learning Planner - EduTalks',
  },
  {
    path: '/dashboard/ai-planner/create',
    element: CreateAIPlanPage,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['planner:view'],
    title: 'AI Learning Planner - EduTalks',
  },
  {
    path: '/dashboard/ai-planner/detail/:id',
    element: DetailAIPlanPage,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['planner:view'],
    title: 'AI Learning Planner - EduTalks',
  },
  {
    path: '/dashboard/integrations',
    element: Integrations,
    protected: true,
    roles: ['admin', 'user', 'student', 'teacher'],
    permissions: ['integrations:view'],
    title: 'Integrations - EduTalks',
  },
];

// Combine all routes for easy access
export const allRoutes = [...publicRoutes, ...protectedRoutes];

// Helper function to get route by path
export const getRouteByPath = (path) => {
  return allRoutes.find((route) => route.path === path);
};

// Helper function to check if route is protected
export const isRouteProtected = (path) => {
  const route = getRouteByPath(path);
  return route?.protected || false;
};

// Helper function to get allowed roles for a route
export const getRouteRoles = (path) => {
  const route = getRouteByPath(path);
  return route?.roles || [];
};

// Helper function to get required permissions for a route
export const getRoutePermissions = (path) => {
  const route = getRouteByPath(path);
  return route?.permissions || [];
};
