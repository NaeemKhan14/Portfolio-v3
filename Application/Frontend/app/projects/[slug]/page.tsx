import ProjectDetailsContent from '@/components/projects/ProjectDetailsContent'
import EmptyPageLayout from '@/components/ui/EmptyPageWrapper'

type PageParams = {
  params: {
    slug: string
  }
}

export default async function ProjectDetailPage({ params }: PageParams) {
  const param = await params

  return (
    <EmptyPageLayout>
      <ProjectDetailsContent slug={param.slug} />
    </EmptyPageLayout>
  )
}