import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/dashboard/DashboardLayout';
import Modal from '../components/Modal';
import { Plus, Search } from 'lucide-react';
import { getWorksheetList } from '../../../services/worksheet';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import WorksheetModal from './components/Modal/WorksheetModal';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [worksheets, setWorksheets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorksheets = async () => {
      const worksheets = await getWorksheetList();
      setWorksheets(worksheets);
    };
    fetchWorksheets();
  }, []);

  return (
    <section>
     
      <div className="space-y-6">
      <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Worksheets</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create or manage your worksheets — generate papers, quizzes, and more.</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-4 flex-1">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search worksheets..."
                className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <select className="px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-white">
              <option>All Types</option>
              <option>Mix</option>
              <option>MCQ Only</option>
              <option>Fill in the Blanks</option>
              <option>Short Answer</option>
              <option>Long Answer</option>
            </select>
          </div>
          <button
            onClick={() => { setShowModal(true); }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <Plus size={18} />
            Create Worksheet
          </button>
        </div>


      

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Name</th>
           
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Papers</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Updated</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {worksheets?.length > 0 ? worksheets.map((ws, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" 
                onClick={() => { navigate(`/dashboard/worksheet/paper-list/${ws.id}?name=${ws.name}`)}}
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{ws.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{ws?.papers?.length || 0}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{ws.type}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{ws.updated_at ? getTimeAgo(ws.updated_at) : ''}</td>
                  {/* <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{ws.visibility}</td> */}
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${ws.visibility=== 'public' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                      {ws.visibility.toUpperCase()}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">No worksheets found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* {showModal && <Modal type="worksheet" onClose={() => setShowModal(false)} />} */}
      {showModal && <WorksheetModal onClose={() => setShowModal(false)}  setWorksheets={setWorksheets} worksheets={worksheets} />}
    </section>
  );
};

export default Index;
