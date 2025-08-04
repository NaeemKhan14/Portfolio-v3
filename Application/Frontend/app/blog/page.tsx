import BlogPostsList from '@/components/blog/BlogPostsList'
import { PaginationWrapper } from '@/components/ui/PaginationWrapper'
import { fetchFromApi } from '@/lib/api-fetcher'
import { ApiResponse } from '@/types/ApiResponse'
import { notFound } from 'next/navigation'

export default async function BlogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const pageNum = await searchParams
  const currentPage = Number(pageNum?.page || 1)
  const limit = 4

  try {
    const data = await fetchFromApi<ApiResponse<BlogPostList>>(`/posts?sort=Date&depth=1&page=${currentPage}&limit=${limit}`)
    const { docs: posts, totalPages } = data

    if (currentPage > totalPages) notFound()

    return (
      <>
        <BlogPostsList posts={posts} />
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
