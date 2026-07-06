import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../../components/layout/dashboard/DashboardLayout'
import { getPaperQuestions } from '../../../../services/paper';
import { toast } from 'react-toastify';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Clock, FileText } from 'lucide-react';

const WorksheetPaperQuestion = () => {
  const navigate = useNavigate();
  const [paperDetails, setPaperDetails] = useState(null);
  const {  id } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const worksheet_id = searchParams.get('worksheet_id');

  const fetchPaperDetails = async () => {
    try {
      const response = await getPaperQuestions(id);
      console.log("response", response);
      setPaperDetails(response);
    } catch (error) {
     toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPaperDetails();
  }, [id]);

  const getTypeBadge = (type) => {
    const badges = {
      'mcqs': { 
        label: 'Multiple Choice', 
        color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
      },
      'fill_in_the_blank': { 
        label: 'Fill in Blank', 
        color: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
      },
      'short_question': { 
        label: 'Short Answer', 
        color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
      },
      'long_answer': { 
        label: 'Long Answer', 
        color: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' 
      }
    };
    return badges[type] || { 
      label: type, 
      color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' 
    };
  };

  return (
    <section>
      <div className="space-y-6">
        <button
          onClick={() => navigate(`/dashboard/worksheet/paper-list/${worksheet_id}?name=${name || ''}`)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Papers
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {paperDetails?.title}
          </h2>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Clock size={18} />
              <span className="font-medium">{paperDetails?.time_limit_minutes} minutes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FileText size={18} />
              <span className="font-medium">
                {paperDetails?.question_setup.reduce((acc, qs) => acc + qs.number_of_questions, 0)} questions
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/dashboard/worksheet/paper-start/${paperDetails?.id || id}`)}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Start Test Now
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Questions Preview</h3>
          {paperDetails?.paper_questions.map((q, idx) => {
            const badge = getTypeBadge(q.question_type);
            return (
              <div 
                key={q.id} 
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-medium text-gray-500 dark:text-gray-400">
                    Question {idx + 1}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>
                <p className="text-gray-900 dark:text-white font-medium">{q.question}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default WorksheetPaperQuestion