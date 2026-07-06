import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/dashboard/DashboardLayout';
import { getProfile } from '../../../services/user';

const Index = () => {
const [user, setUser] = useState(null);


useEffect(() => {
  const fetchProfile = async () => {
    try {
      const user = await getProfile();
      console.log(user);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };
  fetchProfile();
  
}, []);




  return (
    <section>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.name[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input type="text" defaultValue={user?.name} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" defaultValue={user?.email} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
              <textarea rows={4} placeholder="Tell us about yourself..." className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
