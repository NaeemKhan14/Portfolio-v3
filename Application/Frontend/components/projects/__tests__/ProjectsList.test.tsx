import { render, screen } from '@testing-library/react'
import { fetchFromApi } from '@/lib/api-fetcher'
import { notFound } from 'next/navigation'
import ProjectsList from '../ProjectsList'

jest.mock('@/lib/api-fetcher')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
  usePathname: jest.fn().mockReturnValue('/'),
  notFound: jest.fn(),
}))

// Mock ProjectCards with proper implementation
jest.mock('@/components/projects/ProjectCards', () => ({
  __esModule: true,
  default: ({ projects }: { projects: any[] }) => (
    <div data-testid="project-cards">
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  )
}))

// Mock PaginationWrapper to avoid hook issues
jest.mock('@/components/ui/PaginationWrapper', () => ({
  __esModule: true,
  PaginationWrapper: ({ currentPage, totalPages }: any) => (
    <div data-testid="pagination-wrapper">
      Pagination: {currentPage} of {totalPages}
    </div>
  )
}))

const mockApiResponse = {
  docs: [
    {
      id: 'proj-1',
      slug: 'next-dashboard',
      title: 'Next.js Dashboard',
      short_desc: 'An interactive admin panel built with Next.js and Tailwind CSS.',
    }
  ],
  totalPages: 3
}

describe('ProjectsList', () => {
  const mockFetchFromApi = fetchFromApi as jest.MockedFunction<typeof fetchFromApi>
  
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetchFromApi.mockReset()
  })

  it('renders "No projects" when there are no projects', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      docs: [],
      totalPages: 1
    } as any)

    const Component = await ProjectsList({ currentPage: 1 })
    render(Component)
    
    expect(screen.getByText('No projects yet')).toBeInTheDocument()
    expect(screen.getByText('Check back soon for updates!')).toBeInTheDocument()
    expect(screen.queryByTestId('project-cards')).not.toBeInTheDocument()
  })

  it('renders projects when data is available', async () => {
    mockFetchFromApi.mockResolvedValueOnce(mockApiResponse as any)

    const Component = await ProjectsList({ currentPage: 1 })
    render(Component)
    
    expect(screen.getByTestId('project-cards')).toBeInTheDocument()
    expect(screen.getByText('Next.js Dashboard')).toBeInTheDocument()
  })

  it('shows pagination when multiple pages exist', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      ...mockApiResponse,
      totalPages: 3
    } as any)

    const Component = await ProjectsList({ currentPage: 1 })
    render(Component)
    
    expect(screen.getByTestId('pagination-wrapper')).toBeInTheDocument()
    expect(screen.getByText(/Pagination: 1 of 3/)).toBeInTheDocument()
  })

  it('does not show pagination when only one page exists', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      ...mockApiResponse,
      totalPages: 1
    } as any)

    const Component = await ProjectsList({ currentPage: 1 })
    render(Component)
    
    expect(screen.queryByTestId('pagination-wrapper')).not.toBeInTheDocument()
  })

  it('calls notFound when currentPage exceeds totalPages', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      ...mockApiResponse,
      totalPages: 2
    } as any)

    await ProjectsList({ currentPage: 3 })
    expect(notFound).toHaveBeenCalled()
  })

  it('throws error when API fails', async () => {
    mockFetchFromApi.mockRejectedValueOnce(new Error('API error'))
    
    await expect(ProjectsList({ currentPage: 1 })).rejects.toThrow(
      'Error in retrieving projects from the server'
    )
  })

  it('uses correct API parameters', async () => {
    mockFetchFromApi.mockResolvedValueOnce(mockApiResponse as any)

    await ProjectsList({ currentPage: 2, limit: 6 })
    
    expect(mockFetchFromApi).toHaveBeenCalledWith(
      '/projects?sort=createdAt&page=2&limit=6'
    )
  })
})