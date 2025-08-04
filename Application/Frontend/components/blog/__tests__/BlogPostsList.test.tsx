import { render, screen } from '@testing-library/react'
import { fetchFromApi } from '@/lib/api-fetcher'
import { notFound } from 'next/navigation'
import BlogPostsList from '../BlogPostsList'

jest.mock('@/lib/api-fetcher')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
  usePathname: jest.fn().mockReturnValue('/'),
  notFound: jest.fn(),
}))

// Mock BlogPostCards with proper implementation
jest.mock('@/components/blog/BlogPostCards', () => ({
  __esModule: true,
  default: ({ posts }: { posts: any[] }) => (
    <div data-testid="blog-cards">
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
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
      id: '1',
      title: 'Test Post',
      slug: 'test-post',
      short_desc: 'Test description',
      date: new Date(),
      category: { id: '1', name: 'Tech' }
    }
  ],
  totalPages: 3
}

describe('BlogPostsList', () => {
  const mockFetchFromApi = fetchFromApi as jest.MockedFunction<typeof fetchFromApi>
  
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetchFromApi.mockReset()
  })

  it('renders "No posts" when there are no posts', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      docs: [],
      totalPages: 1
    } as any)

    const Component = await BlogPostsList({ currentPage: 1 })
    render(Component)
    
    expect(screen.getByText('No posts yet')).toBeInTheDocument()
    expect(screen.getByText('Check back later for new content.')).toBeInTheDocument()
    expect(screen.queryByTestId('blog-cards')).not.toBeInTheDocument()
  })

  it('renders posts when data is available', async () => {
    mockFetchFromApi.mockResolvedValueOnce(mockApiResponse as any)

    const Component = await BlogPostsList({ currentPage: 1 })
    render(Component)
    
    expect(screen.getByTestId('blog-cards')).toBeInTheDocument()
    expect(screen.getByText('Test Post')).toBeInTheDocument()
  })

  it('shows pagination when multiple pages exist', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      ...mockApiResponse,
      totalPages: 3
    } as any)

    const Component = await BlogPostsList({ currentPage: 1 })
    render(Component)
    
    expect(screen.getByTestId('pagination-wrapper')).toBeInTheDocument()
    expect(screen.getByText(/Pagination: 1 of 3/)).toBeInTheDocument()
  })

  it('does not show pagination when only one page exists', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      ...mockApiResponse,
      totalPages: 1
    } as any)

    const Component = await BlogPostsList({ currentPage: 1 })
    render(Component)
    
    expect(screen.queryByTestId('pagination-wrapper')).not.toBeInTheDocument()
  })

  it('calls notFound when currentPage exceeds totalPages', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      ...mockApiResponse,
      totalPages: 2
    } as any)

    await BlogPostsList({ currentPage: 3 })
    expect(notFound).toHaveBeenCalled()
  })

  it('throws error when API fails', async () => {
    mockFetchFromApi.mockRejectedValueOnce(new Error('API error'))
    
    await expect(BlogPostsList({ currentPage: 1 })).rejects.toThrow(
      'Error in retrieving blog posts from the server'
    )
  })

})