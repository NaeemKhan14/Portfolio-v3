'use client'

import { useState } from 'react'
import { GraduationCap, BriefcaseBusiness } from 'lucide-react'
import { experiences } from '@/data/experience'
import { Divider } from '@heroui/react'

export default function ExperienceCard() {
  const [activeTab, setActiveTab] = useState<'education' | 'work'>('work')
  const activeExperiences = experiences[activeTab]

  return (
    <section className='py-8'>
      <div className='mx-auto mb-10 max-w-3xl md:px-6'>
        <h2 className='mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white'>
          Education & Experience
        </h2>

        {/* Tab Navigation */}
        <div className='mb-8 flex justify-center border-b border-gray-200 dark:border-gray-700'>
          <div className='flex space-x-2'>
            <button
              onClick={() => setActiveTab('work')}
              className={`rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'work'
                  ? 'bg-danger dark:bg-danger-200 border-b-2 border-red-600 text-white dark:border-red-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'education'
                  ? 'bg-danger dark:bg-danger-200 border-b-2 border-red-600 text-white dark:border-red-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Education
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className='relative space-y-8'>
          {/* Vertical line */}
          <div className='dark:bg-danger-200 absolute top-0 bottom-0 left-4 w-0.5 -translate-x-1/2 transform bg-red-200' />

          {activeExperiences.map((exp, index) => (
            <div key={exp.id} className='relative pl-12'>
              {/* Icon container */}
              <div className='dark:bg-danger-200 absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 ring-4 ring-gray-100 dark:ring-gray-900'>
                {activeTab === 'education' ? (
                  <GraduationCap
                    className='text-danger h-5 w-5 dark:text-white'
                    strokeWidth={1}
                  />
                ) : (
                  <BriefcaseBusiness className='text-danger h-5 w-5 dark:text-white' />
                )}
              </div>
              {/* Content Card */}
              <div className='rounded-xl border border-gray-500 p-6 transition-all hover:shadow-md hover:shadow-gray-400 dark:border-gray-700 dark:hover:shadow-sm dark:hover:shadow-white'>
                <div className='mb-2 flex flex-wrap justify-between gap-2'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    {exp.title}
                  </h3>
                  <span className='bg-danger dark:bg-danger-200 rounded px-2 py-1 text-sm font-medium text-white'>
                    {exp.period}
                  </span>
                </div>
                <div className='flex flex-wrap gap-1 text-gray-600 dark:text-gray-300'>
                  <p className='font-medium'>{exp.institution}</p>
                  <span className='hidden sm:inline'>•</span>
                  <p className='text-gray-500 dark:text-gray-400'>
                    {exp.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Divider className='mx-auto max-w-3xl' />
    </section>
  )
}
