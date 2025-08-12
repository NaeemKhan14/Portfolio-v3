import { screen, render } from '@testing-library/react'
import ProjectDetailsContent from '@/components/projects/ProjectDetailsContent'
import { fetchFromApi } from '@/lib/api-fetcher'  
import { notFound } from 'next/navigation'

// Mock next/navigation and notFound
jest.mock('next/navigation', () => ({
    notFound: jest.fn(),
}))

// Mock the API fetcher
jest.mock('@/lib/api-fetcher', () => ({
    fetchFromApi: jest.fn(),
}))

// Mock ImageGallery component
jest.mock('@/components/projects/ImageGallery', () => ({
    __esModule: true,
    default: ({ images }: { images: ProjectImages[] }) => (
        <div data-testid='image-gallery'>Gallery with {images.length} images</div>
    ),
}))

jest.mock('next-mdx-remote-client/rsc', () => ({
  MDXRemote: ({ source }: any) => <div>{source}</div>,
}))


const mockProject: Project = {
    id: 'proj-1',
    slug: 'test-project',
    title: 'Test Project',
    short_desc: 'Short description',
    content: 'Full project content',
    images: [
        { url: '/images/1.png', alt: 'Image 1' },
        { url: '/images/2.png', alt: 'Image 2' },
    ],
    github_link: 'https://github.com/example/test',
}

describe('ProjectDetailsContent', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders project content when found', async () => {
        ; (fetchFromApi as jest.Mock).mockResolvedValue({
            docs: [mockProject],
        })

        const jsx = await ProjectDetailsContent({ slug: 'test-project' })
        render(jsx)

        expect(
            screen.getByRole('heading', { name: mockProject.title }),
        ).toBeInTheDocument()
        expect(screen.getByText(mockProject.content)).toBeInTheDocument()
    })

    it('renders GitHub link if present', async () => {
        ; (fetchFromApi as jest.Mock).mockResolvedValue({
            docs: [mockProject],
        })

        const jsx = await ProjectDetailsContent({ slug: 'test-project' })
        render(jsx)

        const link = screen.getByRole('link', { name: /View on GitHub/i })
        expect(link).toHaveAttribute('href', mockProject.github_link)
        expect(link).toHaveClass('text-danger')
    })

    it('does not render image gallery if no images', async () => {
        const projectWithoutImages = { ...mockProject, images: undefined }
            ; (fetchFromApi as jest.Mock).mockResolvedValue({
                docs: [projectWithoutImages],
            })

        const jsx = await ProjectDetailsContent({ slug: 'test-project' })
        render(jsx)

        expect(screen.queryByTestId('image-gallery')).not.toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: 'Screenshots' })).toBeNull()
    })

    it('calls notFound if project is missing', async () => {
        const { notFound } = require('next/navigation')
            ; (fetchFromApi as jest.Mock).mockResolvedValue({ docs: [] })

        await ProjectDetailsContent({ slug: 'invalid-slug' })
        expect(notFound).toHaveBeenCalled()
    })

    it('does not render GitHub link if missing or empty', async () => {
        const projectWithoutGitHub = { ...mockProject, github_link: undefined }
            ; (fetchFromApi as jest.Mock).mockResolvedValue({
                docs: [projectWithoutGitHub],
            })

        const jsx = await ProjectDetailsContent({ slug: 'test-project' })
        render(jsx)

        expect(
            screen.queryByRole('link', { name: /View on GitHub/i }),
        ).not.toBeInTheDocument()
    })

    it('handles whitespace-only GitHub links', async () => {
        const projectWithEmptyGitHub = { ...mockProject, github_link: '   ' }
            ; (fetchFromApi as jest.Mock).mockResolvedValue({
                docs: [projectWithEmptyGitHub],
            })

        const jsx = await ProjectDetailsContent({ slug: 'test-project' })
        render(jsx)

        expect(
            screen.queryByRole('link', { name: /View on GitHub/i }),
        ).not.toBeInTheDocument()
    })
})
