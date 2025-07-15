import prisma from '@/lib/prisma'
import { Divider } from '@heroui/react'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { MDXRemote } from 'next-mdx-remote-client/rsc'

type PageParams = {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: PageParams) {
  const param = await params
  const post = await prisma.post.findUnique({
    where: {
      slug: param.slug,
    },
    include: {
      category: true,
    },
  })

  if (!post) return notFound()

  const images = Array.isArray(post.images) ? (post.images as string[]) : []

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <h1 className='mb-4 text-4xl font-bold'>{post.title}</h1>

      <p className='mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500'>
        {post.category?.name && (
          <span className='bg-danger dark:bg-danger-200 rounded px-2 py-1 text-sm font-medium text-white'>
            {post.category.name}
          </span>
        )}
        <span>{format(post.date, 'dd MMMM, yyyy')}</span>
      </p>

      <Divider className='mb-8' />

      {/* {images.length > 0 && (
        <div className="flex flex-col gap-4 mb-6">
          {images.map((img, i) => (
            <img key={i} src={img} alt={`img-${i}`} className="rounded" />
          ))}
        </div>
      )} */}

      <div className='prose dark:prose-invert'>
        <MDXRemote source={post.mdxContent} />
      </div>
    </div>
  )
}
