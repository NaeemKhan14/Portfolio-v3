import { render, screen } from '@testing-library/react'
import BlogPostPage from '@/app/blog/[slug]/page'
import { fetchFromApi } from '@/lib/api-fetcher'

// Mock next/navigation since we're using notFound()
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}))

// Mock the API fetcher
jest.mock('@/lib/api-fetcher', () => ({
  fetchFromApi: jest.fn(),
}))

const mockCategory: BlogPostCategory = {
  id: 'cat-1',
  name: 'Technology',
}

const mockPost: BlogPost = {
  id: 'post-1',
  title: 'Test Post',
  slug: 'test-post',
  short_desc: 'This is a short description',
  date: new Date('2023-06-15'),
  mdxContent: 'This is test content.',
  category: mockCategory,
}

describe('BlogPostPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders post data correctly', async () => {
    // Mock successful API response
    ;(fetchFromApi as jest.Mock).mockResolvedValue({
      docs: [mockPost],
    })

    const params = { slug: mockPost.slug }
    const container = await BlogPostPage({ params })
    render(container)

    // Verify all content renders correctly
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      mockPost.title,
    )
    expect(screen.getByText(mockCategory.name)).toBeInTheDocument()
    expect(screen.getByText('15 June, 2023')).toBeInTheDocument()
    expect(screen.getByText('This is test content.')).toBeInTheDocument()
  })

  it('handles not found posts', async () => {
    // Mock empty response
    ;(fetchFromApi as jest.Mock).mockResolvedValue({
      docs: [],
    })

    const params = { slug: 'non-existent-post' }
    const notFound = require('next/navigation').notFound

    await BlogPostPage({ params })

    expect(notFound).toHaveBeenCalled()
  })

  it('formats date correctly', async () => {
    const testDate = new Date('2023-12-25')
    ;(fetchFromApi as jest.Mock).mockResolvedValue({
      docs: [
        {
          ...mockPost,
          date: testDate,
        },
      ],
    })

    const params = { slug: mockPost.slug }
    const container = await BlogPostPage({ params })
    render(container)

    expect(screen.getByText('25 December, 2023')).toBeInTheDocument()
  })
})
