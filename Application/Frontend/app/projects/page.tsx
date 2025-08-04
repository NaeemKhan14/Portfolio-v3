import ProjectsList from '@/components/projects/ProjectsList'
import { PaginationWrapper } from '@/components/ui/PaginationWrapper'
import { fetchFromApi } from '@/lib/api-fetcher'
import { ApiResponse } from '@/types/ApiResponse'
import { notFound } from 'next/navigation'

export default async function ProjectsPage({ searchParams }: { searchParams?: { page?: string } }) {
  const pageNum = await searchParams
  const currentPage = Number(pageNum?.page || 1)
  const limit = 4

  try {
    const data = await fetchFromApi<ApiResponse<ProjectList>>(`/projects?sort=createdAt&page=${currentPage}&limit=${limit}`)
    const { docs: projects, totalPages } = data

    if (currentPage > totalPages) notFound()

    return (
      <>
        <ProjectsList projects={projects} />
        {
          totalPages > 1 && (
            <div className='mt-10 flex justify-center'>
              <PaginationWrapper
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          )
        }
      </>

    )
  } catch {
    throw new Error('Error in retrieving projects from the server')
  }
}
