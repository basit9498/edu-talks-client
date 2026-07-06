import React from 'react';
import { X, Upload, Sparkles, FileText, FileStack, MessageSquare } from 'lucide-react';

const Modal = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {type === 'discussion' && 'Create New Discussion'}
            {type === 'worksheet' && 'Create New Worksheet'}
            {type === 'document' && 'Upload Document'}
            {type === 'paper' && 'Generate Paper'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        {type === 'discussion' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button className="p-4 border-2 border-blue-500 rounded-lg text-center hover:bg-blue-50 dark:hover:bg-gray-700">
                <FileText className="mx-auto mb-2 text-gray-900 dark:text-white" size={24} />
                <span className="text-sm text-gray-900 dark:text-white">From Worksheet</span>
              </button>
              <button className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-700">
                <FileStack className="mx-auto mb-2 text-gray-900 dark:text-white" size={24} />
                <span className="text-sm text-gray-900 dark:text-white">From Document</span>
              </button>
              <button className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-700">
                <MessageSquare className="mx-auto mb-2 text-gray-900 dark:text-white" size={24} />
                <span className="text-sm text-gray-900 dark:text-white">General</span>
              </button>
            </div>
            <input type="text" placeholder="Discussion Title" className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white" />
            <textarea placeholder="Description / Topic" rows={3} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
            <select className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Public</option>
              <option>Private</option>
            </select>
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow">
              Create Discussion
            </button>
          </div>
        )}

        {type === 'document' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, DOC, or TXT</p>
            </div>
            <input type="text" placeholder="Document Title" className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white" />
            <input type="text" placeholder="Subject / Tags" className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white" />
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
              <Sparkles size={18} />
              Upload & Analyze
            </button>
          </div>
        )}

        {(type === 'worksheet' || type === 'paper') && (
          <div className="space-y-4">
            <input type="text" placeholder={`${type === 'worksheet' ? 'Worksheet' : 'Paper'} Title`} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white" />
            <select className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Select Discussion or Document</option>
              <option>Quantum Computing Basics</option>
              <option>Shakespeare Analysis</option>
            </select>
            <select className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Type: Mix</option>
              <option>MCQ Only</option>
              <option>Short Answer</option>
              <option>Long Answer</option>
            </select>
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
              <Sparkles size={18} />
              {type === 'worksheet' ? 'Create Worksheet' : 'Generate Paper'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

