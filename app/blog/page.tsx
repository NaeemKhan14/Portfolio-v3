import BlogPostsList from '@/components/blog/BlogPostsList';
import prisma from '@/lib/prisma';

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { date: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      short_desc: true,
      date: true,
      category: {
        select: {
          name: true
        }
      }
    }
  });

  return <BlogPostsList posts={posts} />;
}
