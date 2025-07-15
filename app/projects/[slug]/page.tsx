import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Divider } from '@heroui/react'
import ImageGallery from '@/components/projects/ImageGallery'
import prisma from '@/lib/prisma'

type PageParams = {
  params: {
    slug: string
  }
}

export default async function ProjectDetailPage({ params }: PageParams) {
  const param = await params
  const project = await prisma.project.findUnique({
    where: {
      slug: param.slug,
    },
  })

  if (!project) return notFound()

  const images = project.images ? (project.images as string[]) : []

  return (
    <div className='mx-auto max-w-3xl px-4 py-8'>
      <h1 className='mb-4 text-center text-4xl font-bold'>{project.title}</h1>
      <Divider className='mb-10' />
      <div className='mb-6 w-full text-lg whitespace-pre-line'>
        {project.content}
      </div>
      <Divider className='mb-10' />

      {images.length > 0 && <ImageGallery images={images} />}

      {project.github_link && project.github_link.trim() !== '' && (
        <div className='text-right'>
          <Link
            href={project.github_link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-danger hover:underline'
          >
            View on GitHub →
          </Link>
        </div>
      )}
    </div>
  )
}
