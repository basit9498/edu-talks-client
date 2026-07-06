import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/dashboard/DashboardLayout';

const Index = () => {
  const [userName] = useState('Sarah');

  return (
    <section>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input type="text" defaultValue={userName} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" defaultValue="sarah@edutalks.com" className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
              <select className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
              <select className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>UTC-5 (Eastern)</option>
                <option>UTC-8 (Pacific)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Current Plan: Pro</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Next billing date: Nov 15, 2025</p>
            </div>
            <button className="px-4 py-2 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white">
              Manage Billing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
