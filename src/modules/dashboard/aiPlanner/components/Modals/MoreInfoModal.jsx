import React from 'react';
import BaseModal from '../../../../../components/common/Modal/BaseModal';
import { AlertCircle, Clock, Calendar, CheckCircle2, Circle, MessageSquare } from 'lucide-react';

const MoreInfoModal = ({ isOpen, onClose, missingInfo, setMissingInfo, onSubmit, isModifyMode = false }) => {
  if (!isOpen) return null;

  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  const toggleStudyDay = (day) => {
    setMissingInfo({
      ...missingInfo,
      studyDays: {
        ...missingInfo.studyDays,
        [day]: !missingInfo.studyDays[day]
      }
    });
  };

  return (
    <BaseModal
      title={
        <div className="flex items-center gap-2">
          <AlertCircle className="text-amber-500" />
          {isModifyMode ? 'Modify Your Plan' : 'We need a bit more detail'}
        </div>
      }
      onClose={onClose}
      className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
    >
      <div className="overflow-y-auto flex-1 pr-2 -mr-2">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          {isModifyMode 
            ? 'Update your plan preferences and provide feedback to refine your learning roadmap.'
            : 'Please provide more information about your learning goals and current level.'
          }
        </p>
        
        <div className="space-y-5">
        {/* Current Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Level</label>
          <div className="flex gap-2">
            {['Beginner', 'Intermediate', 'Advanced'].map(l => (
              <button
                key={l}
                onClick={() => setMissingInfo({...missingInfo, level: l})}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg border-2 transition-all ${
                  missingInfo.level === l 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        
        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
          {missingInfo.duration <= 16 ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="1" 
                  max="16" 
                  value={missingInfo.duration}
                  onChange={(e) => setMissingInfo({...missingInfo, duration: parseInt(e.target.value)})}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex items-center gap-2 min-w-[130px] bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="font-semibold text-gray-900 dark:text-white min-w-[25px] text-center">
                    {missingInfo.duration}
                  </span>
                  <select
                    value={missingInfo.durationUnit}
                    onChange={(e) => setMissingInfo({...missingInfo, durationUnit: e.target.value})}
                    className="text-sm px-2 py-1 border-0 bg-transparent text-gray-900 dark:text-white focus:ring-0 focus:outline-none cursor-pointer"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setMissingInfo({...missingInfo, duration: 17})}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium"
              >
                Need more than 16? Enter custom duration
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="17"
                  value={missingInfo.duration}
                  onChange={(e) => setMissingInfo({...missingInfo, duration: parseInt(e.target.value) || 17})}
                  placeholder="Enter duration"
                  className="flex-1 px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                />
                <select
                  value={missingInfo.durationUnit}
                  onChange={(e) => setMissingInfo({...missingInfo, durationUnit: e.target.value})}
                  className="px-3 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setMissingInfo({...missingInfo, duration: 16})}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium"
              >
                Use range slider (1-16)
              </button>
            </div>
          )}
        </div>

        {/* Primary Goal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Goal</label>
          <select 
            value={missingInfo.goal}
            onChange={(e) => setMissingInfo({...missingInfo, goal: e.target.value})}
            className="w-full p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
          >
            <option value="Get a Job">Get a Job</option>
            <option value="Build a Project">Build a Project</option>
            <option value="Prepare for an Interview">Prepare for an Interview</option>
            <option value="Just for Fun">Just for Fun</option>
            <option value="Other">Other</option>
          </select>
          {missingInfo.goal === "Other" && (
            <input 
              type="text" 
              placeholder="Enter your goal" 
              value={missingInfo.otherGoal || ''}
              onChange={(e) => setMissingInfo({...missingInfo, otherGoal: e.target.value})}
              className="w-full p-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white mt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            />
          )}
        </div>

        {/* Additional fields for Modify Mode */}
        {isModifyMode && (
          <>
            {/* User Feedback/Prompt */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MessageSquare size={16} className="text-blue-500" />
                Your Feedback
              </label>
              <textarea
                value={missingInfo.feedback || ''}
                onChange={(e) => setMissingInfo({...missingInfo, feedback: e.target.value})}
                placeholder="Tell us what you'd like to change or improve in your learning plan..."
                rows={4}
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Provide specific feedback about what you want to modify in your plan
              </p>
            </div>

            {/* Per Day Hours */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock size={16} className="text-blue-500" />
                Per Day Hours
              </label>
              <div className="space-y-2">
                <input 
                  type="range" 
                  min="1" 
                  max="8" 
                  value={missingInfo.perDayHours || 2}
                  onChange={(e) => setMissingInfo({...missingInfo, perDayHours: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">1 hour</span>
                  <span className="font-semibold text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
                    {missingInfo.perDayHours || 2} {missingInfo.perDayHours === 1 ? 'hour' : 'hours'}
                  </span>
                  <span className="text-gray-500">8 hours</span>
                </div>
              </div>
            </div>

            {/* Study Days Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar size={16} className="text-blue-500" />
                Study Days
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Select the days you want to study
              </p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(dayNames).map(([dayKey, dayName]) => (
                  <button
                    key={dayKey}
                    onClick={() => toggleStudyDay(dayKey)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border-2 transition-all text-left ${
                      missingInfo.studyDays?.[dayKey]
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 shadow-sm'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {missingInfo.studyDays?.[dayKey] ? (
                      <CheckCircle2 size={18} className="text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Circle size={18} className="text-gray-400" />
                    )}
                    <span className="text-sm font-medium">{dayName}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button 
          onClick={onSubmit}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isModifyMode ? 'Save Changes & Update Plan' : 'Continue Generation'}
        </button>
        <button 
          onClick={onClose}
          className="w-full py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors rounded-lg"
        >
          Cancel
        </button>
      </div>
    </BaseModal>
  );
};

export default MoreInfoModal;
