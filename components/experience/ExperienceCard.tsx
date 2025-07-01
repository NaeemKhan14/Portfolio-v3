'use client'

import { useState } from 'react';
import { GraduationCap, BriefcaseBusiness  } from 'lucide-react';

const experiences = {
  education: [
    {
      id: 1,
      title: 'MSc: Computer Science (Cyber Security)',
      period: 'April 2023 - October 2024',
      institution: 'SRH Berlin University of Applied Sciences',
      location: 'Berlin, Germany'
    },
    {
      id: 2,
      title: 'BSc: Computer Science (Hons)',
      period: 'September 2017 - July 2021',
      institution: 'Heriot-Watt University',
      location: 'Dubai, United Arab Emirates'
    },
        {
      id: 3,
      title: 'Bachelor of Business Administration',
      period: 'September 2011 - July 2013',
      institution: 'ILMA University',
      location: 'Karachi, Pakistan'
    }
  ],
  work: [
    {
      id: 1,
      title: 'Full Stack Developer',
      period: 'January 2022 - January 2023',
      institution: 'Archirodon Construction (Overseas) Company Limited',
      location: 'Abu Dhabi, United Arab Emirates'
    },
    {
      id: 2,
      title: 'Software Developer Internship',
      period: 'November 2021 - December 2021',
      institution: 'Archirodon Construction (Overseas) Company Limited',
      location: 'Dubai, United Arab Emirates'
    },
    {
      id: 3,
      title: 'Junior Software Developer Internship',
      period: 'May 2019 - August 2019',
      institution: 'Chartercross Capital Management',
      location: 'Dubai, United Arab Emirates'
    },
    {
      id: 4,
      title: 'Client Relations Manager',
      period: 'March 2014 - January 2019',
      institution: 'Al-Nejoum Al-Khams Industries L.L.C.',
      location: 'Sharjah, United Arab Emirates'
    }
  ]
};

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
              className={`py-2 px-4 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'work'
                  ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-b-2 border-red-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`py-2 px-4 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'education'
                  ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-b-2 border-red-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Education
            </button>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="space-y-8 relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-red-200 dark:bg-red-900/50 transform -translate-x-1/2"></div>
          
          {activeExperiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-12">
              {/* Icon container */}
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 ring-4 ring-white dark:ring-gray-900">
                {activeTab === 'education' ? (
                  <GraduationCap strokeWidth={1} className="w-5 h-5 text-red-700 dark:text-red-400" />
                ) : (
                  <BriefcaseBusiness  className="w-5 h-5 text-red-700 dark:text-red-400" />
                )}
              </div>
              
              {/* Content Card */}
              <div className=" p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md dark:hover:shadow-gray-800/30">
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded">
                    {exp.period}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 text-gray-600 dark:text-gray-300">
                  <p className="font-medium">{exp.institution}</p>
                  <span className="hidden sm:inline">•</span>
                  <p className="text-gray-500 dark:text-gray-400">{exp.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
