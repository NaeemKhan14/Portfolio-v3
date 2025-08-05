'use client'

import { siteConfig } from '@/config/site'
import Image from 'next/image'
import { GithubIcon, LinkedinIcon } from '../ui/icons'
import Link from 'next/link'
import { Chip, Divider } from '@heroui/react'
import DownloadButton from '@/hooks/DownloadButton'

export default function AboutSection() {
  return (
    <section className='py-8'>
      <div className='mx-auto mb-10 max-w-3xl px-6'>
        <div className='grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_2fr]'>
          {/* Profile Section */}
          <div className='flex flex-col items-center space-y-6'>
            <div className='relative'>
              <Image
                src='/images/pp.jpg'
                alt='Profile photo'
                className='border-warning-300 dark:border-warning/50 rounded-2xl border-2 shadow-sm'
                width={200}
                height={200}
                priority
                unoptimized
              />
              <div className='text-center'>
                <Chip
                  color='warning'
                  variant='solid'
                  className='dark:text-danger-300 absolute -bottom-3 left-1/2 -translate-x-1/2 text-sm font-medium text-pink-700'
                >
                  SOC Analyst & Software Dev
                </Chip>
              </div>
            </div>

            <div className='flex w-full flex-col items-center space-y-4'>
              <div className='flex space-x-4'>
                <Link
                  target='_blank'
                  aria-label='Linkedin'
                  href={siteConfig.links.linkedin}
                  className='rounded-full bg-gray-100 p-3 transition-transform hover:scale-125 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                >
                  <LinkedinIcon className='h-5 w-5 text-gray-700 dark:text-gray-300' />
                </Link>
                <Link
                  target='_blank'
                  aria-label='Github'
                  href={siteConfig.links.github}
                  className='rounded-full bg-gray-100 p-3 transition-transform hover:scale-125 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                >
                  <GithubIcon className='h-5 w-5 text-gray-700 dark:text-gray-300' />
                </Link>
              </div>

              <div className='grid w-full grid-cols-2 gap-3 md:grid-cols-1'>
                <DownloadButton
                  label='Cybersecurity CV'
                  filename='Naeem Khan CV (Cyber Security).pdf'
                />
                <DownloadButton
                  label='Software Developer CV'
                  filename='Naeem Khan CV.pdf'
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className='text-center lg:text-left'>
            <h1 className='text-danger mb-4 text-3xl font-bold'>Naeem Khan</h1>
            <p className='mb-6 leading-relaxed text-gray-700 dark:text-gray-300'>
              Cybersecurity specialist with software development expertise,
              focused on building secure systems and defending against modern
              threats. Combining SOC analyst certification with engineering
              experience to create resilient applications.
            </p>
            <div
              role='list'
              className='flex flex-wrap justify-center gap-2 lg:justify-start'
            >
              <Chip role='listitem' color='danger' variant='bordered'>
                Software Development
              </Chip>
              <Chip role='listitem' color='danger' variant='bordered'>
                SOC Analyst L1
              </Chip>
              <Chip role='listitem' color='danger' variant='bordered'>
                CTF Competitor
              </Chip>
            </div>
          </div>
        </div>
      </div>
      <Divider className='mx-auto max-w-3xl' />
    </section>
  )
}
