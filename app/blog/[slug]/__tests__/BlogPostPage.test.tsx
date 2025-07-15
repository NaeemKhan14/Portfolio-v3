import { render, screen } from '@testing-library/react';
import BlogPostPage from '@/app/blog/[slug]/page';
import prisma from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
    post: {
        findUnique: jest.fn(),
    },
}));

const mockPost = {
    title: 'Test Post',
    content: 'This is test content.',
    date: new Date('2023-01-01'),
    slug: 'test-post',
    category: {
        name: 'Tech',
    },
    images: ['/images/image1.jpg', '/images/image2.jpg'],
};

describe('BlogPostPage', () => {
    it('renders post data correctly', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue(mockPost);

        const params = { slug: 'test-post' };
        const container = await BlogPostPage({ params });
        expect(container).toBeTruthy();
        render(container);

        expect(screen.getByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText('Tech')).toBeInTheDocument();
        expect(screen.getByText('01 January, 2023')).toBeInTheDocument();
        expect(screen.getByText('This is test content.')).toBeInTheDocument();
        expect(screen.getAllByRole('img')).toHaveLength(2);
    });

    it('handles missing images gracefully', async () => {
        (prisma.post.findUnique as jest.Mock).mockResolvedValue({
            ...mockPost,
            images: null,
        });

        const params = { slug: 'no-images-post' };
        const container = await BlogPostPage({ params });
        expect(container).toBeTruthy();

        render(container);

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
});
