'use client'

import { Card, CardHeader, CardBody, CardFooter, Divider } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BlogPostCards({ posts }: { posts: BlogPostList[] }) {
  const router = useRouter()

  return (
    <>
      {posts.map((post) => (
        <Card
          role='blog-post'
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
      }
    </>
  )
}
