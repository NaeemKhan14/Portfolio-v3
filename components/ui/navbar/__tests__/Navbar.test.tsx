import { siteConfig } from '@/config/site';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import Navbar from '../navbar';

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

    it('opens mobile menu and shows links', () => {
        renderNavbarAtPath('/');
        const toggleBtn = screen.getByRole('button');
        userEvent.click(toggleBtn);

        siteConfig.navMenuItems.forEach((item) => {
            const links = screen.getAllByText(item.label, { selector: 'a' });
            expect(links.length).toBeGreaterThan(0);
        });
    });
});
