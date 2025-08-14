import { render, screen } from '@testing-library/react'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { fetchFromApi } from '@/lib/api-fetcher'
import { notFound } from 'next/navigation'

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}))

jest.mock('@/lib/api-fetcher', () => ({
  fetchFromApi: jest.fn(),
}))

jest.mock('next-mdx-remote-client/rsc', () => ({
  MDXRemote: ({ source }: any) => <div>{source}</div>,
}))

jest.mock('rehype-pretty-code', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockCategory: BlogPostCategory = {
  id: 'cat-1',
  name: 'Technology',
}

const mockPost: BlogPost = {
  id: 'post-1',
  title: 'Test Post',
  slug: 'test-post',
  short_desc: 'This is a short description',
  date: new Date('2025-06-15'),
  mdxContent: 'This is test content.',
  category: mockCategory,
}

describe('BlogPostContent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders post data correctly', async () => {
    ;(fetchFromApi as jest.Mock).mockResolvedValue({ docs: [mockPost] })

    render(await BlogPostContent({ slug: mockPost.slug }))

    expect(
      screen.getByRole('heading', { level: 1, name: mockPost.title })
    ).toBeInTheDocument()

    expect(screen.getByText(mockCategory.name)).toBeInTheDocument()
    expect(screen.getByText('15 June, 2025')).toBeInTheDocument()
    expect(screen.getByText('This is test content.')).toBeInTheDocument()
  })

  it('handles not found posts', async () => {
    ;(fetchFromApi as jest.Mock).mockResolvedValue({ docs: [] })

    await BlogPostContent({ slug: 'non-existent-post' })

    expect(notFound).toHaveBeenCalled()
  })

  it('formats date correctly', async () => {
    const testDate = new Date('2025-12-25')
    ;(fetchFromApi as jest.Mock).mockResolvedValue({
      docs: [
        {
          ...mockPost,
          date: testDate,
        },
      ],
    })

    render(await BlogPostContent({ slug: mockPost.slug }))

    expect(screen.getByText('25 December, 2025')).toBeInTheDocument()
  })
})
