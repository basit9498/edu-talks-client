import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Plus, Search, Share, Share2, Trash2 } from 'lucide-react';
import DiscussionModal from './components/Modal/DiscussionModal';
import { deleteDiscussion, getAllDiscussions } from '../../../services/discussion';
import Pagination from '../../../components/common/Pagination';
import ConfirmationModal from '../../../components/common/Modal/ConfirmationModal';
import { toast } from 'react-toastify';


const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [discussions, setDiscussions] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectData, setSelectData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();


  const fetchDiscussions = async () => {
    try {
      const response = await getAllDiscussions({
        offset: itemOffset,
        limit,
        search,
        type,
      });

      setDiscussions(response.data);
      setTotalPages(response.total_pages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
   
    fetchDiscussions();
  }, [itemOffset, limit, search, type]);

  const handlePageChange = (event) => {
    const newOffset = event.selected * limit;
    setItemOffset(newOffset);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deleteDiscussion(selectData.id);
      console.log(response);
      toast.success('Discussion deleted successfully');
      fetchDiscussions();
    } catch (error) {
      
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Discussions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create or manage your discussions — collaborate, analyze, and generate papers.</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-4 flex-1">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setItemOffset(0); setLimit(10); }}
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <select className="px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-white"
            value={type}
            onChange={(e) => { setType(e.target.value); setItemOffset(0); setLimit(10); }}
            >
              <option value="">All Types</option>
              <option value="general">General</option>
              <option value="document">From Document</option>
              {/* <option>From Worksheet</option> */}
            </select>
          </div>
          <button
            onClick={() => { setShowModal(true); }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <Plus size={18} />
            New Discussion
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Created From</th>
                {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Topic</th> */}
                {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Participants</th> */}
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Last Activity</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {discussions?.length > 0 ? discussions.map((disc) => (
                <tr key={disc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-3">
                    <button
                       onClick={() => navigate(`/dashboard/discussion/detail?discussion=${disc.id}`)}
                      className="text-gray-900 dark:text-white font-normal text-base hover:text-blue-600 dark:hover:text-blue-400 text-left"
                    >
                      {disc.title}
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                      {disc.type}
                    </span>
                  </td>
                 
                  <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">{disc.updated_at ? new Date(disc.updated_at).toLocaleString() : 'N/A'}</td>
                  <td className="px-6 py-3">
                    {/* Icon for all actions with hover effect */}
                    <div className="flex gap-2">
                      <Eye size={18} className="text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" onClick={() => navigate(`/dashboard/discussion/detail?discussion=${disc.id}`)} />
                      <Share2 size={18} className="text-green-600 dark:text-green-400 hover:text-green-600 dark:hover:text-green-400 cursor-pointer" />
                      <Trash2 size={18} className="text-red-600 dark:text-red-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer" onClick={() => { setDeleteModal(true); setSelectData(disc); }} />
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">No discussions found</td>
                </tr>
              )}
            </tbody>
          </table>

        
        </div>
        <Pagination
        pageCount={totalPages}
        onPageChange={handlePageChange}
      />
      {deleteModal && <ConfirmationModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} 
      onConfirm={handleDelete}
      icon={Trash2}
      title={`Delete Discussion`}
      description={`Are you sure you want to delete this discussion?`}
      confirmText={`Delete`}
      cancelText={`Cancel`}
      variant={`danger`}
      isLoading={false}
      className={`w-full max-w-md`}
      />}
       
      </div>

      {showModal && <DiscussionModal onClose={() => setShowModal(false)}  />}
    </section>
  );
};

export default Index;
