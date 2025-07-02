import { posts } from '@/data/blog_posts';
import { notFound } from 'next/navigation';
import { Divider } from '@heroui/react';

interface Props {
  params: { postId: string };
}

export default function BlogPostDetailPage({ params }: Props) {
  const post = posts.find((p) => p.postID.toString() === params.postId);

  if (!post) return notFound();

  return (
    <div className="flex flex-col md:max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">{post.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
        {post.date} • {post.category}
      </p>
      <Divider className="mb-6" />
      {post.images && post.images.length > 0 && (
        <div className="flex flex-col gap-4 mb-6">
          {post.images.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`Image ${idx + 1}`}
              className="rounded-lg shadow-md"
            />
          ))}
        </div>
      )}
      <article className="prose dark:prose-invert">
        <p>{post.content}</p>
      </article>
    </div>
  );
}
