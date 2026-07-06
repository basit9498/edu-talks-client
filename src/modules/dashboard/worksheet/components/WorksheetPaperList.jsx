import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../../components/layout/dashboard/DashboardLayout';
import { getWorksheetPaperList } from '../../../../services/worksheet';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Clock, Download, Eye, FileText, Sparkles } from 'lucide-react';
import { getTimeAgo } from '../../../../utils/getTimeAgo';

const WorksheetPaperList = () => {
    const navigate = useNavigate();
    const [worksheetPapers, setWorksheetPapers] = useState([]);
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');

    useEffect(() => {
        const fetchWorksheetPapers = async () => {
            const worksheetPapers = await getWorksheetPaperList(id);
            setWorksheetPapers(worksheetPapers);
        };
        fetchWorksheetPapers();
    }, [id]);


    const getDifficultyColor = (difficulty) => {
      const colors = {
        'easy': 'bg-green-100 text-green-700',
        'medium': 'bg-yellow-100 text-yellow-700',
        'hard': 'bg-red-100 text-red-700'
      };
      return colors[difficulty] || 'bg-gray-100 text-gray-700';
    };
  
    const getTypeLabel = (type) => {
      const labels = {
        'max': 'Mixed Types',
        'mcq': 'MCQ Only',
        'mixed': 'Multiple Types'
      };
      return labels[type] || type.toUpperCase();
    };
  return (
    <section>

<div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI-Generated Papers</h1>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {worksheetPapers.map((paper, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Sparkles size={24} className="text-white" />
                </div>
                <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">{getTypeLabel(paper.question_setup.map((qs) => qs.type).join(', ').replace(/_/g, ' ').toUpperCase())}</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{paper.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Based on: {name}</p>
              <div className="flex flex-wrap gap-2 mb-4">
           

              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {paper.question_setup.reduce((acc, qs) => acc + qs.number_of_questions, 0)} Questions
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full flex items-center gap-1">
                <Clock size={12} />
                {paper.time_limit_minutes} min
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full flex items-center gap-1">
                <FileText size={12} />
                {paper.difficulty_level.toUpperCase()}
              </span>

            </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 border dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-1 text-gray-900 dark:text-white"
                onClick={() => navigate(`/dashboard/worksheet/paper-question-list/${paper.id}?worksheet_id=${id}&name=${paper.title}`)}
                >
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
    

    {/* <div className="p-6">
      <button
        onClick={() => navigate('/dashboard/worksheet')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Worksheets
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
        <p className="text-gray-600">AI-Generated Practice Papers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {worksheetPapers.map((paper, i) => (
          <div key={paper.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{paper.title}</h3>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(paper.difficulty_level.toLowerCase())}`}>
                {paper.difficulty_level.toUpperCase()}
              </span>
            </div>


            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
                {paper.question_setup.map((qs) => qs.type).join(', ').replace(/_/g, ' ').toUpperCase()}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {paper.question_setup.reduce((acc, qs) => acc + qs.number_of_questions, 0)} Questions
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full flex items-center gap-1">
                <Clock size={12} />
                {paper.time_limit_minutes} min
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/dashboard/worksheet/paper-question-list/${paper.id}?name=${paper.title}`)}
                className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Preview
              </button>
              <button
                onClick={() => navigate(`/dashboard/worksheet/paper-start/${paper.id}`)}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Start Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div> */}


  
  </section>
  )
}

export default WorksheetPaperList