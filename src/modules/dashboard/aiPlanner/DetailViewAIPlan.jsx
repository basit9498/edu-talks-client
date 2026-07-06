import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlanById } from '../../../services/aiPlanner';
import RoadMapList from './components/RoadMapList';
import { ArrowLeft, Loader2, Calendar, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';

const DetailViewAIPlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [expandedPhases, setExpandedPhases] = useState({});
  const [expandedDays, setExpandedDays] = useState({});

  useEffect(() => {
    fetchPlan();
  }, [id]);

  const fetchPlan = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPlanById(id);
      setPlan(response.result);
    } catch (error) {
      console.error('Error fetching plan:', error);
      setError('Failed to load plan details');
      toast.error('Failed to load plan details');
    } finally {
      setLoading(false);
    }
  };

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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Loading Plan Details...</h3>
        <p className="text-gray-500 mt-2">Please wait while we fetch your learning roadmap.</p>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md">
          <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Plan</h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Plan not found'}</p>
          <button
            onClick={() => navigate('/dashboard/ai-planner')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Back to AI Planner
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <button 
          onClick={() => navigate('/dashboard/ai-planner')} 
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-2 mb-4"
        >
          <ArrowLeft size={18} /> Back to AI Planner
        </button>
      </div>

      {/* Plan Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="text-blue-500" size={24} />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{plan.title}</h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Created: {formatDate(plan.created_at)}</span>
              </div>
              {plan.updated_at && plan.updated_at !== plan.created_at && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Updated: {formatDate(plan.updated_at)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                {plan.is_completed ? (
                  <>
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-green-600 dark:text-green-400">Completed</span>
                  </>
                ) : (
                  <>
                    <Clock size={16} className="text-amber-500" />
                    <span className="text-amber-600 dark:text-amber-400">In Progress</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Summary */}
      {plan.roadmap && plan.roadmap.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Roadmap</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {plan.roadmap.length} Phase{plan.roadmap.length > 1 ? 's' : ''} • 
                {plan.roadmap.reduce((total, phase) => {
                  const duration = parseInt(phase.duration) || 0;
                  return total + duration;
                }, 0)} Total Duration
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Roadmap List */}
      {plan.roadmap && plan.roadmap.length > 0 ? (
        <RoadMapList
          roadmap={plan.roadmap}
          expandedPhases={expandedPhases}
          expandedDays={expandedDays}
          togglePhase={togglePhase}
          toggleDay={toggleDay}
          getDayName={getDayName}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-500 dark:text-gray-400">No roadmap data available for this plan.</p>
        </div>
      )}
    </div>
  );
};

export default DetailViewAIPlan;
