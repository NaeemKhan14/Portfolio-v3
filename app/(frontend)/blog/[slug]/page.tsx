import { fetchFromApi } from '@/lib/payload/fetcher';
import { Divider } from '@heroui/react';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

type PageParams = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: PageParams) {
  const param = await params
  const data = await fetchFromApi<BlogPost>(`/posts?where[slug][equals]=${param.slug}&depth=1`)
  const post = data?.docs?.[0]

  if (!post) return notFound()

  const date = post.date ? new Date(post.date) : null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <p className="text-sm text-gray-500 mb-6 flex gap-2 items-center flex-wrap">
        {post.category?.name && (
          <span className="text-sm font-medium text-white bg-danger dark:bg-danger-200 px-2 py-1 rounded">
            {post.category.name}
          </span>
        )}
        <span>{format(post.date, 'dd MMMM, yyyy')}</span>
      </p>

      <Divider className="mb-8" />

      <div className="prose dark:prose-invert">{post.mdxContent}</div>
    </div>
  );
}