import React, { useEffect, useState } from 'react';
import { Plus, Search, Eye } from 'lucide-react';
import { getWorksheetList } from '../../../services/worksheet';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import { useNavigate } from 'react-router-dom';
import { getPlan } from '../../../services/aiPlanner';
import Pagination from '../../../components/common/Pagination';

const Index = () => {
const [plan, setPlan] = useState(null);
const [itemOffset, setItemOffset] = useState(0);
const [totalPages, setTotalPages] = useState(1);
const [limit, setLimit] = useState(10);
const [search, setSearch] = useState("");
const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();

const fetchPlan = async () => {
  try {
    setIsLoading(true);
    const response   = await getPlan({
      offset: itemOffset,
      limit,
      search,
    });
    setPlan(response.result.data);
    setTotalPages(response.result.total_pages);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {

  fetchPlan();
}, [itemOffset, limit, search]);

const handlePageChange = (event) => {
  const newOffset = event.selected * limit;
  setItemOffset(newOffset);
};



  return (
    <section>
        <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your AI Planner</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create or manage your AI planner — generate learning plans and more.</p>
        </div>


        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-4 flex-1">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search AI Planner..."
                className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
         
          </div>
          <button
            onClick={() => { navigate('/dashboard/ai-planner/create'); }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <Plus size={18} />
            Create AI Planner
          </button>
        </div>


      

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Title</th>
           
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">created at</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Actions</th>
              
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {plan?.length > 0 ? plan.map((p, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{p.title}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{getTimeAgo(p.created_at)}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    <button onClick={() => navigate(`/dashboard/ai-planner/detail/${p.id}`)} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2">
                      <Eye size={18} />
                      View
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan={5} className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">No AI planner found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>

        <Pagination
        pageCount={totalPages}
        onPageChange={handlePageChange}
      />
  
    </section>
  );
};

export default Index;
