import BlogPostsList from '@/components/blog/BlogPostsList'
import { fetchFromApi } from '@/lib/api-fetcher'

export default async function BlogPage() {
  try {
    const data = await fetchFromApi<BlogPostList>('/posts?sort=Date&depth=1')
    const posts = data.docs

    return <BlogPostsList posts={posts} />
  } catch {
    throw new Error('Error in retrieving blog posts from the server')
  }
}
