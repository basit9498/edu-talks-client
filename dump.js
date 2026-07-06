
import DashboardLayout from '../../../../components/layout/dashboard/DashboardLayout'
import React, { useEffect, useState } from 'react'
import { getPaperQuestions } from '../../../../services/paper';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, FileText, Timer } from 'lucide-react';  
import QuestionRenderer from './QuestionRenderer';
import ResultsPage from './ResultsPage';


const WorksheetPaperStart = () => {
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [paperQuestions, setPaperQuestions] = useState([]);

  const [started, setStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [finished, setFinished] = useState(false);

  const { id } = useParams();

  const fetchPaperDetails = async () => {
    try {
      const response = await getPaperQuestions(id);
      const { paper_questions, ...paperDetail } = response;
      setPaper(paperDetail);
      setPaperQuestions(paper_questions);
      setTimeLeft(paperDetail.time_limit_minutes * 60);
    } catch (error) {
     toast.error(error.response.data.message);
    }
  };




  useEffect(() => {
    fetchPaperDetails();
  }, [id]);


  
  // useEffect(() => {
  //   if (started && timeLeft > 0 && !finished) {
  //     const timer = setInterval(() => {
  //       setTimeLeft(prev => {
  //         if (prev <= 1) {
  //           handleFinish();
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }
  // }, [started, timeLeft, finished]);

  useEffect(() => {
    if (!started || finished) return;
  
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [started, finished]);
  

  const currentQuestion = paperQuestions[currentQuestionIdx];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleFinish = () => {
    setFinished(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (finished) {
    return <ResultsPage router={null} paper={paper} questions={paperQuestions} answers={answers} timeTaken={paper.time_limit_minutes * 60 - timeLeft} />;
  }

  if (!started) {
    return (
      <div className="flex items-center justify-center min-h-full p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Timer className="text-indigo-600 dark:text-indigo-300" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{paper?.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You have {paper?.time_limit_minutes} minutes to complete this test</p>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-yellow-800 dark:text-yellow-300 font-medium mb-2">Important:</p>
            <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
              <li>• Timer starts immediately</li>
              <li>• Auto-submit when time ends</li>
              <li>• All questions must be attempted</li>
            </ul>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  console.log("paperQuestions", paperQuestions);

  return (
   <section>
     <div className="flex flex-col h-full">
      {/* Timer Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestionIdx + 1} of {paperQuestions.length}
            </span>
            <div className="flex gap-1">
              {paperQuestions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    answers[paperQuestions[idx].id] ? 'bg-green-500' : idx === currentQuestionIdx ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timeLeft < 60 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
            <Clock size={20} />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
            <QuestionRenderer
              question={currentQuestion}
              answer={answers[currentQuestion.id]}
              onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIdx === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft size={20} />
            Previous
          </button>

          {currentQuestionIdx === paperQuestions.length - 1 ? (
            <button
              onClick={handleFinish}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Finish Test
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIdx(prev => Math.min(paperQuestions.length - 1, prev + 1))}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Next
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
   </section>
  );
}

export default WorksheetPaperStart