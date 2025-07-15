import { screen, render } from "@testing-library/react";
import prisma from "@/lib/prisma";
import ProjectDetailPage from "../page";

// Mock next/navigation and notFound
jest.mock("next/navigation", () => ({
    notFound: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
    __esModule: true,
    default: {
        project: {
            findUnique: jest.fn(),
        },
    },
}));

jest.mock("@/components/projects/ImageGallery", () => ({
    __esModule: true,
    default: ({ images }: { images: string[] }) => (
        <div data-testid="image-gallery">Gallery with {images.length} images</div>
    ),
}));

const mockProject = {
    id: 1,
    slug: "test-project",
    title: "Test Project",
    short_desc: "This is a very short description",
    content: "This is a very very very long description",
    images: ["/images/1.png", "/images/2.png"],
    github_link: "https://github.com/example/test",
};

describe("ProjectDetailPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders project content when found", async () => {
        (prisma.project.findUnique as jest.Mock).mockResolvedValue(mockProject);

        const jsx = await ProjectDetailPage({ params: { slug: "test-project" } });
        expect(jsx).toBeTruthy();

        render(jsx);

        expect(screen.getByRole("heading", { name: mockProject.title })).toBeInTheDocument();
        expect(screen.getByText(mockProject.content)).toBeInTheDocument();
    });

    it("renders GitHub link if present", async () => {
        (prisma.project.findUnique as jest.Mock).mockResolvedValue(mockProject);
        const jsx = await ProjectDetailPage({ params: { slug: "test-project" } });
        render(jsx);

        const link = screen.getByRole("link", { name: /View on GitHub/i });
        expect(link).toHaveAttribute("href", mockProject.github_link);
    });

    it("renders image gallery if images are provided", async () => {
        (prisma.project.findUnique as jest.Mock).mockResolvedValue(mockProject);
        const jsx = await ProjectDetailPage({ params: { slug: "test-project" } });
        render(jsx);

        expect(screen.getByTestId("image-gallery")).toBeInTheDocument();
        expect(screen.getByText(/Gallery with 2 images/i)).toBeInTheDocument();
    });

    it("does not render image gallery if no images", async () => {
        const projectWithoutImages = { ...mockProject, images: null };
        (prisma.project.findUnique as jest.Mock).mockResolvedValue(projectWithoutImages);
        const jsx = await ProjectDetailPage({ params: { slug: "test-project" } });
        render(jsx);

        expect(screen.queryByTestId("image-gallery")).not.toBeInTheDocument();
    });

    it("calls notFound if project is missing", async () => {
        const { notFound } = require("next/navigation");
        (prisma.project.findUnique as jest.Mock).mockResolvedValue(null);
        await ProjectDetailPage({ params: { slug: "invalid-slug" } });

        expect(notFound).toHaveBeenCalled();
    });

    it("does not render GitHub link if missing or empty", async () => {
        const projectWithoutGitHub = { ...mockProject, github_link: "   " };
        (prisma.project.findUnique as jest.Mock).mockResolvedValue(projectWithoutGitHub);
        const jsx = await ProjectDetailPage({ params: { slug: "test-project" } });
        render(jsx);

        expect(screen.queryByRole("link", { name: /View on GitHub/i })).not.toBeInTheDocument();
    });
});
