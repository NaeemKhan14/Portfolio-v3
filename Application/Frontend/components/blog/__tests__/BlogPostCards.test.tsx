import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import BlogPostCards from '../BlogPostCards'

jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}))

const mockPosts = [
    {
        id: '1',
        slug: 'test-post',
        title: 'Test Post',
        short_desc: 'This is a test description',
        date: new Date('2025-01-01T00:00:00.000Z'),
        category: {
            id: '1',
            name: 'Technalogia'
        }
    },
    {
        id: '2',
        slug: 'another-post',
        title: 'Another Post',
        short_desc: 'Another test description',
        date: new Date('2025-02-15T00:00:00.000Z'),
        category: {
            id: '2',
            name: 'CTF'
        }
    }
]

describe('BlogPostCards', () => {
    const mockRouterPush = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
            ; (useRouter as jest.Mock).mockReturnValue({
                push: mockRouterPush,
            })
    })

    it('renders correct number of cards', () => {
        render(<BlogPostCards posts={mockPosts} />)
        const cards = screen.getAllByRole('blog-post')
        expect(cards).toHaveLength(mockPosts.length)
    })

    it('displays correct post information', () => {
        render(<BlogPostCards posts={mockPosts} />)

        // First post
        expect(screen.getByText('Test Post')).toBeInTheDocument()
        expect(screen.getByText('This is a test description')).toBeInTheDocument()
        expect(screen.getByText('Technalogia')).toBeInTheDocument()
        expect(screen.getByText('01/01/2025')).toBeInTheDocument()

        // Second post
        expect(screen.getByText('Another Post')).toBeInTheDocument()
        expect(screen.getByText('Another test description')).toBeInTheDocument()
        expect(screen.getByText('CTF')).toBeInTheDocument()
        expect(screen.getByText('15/02/2025')).toBeInTheDocument()
    })

    it('has correct links for each post', () => {
        render(<BlogPostCards posts={mockPosts} />)
        const links = screen.getAllByRole('link', { name: 'Read more' })

        expect(links[0]).toHaveAttribute('href', '/blog/test-post')
        expect(links[1]).toHaveAttribute('href', '/blog/another-post')
    })

    it('stops propagation when "Read more" is clicked', async () => {
        render(<BlogPostCards posts={mockPosts} />)
        const readMoreLinks = screen.getAllByText('Read more')

        const stopPropagationSpy = jest.spyOn(Event.prototype, 'stopPropagation')

        fireEvent.click(readMoreLinks[0])

        expect(stopPropagationSpy).toHaveBeenCalled()
        stopPropagationSpy.mockRestore()
    })

    it('does not trigger card navigation when "Read more" is clicked', () => {
        render(<BlogPostCards posts={mockPosts} />)
        const readMoreLinks = screen.getAllByText('Read more')

        fireEvent.click(readMoreLinks[0])

        // Card navigation should not be triggered for "Read more" clicks
        expect(mockRouterPush).not.toHaveBeenCalled()
    })
})