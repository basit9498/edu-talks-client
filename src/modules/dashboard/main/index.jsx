import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/dashboard/DashboardLayout';
import Modal from '../components/Modal';
import { MessageSquare, FileText, FileStack, Sparkles, Upload, BookOpen, Clock, Users } from 'lucide-react';
import { getUser } from '../../../utils/auth';

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const user = getUser();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Discussions', value: '24', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { label: 'Worksheets Created', value: '18', icon: FileText, color: 'from-purple-500 to-pink-500' },
    { label: 'Documents Uploaded', value: '12', icon: FileStack, color: 'from-orange-500 to-yellow-500' },
    { label: 'AI Papers Generated', value: '8', icon: Sparkles, color: 'from-green-500 to-emerald-500' }
  ];

  const recentDiscussions = [
    { id: 1, title: 'Quantum Computing Basics', topic: 'Physics', time: '2 hours ago', participants: 8, createdFrom: 'Document', visibility: 'Public' },
    { id: 2, title: 'Shakespeare Literary Analysis', topic: 'Literature', time: '5 hours ago', participants: 12, createdFrom: 'General', visibility: 'Public' },
    { id: 3, title: 'Calculus Problem Set Discussion', topic: 'Mathematics', time: '1 day ago', participants: 15, createdFrom: 'Worksheet', visibility: 'Private' }
  ];

  const worksheets = [
    { name: 'Physics Chapter 5 Quiz', related: 'Quantum Computing', questions: 20, updated: '2 days ago', status: 'Final' },
    { name: 'English Literature Essay Questions', related: 'Shakespeare Analysis', questions: 10, updated: '3 days ago', status: 'Draft' },
    { name: 'Calculus Practice Problems', related: 'Math Discussion', questions: 35, updated: '1 week ago', status: 'Final' }
  ];

  const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (

<section>
<div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name} 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-blue-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'New Discussion', icon: MessageSquare, action: 'discussion' },
              { label: 'Upload Document', icon: Upload, action: 'document' },
              { label: 'Create Worksheet', icon: FileText, action: 'worksheet' },
              { label: 'Generate Paper', icon: Sparkles, action: 'paper' }
            ].map((action, i) => (
              <button
                key={i}
                onClick={() => { setModalType(action.action); setShowModal(true); }}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2 border border-gray-200 dark:border-gray-600"
              >
                <action.icon size={24} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Discussions</h2>
            <div className="space-y-3">
              {recentDiscussions.map((disc, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/dashboard/discussion?discussion=${disc.id}`)}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">{disc.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1"><BookOpen size={14} />{disc.topic}</span>
                    <span className="flex items-center gap-1"><Clock size={14} />{disc.time}</span>
                    <span className="flex items-center gap-1"><Users size={14} />{disc.participants}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Worksheets</h2>
            <div className="space-y-3">
              {worksheets.slice(0, 3).map((ws, i) => (
                <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">{ws.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${ws.status === 'Final' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {ws.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ws.questions} questions • {ws.updated}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && <Modal type={modalType} onClose={() => setShowModal(false)} />}
</section>
  
  );
};

export default Index;
