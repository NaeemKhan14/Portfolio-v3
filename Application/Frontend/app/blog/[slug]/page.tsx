import BlogPostContent from '@/components/blog/BlogPostContent'
import EmptyPageLayout from '@/components/ui/EmptyPageWrapper'

type PageParams = {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: PageParams) {
  const param = await params

  return (
    <EmptyPageLayout>
      <BlogPostContent slug={param.slug} />
    </EmptyPageLayout>
  )
}
