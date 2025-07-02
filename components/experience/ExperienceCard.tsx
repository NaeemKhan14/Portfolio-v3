'use client'

import { useState } from 'react';
import { GraduationCap, BriefcaseBusiness } from 'lucide-react';
import { experiences } from '@/data/experience';

export default function ExperienceCard() {
  const [activeTab, setActiveTab] = useState<'education' | 'work'>('work');
  const activeExperiences = experiences[activeTab];

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Education & Experience
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('work')}
              className={`py-2 px-4 text-sm font-medium rounded-t-lg transition-colors ${activeTab === 'work'
                ? "text-white bg-danger dark:bg-danger-200 border-b-2 dark:border-red-500 border-red-600"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
             }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`py-2 px-4 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === "education"
                  ? "text-white bg-danger dark:bg-danger-200 border-b-2 dark:border-red-500 border-red-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            >
              Education
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-8 relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-red-200 dark:bg-danger-200 transform -translate-x-1/2" />

          {activeExperiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-12">
              {/* Icon container */}
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-danger-200 ring-4 ring-gray-100 dark:ring-gray-900">
                {activeTab === "education" ? (
                  <GraduationCap
                    className="w-5 h-5 text-danger dark:text-white"
                    strokeWidth={1}
                  />
                ) : (
                  <BriefcaseBusiness className="w-5 h-5 text-danger dark:text-white" />
                )}
              </div>
              {/* Content Card */}
              <div className="p-6 rounded-xl hover:shadow-gray-400 hover:shadow-md dark:hover:shadow-white dark:hover:shadow-sm border border-gray-500 dark:border-gray-700 transition-all">
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <span className="text-sm font-medium text-white bg-danger dark:bg-danger-200 px-2 py-1 rounded">
                    {exp.period}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 text-gray-600 dark:text-gray-300">
                  <p className="font-medium">{exp.institution}</p>
                  <span className="hidden sm:inline">•</span>
                  <p className="text-gray-500 dark:text-gray-400">
                    {exp.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
