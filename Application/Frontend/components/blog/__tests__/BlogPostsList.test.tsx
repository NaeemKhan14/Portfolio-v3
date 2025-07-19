import { render, screen } from '@testing-library/react'
import BlogPostsList from '../BlogPostsList'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

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
    expect(
      screen.getByText(new Date(post.date).toLocaleDateString()),
    ).toBeInTheDocument()
  })

  it('has correct link for posts', () => {
    render(<BlogPostsList posts={[post]} />)
    const readMoreLink = screen.getByRole('link', { name: 'Read more' })
    expect(readMoreLink).toHaveAttribute('href', `/blog/${post.slug}`)
  })
})
