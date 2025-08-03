import { fetchFromApi } from '@/lib/api-fetcher'
import { ApiResponse } from '@/types/apiResponse'
import { Divider } from '@heroui/react'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'

type PageParams = {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: PageParams) {
  const param = await params
  const data = await fetchFromApi<ApiResponse<BlogPost>>(
    `/posts?where[slug][equals]=${param.slug}&depth=1`,
  )
  const post = data?.docs?.[0]

  if (!post) return notFound()

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

      <div className='prose dark:prose-invert'>{post.mdxContent}</div>
    </div>
  )
}
