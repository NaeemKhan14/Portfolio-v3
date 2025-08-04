import BlogPostCards from '@/components/blog/BlogPostCards'
import { PaginationWrapper } from '@/components/ui/PaginationWrapper'
import { fetchFromApi } from '@/lib/api-fetcher'
import { ApiResponse } from '@/types/ApiResponse'
import { notFound } from 'next/navigation'

export default async function BlogPostsList({
  currentPage,
  limit = 4
}: {
  currentPage: number
  limit?: number
}) {

  try {
    const data = await fetchFromApi<ApiResponse<BlogPostList>>(`/posts?sort=Date&depth=1&page=${currentPage}&limit=${limit}`)
    const { docs: posts, totalPages } = data

    if (currentPage > totalPages) notFound()

    return (
      <>
        {posts.length === 0 ? (
          <div className='py-12 text-center'>
            <h2 className='mb-2 text-xl font-semibold'>No posts yet</h2>
            <p className='text-gray-500'>Check back later for new content.</p>
          </div>
        ) : (
          <BlogPostCards posts={posts} />
        )}
        {totalPages > 1 && (
          <div className='mt-10 flex justify-center'>
            <PaginationWrapper
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        )}

      </>

    )
  } catch {
    throw new Error('Error in retrieving blog posts from the server')
  }
}
