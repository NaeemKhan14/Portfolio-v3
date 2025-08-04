import { PaginationWrapper } from '@/components/ui/PaginationWrapper'
import { fetchFromApi } from '@/lib/api-fetcher'
import { ApiResponse } from '@/types/ApiResponse'
import { notFound } from 'next/navigation'
import ProjectCards from './ProjectCards'

export default async function ProjectsList({
  currentPage,
  limit = 4
}: {
  currentPage: number
  limit?: number
}) {

  try {
    const data = await fetchFromApi<ApiResponse<ProjectList>>(`/projects?sort=createdAt&page=${currentPage}&limit=${limit}`)
    const { docs: projects, totalPages } = data

    if (currentPage > totalPages) notFound()

    return (
      <>
        {projects.length === 0 ? (
          <div className='py-12 text-center'>
            <h2 className='mb-2 text-xl font-semibold'>No projects yet</h2>
            <p className='text-gray-500'>Check back soon for updates!</p>
          </div>
        )
          : <ProjectCards projects={projects} />
        }

        {totalPages > 1 && (
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
