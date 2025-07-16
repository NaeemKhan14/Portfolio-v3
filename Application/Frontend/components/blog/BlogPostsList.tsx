'use client'

import { Card, CardHeader, CardBody, CardFooter, Divider } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BlogPostsList({ posts }: { posts: BlogPostList[] }) {
  const router = useRouter()

  return (
    <div className='mx-auto flex flex-col md:max-w-2xl'>
      <h1 className='mb-6 text-center text-3xl font-bold'>Blog Posts</h1>
      <Divider className='mb-8' />

      {posts.length === 0 ? (
        <div className='py-12 text-center'>
          <h2 className='mb-2 text-xl font-semibold'>No posts yet</h2>
          <p className='text-gray-500'>Check back later for new content.</p>
        </div>
      ) : (
        posts.map((post) => (
          <Card
            key={post.id}
            className='bg-black-900/100 mb-6 border border-gray-500 transition-all hover:shadow-md hover:shadow-gray-400 dark:border-gray-700 dark:hover:shadow-sm dark:hover:shadow-white'
            isHoverable
            isPressable
            onPress={() => router.push(`/blog/${post.slug}`)}
          >
            <CardHeader className='flex flex-col text-2xl font-semibold'>
              <p>{post.title}</p>
            </CardHeader>
            <Divider />
            <CardBody className='w-full items-center'>
              <p>{post.short_desc}</p>
            </CardBody>
            <CardFooter className='flex items-center justify-between'>
              <span className='bg-danger dark:bg-danger-200 rounded px-2 py-1 text-sm font-medium text-white'>
                {post.category.name || 'Uncategorized'}
              </span>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                {new Date(post.date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
              <Link
                className='text-danger text-sm font-medium hover:underline'
                href={`/blog/${post.slug}`}
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
