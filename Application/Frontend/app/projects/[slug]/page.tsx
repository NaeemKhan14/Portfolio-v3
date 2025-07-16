import ImageGallery from '@/components/projects/ImageGallery'
import { fetchFromApi } from '@/lib/api-fetcher'
import { Divider } from '@heroui/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type PageParams = {
  params: {
    slug: string
  }
}

export default async function ProjectDetailPage({ params }: PageParams) {
  const param = await params
  const data = await fetchFromApi<Project>(
    `/projects?where[slug][equals]=${param.slug}&depth=1`,
  )
  const project = data?.docs?.[0]

  if (!project) return notFound()

  const images = Array.isArray(project.images) ? project.images : []

  return (
    <div className='mx-auto max-w-3xl px-4 py-8'>
      <h1 className='mb-4 text-center text-4xl font-bold'>{project.title}</h1>
      <Divider className='mb-10' />
      <div className='mb-6 w-full text-lg whitespace-pre-line'>
        {project.content}
      </div>

      {project.github_link?.trim() && (
        <>
          <div className='mb-10 text-right'>
            <Link
              href={project.github_link}
              target='_blank'
              rel='noopener noreferrer'
              className='text-danger hover:underline'
            >
              View on GitHub →
            </Link>
          </div>
        </>
      )}

      <Divider className='mb-10' />

      {images.length > 0 && (
        <>
          <h3 className='mb-4 text-center text-4xl font-bold'>Screenshots</h3>
          <ImageGallery images={images} />
        </>
      )}
    </div>
  )
}
