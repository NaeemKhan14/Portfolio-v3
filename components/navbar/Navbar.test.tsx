import { render, screen } from '@testing-library/react';
import Navbar from './navbar';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { project } from '@/data/projects';
import { posts } from '@/data/blog_posts';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));


jest.mock('@/config/site', () => ({
    siteConfig: {
        navItems: [
            { href: '/', label: 'Home' },
            { href: '/certificates', label: 'Certificates' },
            { href: '/projects', label: 'Projects' },
            { href: '/blog', label: 'Blog' },
        ],
        navMenuItems: [
            { href: '/', label: 'Home' },
            { href: '/certificates', label: 'Certificates' },
            { href: '/projects', label: 'Projects' },
            { href: '/blog', label: 'Blog' },
        ],
    },
}));

describe('Navbar', () => {
    const renderNavbarAtPath = (pathname: string) => {
        (usePathname as jest.Mock).mockReturnValue(pathname);
        render(<Navbar />);
    };

    it('renders all static and dynamic links', () => {
        renderNavbarAtPath('/');

        // Assert all labels exist
        siteConfig.navItems.forEach((item) => {
            expect(screen.getAllByText(item.label)[0]).toBeInTheDocument();
        });
    });

    it('marks the current route as active', () => {
        renderNavbarAtPath('/projects');

        const projectsLink = screen.getByText('Projects');
        expect(projectsLink).toBeInTheDocument();
        expect(projectsLink.className).toContain('text-danger');
    });

    it('does not mark inactive routes', () => {
        renderNavbarAtPath('/blog');

        const homeLink = screen.getByText('Home');
        expect(homeLink.className).not.toContain('text-danger');
    });

    it('renders mobile nav menu items', () => {
        renderNavbarAtPath('/blog');

        const blogMobile = screen.getAllByText('Blog');
        expect(blogMobile.length).toBeGreaterThan(0);
    });

    it('opens mobile menu and shows links', async () => {
        renderNavbarAtPath('/');
        const toggleBtn = screen.getByRole('button');
        await userEvent.click(toggleBtn);

        siteConfig.navMenuItems.forEach((item) => {
            const links = screen.getAllByText(item.label, { selector: 'a' });
            expect(links.length).toBeGreaterThan(0);
        });
    });

    describe('blog_post.ts data integrity', () => {
        it('posts array should exist and have correct structure', () => {
            expect(Array.isArray(posts)).toBe(true);
            posts.forEach((post) => {
                expect(typeof post.postID).toBe('number');
                expect(typeof post.title).toBe('string');
                expect(typeof post.short_desc).toBe('string');
                expect(typeof post.content).toBe('string');
                expect(typeof post.date).toBe('string'); 
                expect(typeof post.category).toBe('string');
                expect(Array.isArray(post.images)).toBe(true);
            });
        });
    });

    describe('projects.ts data integrity', () => {
        it('project array should exist and have correct structure', () => {
            expect(Array.isArray(project)).toBe(true);
            project.forEach((proj) => {
                expect(typeof proj.projectId).toBe('number');
                expect(typeof proj.title).toBe('string');
                expect(typeof proj.short_desc).toBe('string');
                expect(typeof proj.description).toBe('string');
                expect(Array.isArray(proj.images)).toBe(true);
                expect(typeof proj.link).toBe('string');
            });
        });
    });


});
