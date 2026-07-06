import React from 'react';
import { X } from 'lucide-react';

const BaseModal = ({ title, children, onClose ,className}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 w-full shadow-2xl ${className || 'max-w-md'}`}>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default BaseModal;
