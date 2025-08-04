import BlogPostsList from '@/components/blog/BlogPostsList'
import EmptyPageLayout from '@/components/ui/EmptyPageWrapper'

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams?: { page?: string } 
}) {
  const pageNum = await searchParams
  const currentPage = Number(pageNum?.page || 1)

  return (
    <EmptyPageLayout title='Blog Posts'>
      <BlogPostsList currentPage={currentPage} />
    </EmptyPageLayout>
  )
}