import React from 'react';
import { ChevronDown, ChevronRight, Calendar, Target, PenTool, BookOpen, Clock, CheckCircle2, Circle } from 'lucide-react';

const RoadMapList = ({ 
  roadmap, 
  expandedPhases, 
  expandedDays, 
  togglePhase, 
  toggleDay, 
  getDayName 
}) => {
  if (!roadmap || !roadmap.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {roadmap.map((phase, phaseIdx) => (
        <div key={phaseIdx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-all">
          {/* Phase Header */}
          <button 
            onClick={() => togglePhase(phaseIdx)}
            className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-colors text-left"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                {phaseIdx + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{phase.phase}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {phase.duration}</span>
                  <span className="flex items-center gap-1"><Target size={14} /> {phase.topics?.length || 0} Topics</span>
                  {phase.projects?.length > 0 && (
                    <span className="flex items-center gap-1"><PenTool size={14} /> {phase.projects.length} Project{phase.projects.length > 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>
            </div>
            {expandedPhases[phaseIdx] ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronRight size={20} className="text-gray-400" />}
          </button>
          
          {expandedPhases[phaseIdx] && (
            <div className="p-5 border-t border-gray-200 dark:border-gray-700 space-y-6">
              {/* Topics Overview */}
              {phase.topics && phase.topics.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <BookOpen size={16} className="text-blue-500" />
                    Key Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics.map((topic, tIdx) => (
                      <span key={tIdx} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm border border-blue-200 dark:border-blue-800">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly Plan - Days */}
              {phase.weekly_plan && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <Calendar size={16} className="text-purple-500" />
                    Weekly Schedule
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(phase.weekly_plan).map(([dayKey, dayData]) => {
                      if (dayData.status === "OFF") {
                        return (
                          <div key={dayKey} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{getDayName(dayKey).substring(0, 3)}</span>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-600 dark:text-gray-400">{getDayName(dayKey)} - Rest Day</h5>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      const dayKeyFull = `${phaseIdx}-${dayKey}`;
                      const isDayExpanded = expandedDays[dayKeyFull];

                      return (
                        <div key={dayKey} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleDay(phaseIdx, dayKey)}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors text-left"
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                                {getDayName(dayKey).substring(0, 3)}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900 dark:text-white">{getDayName(dayKey)}</h5>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-600 dark:text-gray-400">
                                  <span className="flex items-center gap-1"><Clock size={12} /> {dayData.daily_study_hours}</span>
                                  <span className="flex items-center gap-1">
                                    <BookOpen size={12} /> {dayData.time_split?.theory}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <PenTool size={12} /> {dayData.time_split?.practice}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {isDayExpanded ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
                          </button>

                          {isDayExpanded && (
                            <div className="p-4 bg-white dark:bg-gray-800 space-y-4 border-t border-gray-200 dark:border-gray-700">
                              {/* Theory Section */}
                              {dayData.theory && (
                                <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                                  <div className="flex items-center gap-2 mb-3">
                                    <BookOpen size={16} className="text-purple-600 dark:text-purple-400" />
                                    <h6 className="font-semibold text-purple-900 dark:text-purple-100">Theory ({dayData.time_split.theory})</h6>
                                  </div>
                                  <div className="space-y-3">
                                    <div>
                                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Topics:</p>
                                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                        {dayData.theory.topics?.map((topic, tIdx) => (
                                          <li key={tIdx}>{topic}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    {dayData.theory.checklist && dayData.theory.checklist.length > 0 && (
                                      <div>
                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Checklist:</p>
                                        <div className="space-y-2">
                                          {dayData.theory.checklist.map((item, cIdx) => (
                                            <div key={cIdx} className="flex items-center gap-2 text-sm">
                                              {item.status === "completed" ? (
                                                <CheckCircle2 size={16} className="text-green-500" />
                                              ) : (
                                                <Circle size={16} className="text-gray-400" />
                                              )}
                                              <span className={item.status === "completed" ? "text-gray-500 line-through" : "text-gray-700 dark:text-gray-300"}>
                                                {item.item}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Practice Section */}
                              {dayData.practice && (
                                <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4 border border-green-200 dark:border-green-800">
                                  <div className="flex items-center gap-2 mb-3">
                                    <PenTool size={16} className="text-green-600 dark:text-green-400" />
                                    <h6 className="font-semibold text-green-900 dark:text-green-100">Practice ({dayData.time_split.practice})</h6>
                                  </div>
                                  <div className="space-y-3">
                                    <div>
                                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Tasks:</p>
                                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                        {dayData.practice.tasks?.map((task, tIdx) => (
                                          <li key={tIdx}>{task}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    {dayData.practice.checklist && dayData.practice.checklist.length > 0 && (
                                      <div>
                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Checklist:</p>
                                        <div className="space-y-2">
                                          {dayData.practice.checklist.map((item, cIdx) => (
                                            <div key={cIdx} className="flex items-center gap-2 text-sm">
                                              {item.status === "completed" ? (
                                                <CheckCircle2 size={16} className="text-green-500" />
                                              ) : (
                                                <Circle size={16} className="text-gray-400" />
                                              )}
                                              <span className={item.status === "completed" ? "text-gray-500 line-through" : "text-gray-700 dark:text-gray-300"}>
                                                {item.item}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Projects */}
              {phase.projects && phase.projects.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <Target size={16} className="text-orange-500" />
                    Projects
                  </h4>
                  <div className="space-y-3">
                    {phase.projects.map((project, pIdx) => (
                      <div key={pIdx} className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                        <h5 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">{project.name}</h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{project.description}</p>
                        {project.skills_gained && project.skills_gained.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Skills Gained:</p>
                            <div className="flex flex-wrap gap-2">
                              {project.skills_gained.map((skill, sIdx) => (
                                <span key={sIdx} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoadMapList;
