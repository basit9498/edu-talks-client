import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/dashboard/DashboardLayout';
import Modal from '../components/Modal';
import { Upload, FileStack, Search, Plus } from 'lucide-react';
import DocumentUploadModal from './components/Modal/DocumentUploadModal';
import { getAllDocuments } from '../../../services/doc';

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [userName] = useState('Sarah');
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const documents = await getAllDocuments();
      setDocuments(documents);
    };
    fetchDocuments();
  }, []);

  return (
    <section>
      <div className="space-y-6">
      <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Documents</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create or manage your documents — upload and analyze.</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-4 flex-1">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <select className="px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 text-gray-900 dark:text-white">
              <option>All Types</option>
              <option>PDF</option>
              <option>DOC</option>
              <option>TXT</option>
            </select>
          </div>
          <button
            onClick={() => { setShowModal(true); }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <Plus size={18} />
            Upload Document
          </button>
        </div>


     

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents?.length > 0 ? documents.map((doc, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FileStack size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{doc.type}</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{doc.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Uploaded {doc.createdAt}</p>
              <div className="flex items-center justify-between text-sm">
                {/* <span className="text-gray-600 dark:text-gray-400">{doc.discussions} discussions</span> */}
                {/* open document in new tab */}
                <button className="text-blue-600 dark:text-blue-400 hover:underline" onClick={() => window.open(`http://127.0.0.1:8000${doc.doc_link}`, '_blank')}>View</button>
              </div>
            </div>
          )) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-center">No documents found</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && <DocumentUploadModal  onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default Index;
