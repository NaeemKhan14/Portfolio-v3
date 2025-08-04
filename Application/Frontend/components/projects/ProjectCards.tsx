'use client'

import { Card, CardHeader, CardBody, CardFooter, Divider } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProjectCards({
  projects,
}: {
  projects: ProjectList[]
}) {
  const router = useRouter()

  return (
    <>
      {projects.map((project) => (
        <Card
        role='project'
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
      }
    </>
  )
}
