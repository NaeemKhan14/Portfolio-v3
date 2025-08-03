import { render, screen } from '@testing-library/react'
import BlogPostsList from '../BlogPostsList'
import { fetchFromApi } from '@/lib/api-fetcher'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

jest.mock('@/lib/api-fetcher')

describe('BlogPostsList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const post: BlogPost = {
    id: '1',
    slug: 'test-post',
    title: 'Test Post',
    short_desc: 'Short description here.',
    mdxContent: 'This is test content in MDX format.',
    date: new Date('2023-01-01T00:00:00.000Z'),
    category: {
      id: '1',
      name: 'Tech',
    },
  }

  it('renders "No posts yet" when posts array is empty', () => {
    render(<BlogPostsList posts={[]} />)
    expect(screen.getByText(/No posts yet/i)).toBeInTheDocument()
    expect(screen.getByText(/Check back later/i)).toBeInTheDocument()
  })

  it('renders posts correctly', () => {
    render(<BlogPostsList posts={[post]} />)

    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(screen.getByText(post.short_desc)).toBeInTheDocument()
    expect(screen.getByText(post.category.name)).toBeInTheDocument()
    expect(screen.getByText(/Read more/i)).toBeInTheDocument()
    expect(screen.getByText('01/01/2023')).toBeInTheDocument()
  })

  it('has correct link for posts', () => {
    render(<BlogPostsList posts={[post]} />)
    const readMoreLink = screen.getByRole('link', { name: 'Read more' })
    expect(readMoreLink).toHaveAttribute('href', `/blog/${post.slug}`)
  })

  it('throws a custom error when fetchFromApi fails', async () => {
    const mockFetch = fetchFromApi as jest.Mock
    mockFetch.mockRejectedValueOnce(new Error('Error in retrieving blog posts from the server'))

    const { default: BlogPage } = await import('../../../app/blog/page')

    await expect(BlogPage()).rejects.toThrow(
      'Error in retrieving blog posts from the server',
    )
  })

})
