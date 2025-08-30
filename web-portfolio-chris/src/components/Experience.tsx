"use client";

import { useState } from "react";
import { experienceData } from '../data/experience';

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("exp-ample-fintech");

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Calculate dynamic height
  const getSectionHeight = () => {
    if (expandedId) {
      return "min-h-screen"; // Maintain full screen height when expanded
    }
    return "min-h-[600px]"; // Reduce height when collapsed
  };

  return (
    <section 
      id="experience" 
      className={`py-8 sm:py-12 bg-gray-900 transition-all duration-700 ease-in-out ${getSectionHeight()}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-center pb-12">
          Professional Experience
        </h2>
        
        <div className="space-y-4">
          {experienceData.map((exp) => {
            const isExpanded = expandedId === exp.id;
            
            return (
              <div key={exp.id} className="bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-900 ease-in-out">
                {/* Header Bar - Always Visible */}
                <div 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 cursor-pointer hover:from-purple-700 hover:to-purple-800 transition-all duration-900 ease-out"
                  onClick={() => toggleExpanded(exp.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-white font-semibold text-lg">
                      {exp.role} @ {exp.org}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-white text-sm">
                        {exp.time}
                      </div>
                      <div className="text-white transform transition-transform duration-900 ease-out">
                        {isExpanded ? (
                          <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Content with Smooth Animation */}
                <div 
                  className={`overflow-hidden transition-all duration-900 ease-in-out ${
                    isExpanded 
                      ? 'max-h-[1000px] opacity-100 scale-100' 
                      : 'max-h-0 opacity-0 scale-95'
                  }`}
                >
                  <div className="bg-gradient-to-br from-purple-700/20 via-purple-600/15 to-purple-500/10 px-6 py-6 transform transition-all duration-900 ease-out">
                    {/* Location and Website */}
                    <div className="flex items-center gap-6 mb-4 text-white">
                      <div className="flex items-center gap-2 transform transition-all duration-900">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{exp.location}</span>
                      </div>
                      {exp.website && (
                        <div className="flex items-center gap-2 transform transition-all duration-900">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <a href={`https://${exp.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-300 hover:text-white transition-all duration-900">
                            {exp.website}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Description with Staggered Animation */}
                    <div className="text-white text-sm leading-relaxed mb-6">
                      {exp.bullets.map((bullet, index) => (
                        <p 
                          key={index} 
                          className="mb-2 transform transition-all duration-900 ease-out"
                          style={{
                            transitionDelay: `${index * 100}ms`,
                            transform: isExpanded ? 'translateX(0) opacity-100' : 'translateX(-20px) opacity-0'
                          }}
                        >
                          • {bullet}
                        </p>
                      ))}
                    </div>

                    {/* Skills Tags with Pop-in Animation */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, index) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gradient-to-r from-purple-500/40 to-purple-600/40 text-white text-xs rounded-full border border-purple-400/50 transform transition-all duration-900 ease-out hover:from-purple-500/60 hover:to-purple-600/60"
                          style={{
                            transitionDelay: `${index * 50}ms`,
                            transform: isExpanded ? 'scale(1) opacity-100' : 'scale(0.8) opacity-0'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


