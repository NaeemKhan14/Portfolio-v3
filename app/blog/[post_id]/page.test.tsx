import { posts } from '@/data/blog_posts';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BlogPostPage from './page';


jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: () => jest.fn(),
}));

describe('BlogPostPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the blog post for valid postId', () => {
    const validPost = posts[0];
    render(<BlogPostPage params={{ post_id: validPost.post_id.toString() }} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(validPost.title);
    expect(screen.getByText(validPost.category)).toBeInTheDocument();
    expect(screen.getByText(validPost.date)).toBeInTheDocument();
    expect(screen.getByText(validPost.content)).toBeInTheDocument();
  });

  // it('calls notFound for invalid postId', () => {
  //   render(<BlogPostPage params={{ postId: '9999' }} />);
  //   expect(nextNavigation.notFound).toHaveBeenCalled();
  // });
});
