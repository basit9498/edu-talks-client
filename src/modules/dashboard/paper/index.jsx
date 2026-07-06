import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/dashboard/DashboardLayout';
import Modal from '../components/Modal';
import { Sparkles, Eye, Download } from 'lucide-react';

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [userName] = useState('Sarah');

  const papers = [
    { title: 'Physics Midterm Exam', basedOn: 'Quantum Computing Discussion', type: 'Mix', created: '1 day ago' },
    { title: 'Literature Essay Questions', basedOn: 'Shakespeare Document', type: 'Short Answer', created: '3 days ago' },
    { title: 'Math Practice Test', basedOn: 'Calculus Worksheet', type: 'MCQ', created: '5 days ago' }
  ];

  return (
    <section>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI-Generated Papers</h1>
          <button
            onClick={() => { setShowModal(true); }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <Sparkles size={18} />
            Generate Paper
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {papers.map((paper, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Sparkles size={24} className="text-white" />
                </div>
                <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">{paper.type}</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{paper.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Based on: {paper.basedOn}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">Created {paper.created}</p>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 border dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-1 text-gray-900 dark:text-white">
                  <Eye size={14} />
                  Preview
                </button>
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center gap-1">
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && <Modal type="paper" onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default Index;
