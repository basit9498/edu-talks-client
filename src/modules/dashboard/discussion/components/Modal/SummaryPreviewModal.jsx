import React from 'react'
import BaseModal from '../../../../../components/common/Modal/BaseModal'
import ReactMarkdown from 'react-markdown'

const SummaryPreviewModal = ({ onClose,summaryContent }) => {
  return (
    <BaseModal className=" max-h-[90vh] overflow-y-auto " title="Summary Preview" onClose={onClose}>
     <div className="text-sm text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
     <ReactMarkdown style={{ whiteSpace: 'pre-wrap',width: '800px' }}>{summaryContent || ""}</ReactMarkdown>
     </div>
    </BaseModal>
  )
}

export default SummaryPreviewModal