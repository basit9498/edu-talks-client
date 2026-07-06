import React, { useState } from 'react';
import BaseModal from './BaseModal';
import { AlertTriangle, Trash2, LogOut, XCircle, CheckCircle, Info } from 'lucide-react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  icon: Icon = AlertTriangle,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed with this action?',
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger', 'warning', 'info', 'success'
  isLoading = false,
  className = '',

}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (onConfirm) {
      setIsSubmitting(true);
      try {
        await onConfirm();
        onClose();
      } catch (error) {
        console.error('Confirmation action failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    if (!isSubmitting && !isLoading) {
      onClose();
    }
  };

  // Icon color based on variant
  const getIconColor = () => {
    switch (variant) {
      case 'danger':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'success':
        return 'text-green-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  // Button style based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600';
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600';
    }
  };

  const loading = isSubmitting || isLoading;

  return (
    <BaseModal title={title} onClose={handleCancel} className={className}>
      <div className="space-y-6">
        {/* Icon and Description */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`${getIconColor()} p-4 rounded-full bg-opacity-10 ${variant === 'danger' ? 'bg-red-100 dark:bg-red-900/20' : variant === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20' : variant === 'success' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-100 dark:bg-blue-900/20'}`}>
            <Icon size={48} className={getIconColor()} />
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 px-6 py-3 border dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 px-6 py-3 rounded-lg font-medium text-white hover:shadow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${getButtonStyle()}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmationModal;

