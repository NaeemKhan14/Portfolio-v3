import { render, screen, fireEvent } from '@testing-library/react';
import { experiences } from '@/data/experience';
import ExperienceCard from '../ExperienceCard';

describe('ExperienceCard', () => {
    it('renders with default active tab "work" and shows work experiences', () => {
        render(<ExperienceCard />);

        // Check that "Work Experience" tab is active
        const workTab = screen.getByRole('button', { name: /work experience/i });
        expect(workTab).toHaveClass('text-white');

        // Work experience items are rendered
        experiences.work.forEach(({ title }) => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });

        // Education items should NOT be visible initially
        experiences.education.forEach(({ title }) => {
            expect(screen.queryByText(title)).not.toBeInTheDocument();
        });
    });

    it('switches to education tab and renders education experiences on click', () => {
        render(<ExperienceCard />);

        const educationTab = screen.getByRole('button', { name: /education/i });
        fireEvent.click(educationTab);

        // Education tab is active
        expect(educationTab).toHaveClass('text-white');

        // Education items are rendered
        experiences.education.forEach(({ title }) => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });

        // Work items should not be visible after switching
        experiences.work.forEach(({ title }) => {
            expect(screen.queryByText(title)).not.toBeInTheDocument();
        });
    });

    describe('experience.ts data integrity', () => {
        it('education array should exist and have correct structure', () => {
            expect(Array.isArray(experiences.education)).toBe(true);
            experiences.education.forEach((edu) => {
                expect(typeof edu.id).toBe('number');
                expect(typeof edu.title).toBe('string');
                expect(typeof edu.period).toBe('string');
                expect(typeof edu.institution).toBe('string');
                expect(typeof edu.location).toBe('string');
            });
        });

        it('work array should exist and have correct structure', () => {
            expect(Array.isArray(experiences.work)).toBe(true);
            experiences.work.forEach((workExp) => {
                expect(typeof workExp.id).toBe('number');
                expect(typeof workExp.title).toBe('string');
                expect(typeof workExp.period).toBe('string');
                expect(typeof workExp.institution).toBe('string');
                expect(typeof workExp.location).toBe('string');
            });
        });
    });
});
