import React from 'react'


// Question Renderer Component
const QuestionRenderer = ({ question, answer, onAnswer }) => {
  console.log("question", question);
  console.log("answer", answer);
  console.log("onAnswer", onAnswer);
  
    if (question.question_type === 'mcqs') {
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{question.question}</h3>
          <div className="space-y-3">
            {Object.values(question.question_options)?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => onAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answer === option
                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                }`}
              >
                <span className="text-gray-900 dark:text-white font-medium">{option}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }
  
    if (question.question_type === 'fill_in_the_blank') {
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{question.question}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select the correct answer:</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(question.question_options)?.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => onAnswer(choice)}
                className={`p-4 text-center rounded-lg border-2 transition-all ${
                  answer === choice
                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                }`}
              >
                <span className="text-gray-900 dark:text-white font-medium">{choice}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }
  
    if (question.question_type === 'short_question') {
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{question.question}</h3>
          <input
            type="text"
            value={answer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      );
    }
  
    if (question.question_type === 'long_answer') {
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{question.question}</h3>
          <textarea
            value={answer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="Write your detailed answer here..."
            rows={8}
            className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Minimum {question.minWords} words recommended
          </p>
        </div>
      );
    }
  
    return null;
  };

  export default QuestionRenderer;