import BlogPostsList from '@/components/blog/BlogPostsList'
import { fetchFromApi } from '@/lib/payload/fetcher'

export default async function BlogPage() {
  const data = await fetchFromApi<BlogPostList>('/posts?sort=createdAt&depth=1')
  const posts = data.docs

  return <BlogPostsList posts={posts} />
}
