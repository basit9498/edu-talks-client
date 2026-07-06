import React from 'react'
import { CheckCircle, XCircle } from 'lucide-react';

const ResultsPage = ({ navigate, paper, questions, answers, timeTaken }) => {
  console.log("questions", questions);
  console.log("answers", answers);
  console.log("timeTaken", timeTaken);
  console.log("paper", paper);
    const gradeAnswers = () => {
      let correct = 0;
      let incorrect = 0;
      let manual = 0;
  
      const results = questions.map(q => {
        const userAnswer = answers[q.id];
        
        if (q.question_type === 'mcqs') {
          const isCorrect = userAnswer === q.question_options[q.correct_answer[0]];
          if (isCorrect) correct++;
          else incorrect++;
          return { questionId: q.id, correct: isCorrect, type: 'auto' };
        }
        
        if (q.question_type === 'fill_in_the_blank') {
          const isCorrect = userAnswer === q.question_options[q.correct_answer[0]];
          if (isCorrect) correct++;
          else incorrect++;
          return { questionId: q.id, correct: isCorrect, type: 'auto' };
        }
        
        // if (q.question_type === 'short_question') {
        //   if (!userAnswer) {
        //     incorrect++;
        //     return { questionId: q.id, correct: false, type: 'auto' };
        //   }
        //   const isCorrect = Object.values(q.question_options).some(keyword => 
        //     userAnswer.toLowerCase().includes(keyword.toLowerCase())
        //   );
        //   if (isCorrect) correct++;
        //   else incorrect++;
        //   return { questionId: q.id, correct: isCorrect, type: 'keyword' };
        // }
        
        // if (q.question_type === 'long_answer') {
        //   manual++;
        //   return { questionId: q.id, correct: null, type: 'manual' };
        // }
      });
  
      return { correct, incorrect, manual, results };
    };
  
    const { correct, incorrect, manual, results } = gradeAnswers();
    const score = Math.round((correct / (correct + incorrect)) * 100);
  
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}m ${secs}s`;
    };
  
    return (
      <section>
      <div className="space-y-6"> 
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-6 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-indigo-600 dark:text-indigo-300" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Test Complete!</h2>
            <p className="text-gray-600 dark:text-gray-400">{paper?.title}</p>
          </div>
  
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center border border-green-200 dark:border-green-800">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{score}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-800">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{correct}/{correct + incorrect}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Correct</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-800">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{formatTime(timeTaken)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Time Taken</p>
            </div>
          </div>
  
          {manual > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>{manual}</strong> long answer question{manual > 1 ? 's' : ''} require manual review
              </p>
            </div>
          )}
  
          <div className="flex gap-3">
            <button
              onClick={() => router.navigate('worksheets')}
              className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Back to Worksheets
            </button>
            <button
              onClick={() => router.navigate('paper-attempt', { paperId: paper.id })}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Retry Test
            </button>
          </div>
        </div>
  
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Answer Review</h3>
          {questions.map((q, idx) => {
            const result = results[idx];
            const userAnswer = answers[q.id];
  
            return (
              <div key={q.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-medium text-gray-500 dark:text-gray-400">Question {idx + 1}</span>
                  {result?.is_fixed_answer  ? (
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full font-medium">
                      Manual Review
                    </span>
                  ) : result?.correct ? (
                    <CheckCircle className="text-green-500 dark:text-green-400" size={20} />
                  ) : (
                    <XCircle className="text-red-500 dark:text-red-400" size={20} />
                  )}
                </div>
  
                <p className="text-gray-900 dark:text-white font-medium mb-4">{q.question}</p>
  
                {q.question_type === 'mcqs' && (
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${userAnswer === q.question_options[q.correct_answer[0]] ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'}`}>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Your answer:</p>
                      <p className="font-medium text-gray-900 dark:text-white">{userAnswer || 'Not answered'}</p>
                    </div>
                    {userAnswer !== q.question_options[q.correct_answer[0]] && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Correct answer:</p>
                        <p className="font-medium text-gray-900 dark:text-white">{q.question_options[q.correct_answer[0]]}</p>
                      </div>
                    )}
                  </div>
                )}
  
                {q.question_type === 'fill_in_the_blank' && (
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${userAnswer === q.question_options[q.correct_answer[0]] ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'}`}>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Your answer:</p>
                      <p className="font-medium text-gray-900 dark:text-white">{userAnswer || 'Not answered'}</p>
                    </div>
                    {userAnswer !== q.question_options[q.correct_answer[0]] && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Correct answer:</p>
                        <p className="font-medium text-gray-900 dark:text-white">{q.question_options[q.correct_answer[0]]}</p>
                      </div>
                    )}
                  </div>
                )}
{/*   
                {q.question_type === 'short_question' && (
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${result.correct ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'}`}>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Your answer:</p>
                      <p className="font-medium text-gray-900 dark:text-white">{userAnswer || 'Not answered'}</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Expected keywords:</p>
                      <p className="font-medium text-gray-900 dark:text-white">{Object.values(q.question_options).join(', ')}</p>
                    </div>
                  </div>
                )}
  
                {q.question_type === 'long_answer' && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your answer:</p>
                    <p className="text-gray-900 dark:text-white">{userAnswer || 'Not answered'}</p>
                  </div>
                )} */}
              </div>
            );
          })}
        </div>
      </div>
      </section>
    );
  };

  export default ResultsPage;