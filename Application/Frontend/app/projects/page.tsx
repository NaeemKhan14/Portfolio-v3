import ProjectsList from '@/components/projects/ProjectsList'
import EmptyPageLayout from '@/components/ui/EmptyPageWrapper'

export default async function ProjectsPage({ 
  searchParams 
}: { 
  searchParams?: { page?: string } 
}) {
  const pageNum = await searchParams
  const currentPage = Number(pageNum?.page || 1)

  return (
    <EmptyPageLayout title='Certificates'>
      <ProjectsList currentPage={currentPage} />
    </EmptyPageLayout>
  )
}