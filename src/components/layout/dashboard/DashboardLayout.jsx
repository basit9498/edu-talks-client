import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, Search, Bell, Sun, Moon, User, LogOut, BarChart3, MessageSquare, FileText, FileStack, Sparkles, Settings, Share2 } from 'lucide-react';
import { getUser, logout } from '../../../utils/auth';

const DashboardLayout = ({ children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = getUser();
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavItem = ({ icon: Icon, label, path }) => {
    const isActive = location.pathname === path || 
                     (path === '/dashboard' && location.pathname === '/dashboard');
    
    return (
      <Link
        to={path}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
          isActive
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-semibold shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 rounded-r-full" />}
        <Icon size={18} className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'} />
        {sidebarOpen && <span className="text-sm">{label}</span>}
      </Link>
    );
  };

  // Apply dark mode to document and persist
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar - Left Side (Fixed Width) */}
        {/* Sidebar - Left Side (Fixed Width) */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col flex-shrink-0 h-full z-20 shadow-sm`}>
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-700/50">
            {sidebarOpen ? (
              <div className="flex items-center gap-2.5 animate-in fade-in duration-200">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="font-bold text-lg text-gray-800 dark:text-white tracking-tight">EduTalks</span>
              </div>
            ) : (
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                  <Sparkles size={16} className="text-white" />
                </div>
            )}
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-500 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {!sidebarOpen && (
             <div className="py-4 flex justify-center">
                 <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 transition-colors"
              >
                <Menu size={20} />
              </button>
             </div>
          )}

          {/* Sidebar Navigation - Scrollable */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
            
            {/* Group: Overview */}
            <div>
              {sidebarOpen && <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Overview</div>}
              <div className="space-y-1">
                <NavItem icon={BarChart3} label="Dashboard" path="/dashboard" />
              </div>
            </div>

            {/* Group: Learning */}
            <div>
              {sidebarOpen && <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Learning & AI</div>}
              <div className="space-y-1">
                
                 <NavItem icon={MessageSquare} label="Discussions" path="/dashboard/discussion" />
                 <NavItem icon={FileText} label="Worksheets" path="/dashboard/worksheet" />
                 <NavItem icon={FileStack} label="Documents" path="/dashboard/documents" />
                 <NavItem icon={Sparkles} label="AI Planner" path="/dashboard/ai-planner" />
              </div>
            </div>

            {/* Group: Connect */}
            <div>
              {sidebarOpen && <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Connect</div>}
              <div className="space-y-1">
                 <NavItem icon={Share2} label="Integrations" path="/dashboard/integrations" />
              </div>
            </div>

             {/* Group: System */}
             <div>
              {sidebarOpen && <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">System</div>}
              <div className="space-y-1">
                 <NavItem icon={Settings} label="Settings" path="/dashboard/setting" />
              </div>
            </div>

          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700/50">
             <div className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${sidebarOpen ? 'bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700' : ''}`}>
               <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {user?.name?.[0] || 'U'}
               </div>
               
               {sidebarOpen && (
                 <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{user?.name || 'User Name'}</p>
                    <p className="text-xs text-gray-500 truncate">Student Account</p>
                 </div>
               )}
               
               {sidebarOpen && (
                  <button onClick={handleLogout} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all" title="Logout">
                     <LogOut size={16} />
                  </button>
               )}
             </div>
          </div>
        </aside>

        {/* Main Content Area - Right Side (Flexible Width) */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Header - Fixed at Top */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 ml-6">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {darkMode ? <Sun size={20} className="text-gray-600 dark:text-gray-400" /> : <Moon size={20} className="text-gray-600" />}
                </button>

                <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="relative">
                  <button className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {user?.name[0]}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content - Scrollable */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

