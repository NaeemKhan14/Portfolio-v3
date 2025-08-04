import { fetchFromApi } from '@/lib/api-fetcher'
import { ApiResponse } from '@/types/ApiResponse'
import { Divider } from '@heroui/react'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'

export default async function BlogPostContent({ slug }: { slug: string }) {
    const param = await slug
    const data = await fetchFromApi<ApiResponse<BlogPost>>(
        `/posts?where[slug][equals]=${param}&depth=1`
    )

    const post = data?.docs?.[0]

    if (!post) return notFound()

    return (
        <div className='mx-auto flex flex-col md:max-w-2xl'>
            <h1 className='mb-6 text-center text-3xl font-bold'>{post.title}</h1>
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
