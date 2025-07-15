'use client';

import { Card, CardHeader, CardBody, CardFooter, Divider } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BlogPostsList({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      <Divider className="mb-8" />

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
          <p className="text-gray-500">Check back later for new content.</p>
        </div>
      ) : (
        posts.map((post) => (
          <Card
            key={post.id}
            className="mb-6 bg-black-900/100 hover:shadow-gray-400 hover:shadow-md dark:hover:shadow-white dark:hover:shadow-sm border border-gray-500 dark:border-gray-700 transition-all"
            isHoverable
            isPressable
            onPress={() => router.push(`/blog/${post.slug}`)}
          >
            <CardHeader className="flex flex-col text-2xl font-semibold">
              <p>{post.title}</p>
            </CardHeader>
            <Divider />
            <CardBody className="w-full items-center">
              <p>{post.short_desc}</p>
            </CardBody>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm font-medium text-white bg-danger dark:bg-danger-200 px-2 py-1 rounded">
                {post.category?.name || 'Uncategorized'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </span>
              <Link
                className="text-sm font-medium text-danger hover:underline"
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
  );
}
