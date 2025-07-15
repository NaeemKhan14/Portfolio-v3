import { render, screen } from '@testing-library/react';
import { siteConfig } from '@/config/site';
import AboutSection from '../AboutSection';
// I don't know why all the tests break throughout the project if you remove
// this import, even though it is already being imported from jest.config.js
// I leave this one in God's hands 🙏
import '@testing-library/jest-dom';

describe('AboutSection', () => {
    // Render once for all tests
    beforeEach(() => {
        render(<AboutSection />);
    });

    // 1. Heading (name)
    test('renders name heading', () => {
        expect(
            screen.getByRole('heading', {
                name: /Naeem Khan/i,
                level: 1
            })
        ).toBeInTheDocument();
    });

    // 2. Profile picture
    test('renders profile image', () => {
        const img = screen.getByAltText('Profile photo');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/images/pp.jpg');
    });

    // 3. Tagline chip
    test('renders tagline chip', () => {
        expect(
            screen.getByText('SOC Analyst & Software Dev')
        ).toBeInTheDocument();
    });

    // 4. Social links
    test('renders social links', () => {
        const linkedin = screen.getByRole('link', { name: 'Linkedin' });
        const github = screen.getByRole('link', { name: 'Github' });

        expect(linkedin).toHaveAttribute('href', siteConfig.links.linkedin);
        expect(github).toHaveAttribute('href', siteConfig.links.github);
    });

    // 5. CV links
    test('renders CV download links', () => {
        const cyberCV = screen.getByRole('link', { name: 'Cybersecurity CV' });
        const devCV = screen.getByRole('link', { name: 'Software Developer CV' });

        expect(cyberCV).toHaveAttribute(
            'href',
            'cv/Naeem Khan CV (Cyber Security).pdf'
        );
        expect(devCV).toHaveAttribute(
            'href',
            'cv/Naeem Khan CV.pdf'
        );
    });

    // 6. Introduction text
    test('renders introduction paragraph', () => {
        const intro = screen.getByText(/Cybersecurity specialist with software development expertise/i);
        expect(intro).toBeInTheDocument();
    });

    // 7. Skill chips
    test('renders skill chips', () => {
        const chipContainer = screen.getByRole('list');
        const chips = screen.getAllByRole('listitem');
        // Minimum required chips = 3. More can be added
        expect(chips.length).toBeGreaterThanOrEqual(3);
        
        expect(chipContainer).toContainElement(
            screen.getByText('Software Development')
        );
        expect(chipContainer).toContainElement(
            screen.getByText('SOC Analyst L1')
        );
        expect(chipContainer).toContainElement(
            screen.getByText('CTF Competitor')
        );
    });
});