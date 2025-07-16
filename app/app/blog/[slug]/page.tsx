import prisma from '@/lib/prisma';
import { Divider } from '@heroui/react';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

type PageParams = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: PageParams) {
  const param = await params
  const post = await prisma.post.findUnique({
    where: {
      slug: param.slug,
    },
    include: {
      category: true
    }
  });

  if (!post) return notFound();

  const images = Array.isArray(post.images) ? (post.images as string[]) : [];

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

      {/* {images.length > 0 && (
        <div className="flex flex-col gap-4 mb-6">
          {images.map((img, i) => (
            <img key={i} src={img} alt={`img-${i}`} className="rounded" />
          ))}
        </div>
      )} */}

      <div className="prose dark:prose-invert">{post.mdxContent}</div>
    </div>
  );
}