import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle, Sliders, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockRoadmap } from './data/dumpData';
import RoadMapList from './components/RoadMapList';
import MoreInfoModal from './components/Modals/MoreInfoModal';
import { generatePlan, resumePlan } from '../../../services/aiPlanner';
import { toast } from 'react-toastify';

const CreateAIPlan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [showMissingInfoModal, setShowMissingInfoModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [threadId, setThreadId] = useState(null);
  
  // Missing Info State
  const [missingInfo, setMissingInfo] = useState({
    level: 'Intermediate',
    duration: 8,
    durationUnit: 'weeks',
    goal: 'Build a Project',
    perDayHours: 2,
    feedback: '',
    studyDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    }
  });

  // Approval Integrations State
  const [approvalIntegrations, setApprovalIntegrations] = useState({
    calendar: false,
    drive: false,
    dashboard: true
  });



  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setShowMissingInfoModal(true);
    return;

    // startGeneration();
  };

  const startGeneration = async () => {
    try {
    setLoading(true);
    if (threadId) {
      // making string feedback from the missingInfo
      const feedback = `I want to modify the plan. The update info is 
      feedback: ${missingInfo.feedback}
      Level: ${missingInfo.level}
      Duration: ${missingInfo.duration} ${missingInfo.durationUnit}
      Goal: ${missingInfo.goal}
      Study Days: ${missingInfo.studyDays.monday ? 'Monday' : ''} ${missingInfo.studyDays.tuesday ? 'Tuesday' : ''} ${missingInfo.studyDays.wednesday ? 'Wednesday' : ''} ${missingInfo.studyDays.thursday ? 'Thursday' : ''} ${missingInfo.studyDays.friday ? 'Friday' : ''} ${missingInfo.studyDays.saturday ? 'Saturday' : ''} ${missingInfo.studyDays.sunday ? 'Sunday' : ''}
      Per Day Hours: ${missingInfo.perDayHours}
      `;
      const payload = {
        thread_id: threadId,
        feedback: feedback,
      };
      console.log(payload);
      const response = await resumePlan(payload);
      console.log("update response", response?.result?.roadmap);
      setGeneratedPlan(response?.result);
      setLoading(false);

    }else{
      const payload = {
        user_prompt: prompt,
        user_current_level: missingInfo.level,
        demand_duration: missingInfo.duration + " " + missingInfo.durationUnit,
        primary_goal: missingInfo.goal,
      };

      const response = await generatePlan(payload);
      setThreadId(response?.result?.thread_id);
      setGeneratedPlan(response.result?.roadmap?.roadmap);
      setLoading(false);
    }
     
    } catch (error) {
      console.error(error);
    }
  };

  const submitMissingInfo = () => {

    setShowMissingInfoModal(false);

    if (!generatedPlan) {
    startGeneration();
    } else {
      startGeneration();
      // If modifying, just close the modal and update the plan
      setIsModifying(false);
      // Here you could regenerate the plan with new settings if needed
    }
  };

  const handleModify = () => {
    setIsModifying(true);
    setShowMissingInfoModal(true);
  };

  const handleApprove = async () => {
    // setShowApprovalModal(true);
    try {
      setLoading(true);
      const payload = {
        thread_id: threadId,
        feedback: "Yes",
      };
    await resumePlan(payload);
      toast.success('Plan approved successfully');
      setLoading(false);
      navigate(`/dashboard/ai-planner`);
    } catch (error) { 
      console.error(error);
    }
  };

  const confirmApproval = async () => {
    try {
      
      setLoading(true);
      const payload = {
        thread_id: threadId,
        feedback: "Yes",
      };
      // const response = await resumePlan(payload);
      setShowApprovalModal(false);
      // Simulate success and redirect
      setLoading(false);
      toast.success('Plan approved successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const [expandedPhases, setExpandedPhases] = useState({});
  const [expandedDays, setExpandedDays] = useState({});

  const togglePhase = (phaseIndex) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseIndex]: !prev[phaseIndex]
    }));
  };

  const toggleDay = (phaseIndex, dayName) => {
    const key = `${phaseIndex}-${dayName}`;
    setExpandedDays(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getDayName = (dayKey) => {
    const dayNames = {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    };
    return dayNames[dayKey] || dayKey;
  };

  if (loading && !generatedPlan && !showApprovalModal) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Generating Your Personalized Roadmap...</h3>
        <p className="text-gray-500 mt-2">Analyzing your goals and creating the perfect learning path.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/dashboard/ai-planner')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-2">
          <ArrowLeft size={18} /> Back to AI Planner
        </button>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Sparkles className="text-blue-500" />
          AI Learning Planner
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Turn your learning goals into actionable roadmaps in seconds.
        </p>
      </div>

      {/* 1. Prompt Section */}
      {!generatedPlan && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What do you want to learn?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: I want to learn Node.js in 8 weeks as a backend developer"
            className="w-full h-32 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-gray-900 dark:text-white transition-all"
          />
          <div className="flex justify-between mt-4">
             <button 
              onClick={() => setPrompt('')}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Sparkles size={18} />
              Generate Plan
            </button>
          </div>
        </div>
      )}

      {/* 2. Missing Info Modal */}
      <MoreInfoModal
        isOpen={showMissingInfoModal}
        onClose={() => {
          setShowMissingInfoModal(false);
          setIsModifying(false);
        }}
        missingInfo={missingInfo}
        setMissingInfo={setMissingInfo}
        onSubmit={submitMissingInfo}
        isModifyMode={isModifying}
      />

      {/* 3. Generated Roadmap Review */}
      {generatedPlan && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          
          <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
             <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Learning Roadmap</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {generatedPlan?.roadmap?.length || 0} Phases • {missingInfo.duration} Weeks • {missingInfo.level}
                </p>
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={handleModify}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
                >
                  <Sliders size={16} />
                  Modify
                </button>
             </div>
          </div>


          {/* Review Accordion - Moved to RoadMapList Component */}
          <RoadMapList
            roadmap={generatedPlan?.roadmap}
            expandedPhases={expandedPhases}
            expandedDays={expandedDays}
            togglePhase={togglePhase}
            toggleDay={toggleDay}
            getDayName={getDayName}
          />

          {/* Action Footer */}
          <div className="flex justify-end pt-4 pb-12">
             <button 
               onClick={handleApprove}
               className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-lg font-bold flex items-center gap-2"
             >
               <CheckCircle size={20} />
               Approve Plan
             </button>
          </div>
        </div>
      )}

      {/* 5. Approval Flow Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
           <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Great Choice! 🚀</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Let's integrate this plan with your schedule so you stay on track.</p>
              
              <div className="space-y-4 mb-8">
                 <div 
                   onClick={() => setApprovalIntegrations(prev => ({...prev, dashboard: !prev.dashboard}))}
                   className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${approvalIntegrations.dashboard ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">ET</div>
                       <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">EduTalks Dashboard</h4>
                          <p className="text-xs text-gray-500">Add to your learning widgets</p>
                       </div>
                    </div>
                    {approvalIntegrations.dashboard && <CheckCircle className="text-green-500" fill="currentColor" />}
                 </div>

                 <div 
                   onClick={() => setApprovalIntegrations(prev => ({...prev, calendar: !prev.calendar}))}
                   className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${approvalIntegrations.calendar ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">G</div>
                       <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Google Calendar</h4>
                          <p className="text-xs text-gray-500">Schedule daily sessions</p>
                       </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${approvalIntegrations.calendar ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                       {approvalIntegrations.calendar && <CheckCircle size={14} />}
                    </div>
                 </div>

                 <div 
                   onClick={() => setApprovalIntegrations(prev => ({...prev, drive: !prev.drive}))}
                   className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${approvalIntegrations.drive ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">D</div>
                       <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Google Drive</h4>
                          <p className="text-xs text-gray-500">Create resource folder</p>
                       </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${approvalIntegrations.drive ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                       {approvalIntegrations.drive && <CheckCircle size={14} />}
                    </div>
                 </div>
              </div>

              <div className="flex gap-3">
                 <button 
                   onClick={() => setShowApprovalModal(false)}
                   className="flex-1 py-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                 >
                   Back
                 </button>
                 <button 
                   onClick={confirmApproval}
                   className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                 >
                   Start Learning <ArrowRight size={18} />
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Loading Overlay for Approval */}
      {loading  && (
         <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex flex-col items-center justify-center z-[60]">
             <Loader2 className="w-16 h-16 text-green-500 animate-spin mb-4" />
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Setting up everything...</h2>
             <p className="text-gray-500 dark:text-gray-400 mt-2">Connecting to your tools and creating the dashboard.</p>
         </div>
      )}

    </div>
  );
};

export default CreateAIPlan;
