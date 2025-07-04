'use client';

import { posts } from '@/data/blog_posts';
import { Card, CardHeader, CardBody, CardFooter, Divider } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      <Divider className="mb-8" />
      {posts.map((post) => (
        <Card
          key={post.post_id}
          className="mb-6 bg-black-900/100 hover:shadow-gray-400 hover:shadow-md dark:hover:shadow-white dark:hover:shadow-sm border border-gray-500 dark:border-gray-700 transition-all"
          isHoverable
          isPressable
          onPress={() => router.push(`/blog/${post.post_id}`)}
        >
          <CardHeader className="flex flex-col text-2xl font-semibold">
            <p>{post.title}</p>
            
          </CardHeader>
          <Divider />
          <CardBody className="w-full text-center">
            <p>{post.short_desc}</p>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-between">
            <p className='text-sm font-medium text-white bg-danger dark:bg-danger-200 px-2 py-1 rounded'>{post.category}</p>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mt-1">
              {post.date}
            </p>
            <Link
              className="text-sm font-medium text-danger hover:underline"
              href={`/blog/${post.post_id}`}
              onClick={(e) => e.stopPropagation()} // Prevent double nav if clicking link inside card
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
