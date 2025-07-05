import { posts } from '@/data/blog_posts';
import { Divider } from '@heroui/react';
import { notFound } from 'next/navigation';

type PageParams = {
  params: {
    post_id: string;
  };
};

export default async function BlogPostPage({ params }: PageParams) {

  const post_id = (await params).post_id;
  
  const post = posts.find(post_elem => post_elem.post_id === Number(post_id));

  if (!post) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        <span className='text-sm font-medium text-white bg-danger dark:bg-danger-200 px-2 py-1 rounded'>{post.category}</span>
        <span> {post.date} </span>
      </p>
      <Divider className='mb-8' />
      {post.images?.length > 0 && (
        <div className="flex flex-col gap-4 mb-6">
          {post.images.map((img, i) => (
            <img key={i} src={img} alt={`img-${i}`} className="rounded" />
          ))}
        </div>
      )}
      <div className="prose dark:prose-invert">{post.content}</div>
    </div>
  );
}
