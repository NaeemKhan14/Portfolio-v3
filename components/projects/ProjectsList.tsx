'use client'

import { Card, CardHeader, CardBody, CardFooter, Divider } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProjectsList({
  projects,
}: {
  projects: ProjectList[]
}) {
  const router = useRouter()

  return (
    <div className='mx-auto flex flex-col md:max-w-2xl'>
      <h1 className='mb-6 text-center text-3xl font-bold'>Projects</h1>
      <Divider className='mb-8' />

      {projects.length === 0 ? (
        <div className='py-12 text-center'>
          <h2 className='mb-2 text-xl font-semibold'>No projects yet</h2>
          <p className='text-gray-500'>Check back soon for updates!</p>
        </div>
      ) : (
        projects.map((project) => (
          <Card
            key={project.id}
            className='bg-black-900/100 mb-6 border border-gray-500 transition-all hover:shadow-md hover:shadow-gray-400 dark:border-gray-700 dark:hover:shadow-sm dark:hover:shadow-white'
            isHoverable
            isPressable
            onPress={() => router.push(`/projects/${project.slug}`)}
          >
            <CardHeader className='flex flex-col text-2xl font-semibold'>
              <p>{project.title}</p>
            </CardHeader>
            <Divider />
            <CardBody className='w-full items-center'>
              <p>{project.short_desc}</p>
            </CardBody>
            <CardFooter className='flex justify-end'>
              <Link
                className='text-danger text-sm font-medium hover:underline'
                href={`/projects/${project.slug}`}
                onClick={(e) => e.stopPropagation()}
              >
                Read more
              </Link>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
