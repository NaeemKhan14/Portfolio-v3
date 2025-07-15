import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import BlogPostsList from '../BlogPostsList';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('BlogPostsList', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        jest.clearAllMocks();
    });

    const post = {
        id: 1,
        slug: 'test-post',
        title: 'Test Post',
        short_desc: 'Short description here.',
        content: 'This is test content.',
        category: {
            name: 'Tech',
        },
        date: new Date('2023-01-01'),
    };

    it('renders "No posts yet" when posts array is empty', () => {
        render(<BlogPostsList posts={[]} />);
        expect(screen.getByText(/No posts yet/i)).toBeInTheDocument();
        expect(screen.getByText(/Check back later/i)).toBeInTheDocument();
    });

    it('renders posts correctly', () => {
        render(<BlogPostsList posts={[post]} />);

        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.short_desc)).toBeInTheDocument();
        expect(screen.getByText(post.category.name)).toBeInTheDocument();
        expect(screen.getByText(/Read more/i)).toBeInTheDocument();
        expect(screen.getByText(new Date(post.date).toLocaleDateString())).toBeInTheDocument();
    });

    it('stops propagation when clicking Read more link', () => {
        render(<BlogPostsList posts={[post]} />);
        const links = screen.getAllByRole("link", { name: "Read more" });
        const firstLink = links[0];

        const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
        });
        Object.defineProperty(clickEvent, "stopPropagation", {
            value: jest.fn(),
            writable: true,
        });

        firstLink.dispatchEvent(clickEvent);
        expect(clickEvent.stopPropagation).toHaveBeenCalled();
    });
});
