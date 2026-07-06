import React, { useState, useMemo, useEffect } from 'react';
import { Share2, Check, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { getUser,setUser } from '../../utils/auth';
import { getProfile } from '../../services/user';
import { connectGoogleTool } from '../../services/integration';

const IntegrationCard = ({ name, description, icon, initialStatus, provider, onStatusChange }) => {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  // Update status when initialStatus changes
  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const toggleStatus = async () => {
    // Calculate the NEW status (after toggle)
    const newStatus = !status;
    
    setLoading(true);
    
    try {
      const payload = {};

      if (name.includes("Calendar")) {
        payload.google_calendar_connected = newStatus;
      }
      if (name.includes("Drive")) {
        payload.google_drive_connected = newStatus;
      }
      if (name.includes("Classroom")) {
        payload.google_class_room_connected = newStatus;
      }
      
      // Call API with the NEW status
      await connectGoogleTool(payload);
      
      // Update local state only if API succeeds
      setStatus(newStatus);
      
      // Update user in localStorage
      const user = getUser();
      if (user) {
        setUser({...user, ...payload});
      }
    } catch (error) {
      console.error('Error connecting to Google tool:', error);
      // Don't update status on error - keep current state
    } finally {
      setLoading(false);
    }
  };

  const getIconStyles = (name, provider) => {
    if (provider === 'Google') {
      if (name.includes("Drive")) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      if (name.includes("Calendar")) return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
    }
    if (name.includes("Notion")) return 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100';
    if (name.includes("Slack")) return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
    if (name.includes("EduTalks")) return 'bg-gradient-to-br from-blue-500 to-purple-500 text-white';
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${getIconStyles(name, provider)}`}>
          {icon || name[0]}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleStatus();
          }}
          disabled={loading}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            status ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
          } ${loading ? 'opacity-70 cursor-wait' : ''}`}
        >
          <span
            className={`${
              status ? 'translate-x-6' : 'translate-x-0.5'
            } inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200`}
          />
        </button>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            status 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {loading ? 'Updating...' : (status ? 'Connected' : 'Disconnected')}
          </span>
          <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
        </div>
      </div>
    </div>
  );
};

const Integrations = () => {

  const [loading, setLoading] = useState(true);
  const user = getUser();


  // Get connection status for each Google service
  const getGoogleServiceStatus = (serviceName) => {
    if (!user) return false;
    
    if (serviceName.includes("Calendar")) {
      return user.google_calendar_connected || false;
    }
    if (serviceName.includes("Drive")) {
      return user.google_drive_connected || false;
    }
    if (serviceName.includes("Classroom")) {
      return user.google_class_room_connected || false;
    }
    return false;
  };

  const integrationsList = [
    // {
    //   name: "Google Calendar",
    //   description: "Sync your study schedule and deadlines automatically.",
    //   status: getGoogleServiceStatus("Google Calendar"),
    //   icon: "📅",
    //   provider: "Google"
    // },
    {
      name: "Google Drive",
      description: "Store your generated worksheets and notes.",
      status: getGoogleServiceStatus("Google Drive"),
      icon: "📁",
      provider: "Google"
    },
    // {
    //   name: "Google Classroom",
    //   description: "Integrate with your Google Classroom assignments.",
    //   status: getGoogleServiceStatus("Google Classroom"),
    //   icon: "📚",
    //   provider: "Google"
    // }
  ];

  // Group integrations by provider - Only show Google
  const groupedIntegrations = useMemo(() => {
    const groups = {};
    integrationsList.forEach(integration => {
      // Only show Google provider
      if (integration.provider === 'Google') {
        const provider = integration.provider;
        if (!groups[provider]) {
          groups[provider] = [];
        }
        groups[provider].push(integration);
      }
    });
    return groups;
  }, [user]);

  const getProviderIcon = (provider) => {
    switch (provider) {
      case 'Google':
        return '🔵';
      case 'EduTalks':
        return '🎓';
      default:
        return '🔌';
    }
  };

  const getProviderColor = (provider) => {
    switch (provider) {
      case 'Google':
        return 'from-blue-500 to-red-500';
      case 'EduTalks':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const isGoogleConnected = user?.google_connected || false;

  const getConnectButtonText = (provider) => {
    if (provider === 'Google') {
      return isGoogleConnected ? 'Disconnect Google Account' : 'Connect with Google Account';
    }
    return `Connect with ${provider}`;
  };

  const handleProviderConnect = async (provider) => {
    if (provider === 'Google') {
      if (isGoogleConnected) {
        // Handle disconnect
        // TODO: Implement disconnect logic
        console.log('Disconnecting Google...');
        // You can add disconnect API call here
      } else {
        // Handle connect
        const token = localStorage.getItem("token");
        try {
          const res = await fetch("http://127.0.0.1:8000/auth/google/connect", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
        
          const data = await res.json();
        
          // Redirect browser to Google
          window.location.href = data.url;
        } catch (error) {
          console.error('Error connecting to Google:', error);
        }
      }
    }
  };

  const shouldShowConnectButton = (provider) => {
    // Only show for Google provider
    return provider === 'Google';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Share2 className="text-purple-500" />
          Integrations
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Connect your favorite tools to supercharge your learning workflow.
        </p>
      </div>

      {/* Grouped Integrations */}
      <div className="space-y-8">
        {Object.entries(groupedIntegrations).map(([provider, integrations]) => (
          <div key={provider} className="space-y-4">
            {/* Group Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getProviderColor(provider)} flex items-center justify-center text-white text-xl`}>
                    {getProviderIcon(provider)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{provider}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {integrations.length} {integrations.length === 1 ? 'integration' : 'integrations'} available
                    </p>
                  </div>
                </div>
                {shouldShowConnectButton(provider) && (
                  <button
                    onClick={() => handleProviderConnect(provider)}
                    className={`px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2 ${
                      isGoogleConnected
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    }`}
                  >
                    {isGoogleConnected ? <X size={16} /> : <Share2 size={16} />}
                    {getConnectButtonText(provider)}
                  </button>
                )}
              </div>
              
              {/* Connection Status Badge */}
              {provider === 'Google' && isGoogleConnected && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle2 size={18} className="text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">
                    Google account has been connected successfully
                  </span>
                </div>
              )}
            </div>

            {/* Integration Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((tool) => (
                <IntegrationCard 
                  key={tool.name}
                  name={tool.name} 
                  description={tool.description} 
                  icon={tool.icon} 
                  initialStatus={tool.status}
                  provider={tool.provider}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
