import { render, screen } from "@testing-library/react";
import AboutSection from "./AboutSection";
import { siteConfig } from "@/config/site";
import '@testing-library/jest-dom'

describe("AboutSection", () => {
    beforeEach(() => {
        render(<AboutSection />);
    });

    test("renders section heading", () => {
        expect(screen.getByRole("heading", { name: /about me/i })).toBeInTheDocument();
    });

    test("renders profile image", () => {
        const image = screen.getByAltText("Profile photo");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", expect.stringContaining("/images/pp.jpg"));
    });

    test("renders description text", () => {
        expect(
            screen.getByText(/I'm Naeem Khan, a cybersecurity-focused software developer/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/This dual perspective enables me to build inherently secure systems/i)
        ).toBeInTheDocument();
    });

    test("renders social links", () => {
        const linkedin = screen.getByLabelText("Linkedin");
        const github = screen.getByLabelText("Github");

        expect(linkedin).toBeInTheDocument();
        expect(linkedin).toHaveAttribute("href", siteConfig.links.linkedin);

        expect(github).toBeInTheDocument();
        expect(github).toHaveAttribute("href", siteConfig.links.github);
    });

    test("renders CV download buttons with correct hrefs", () => {
        const cv1 = screen.getByRole("link", { name: /cv 1/i });
        const cv2 = screen.getByRole("link", { name: /cv 2/i });

        expect(cv1).toBeInTheDocument();
        expect(cv1).toHaveAttribute("href", "cv/Naeem Khan CV (Cyber Security).pdf");

        expect(cv2).toBeInTheDocument();
        expect(cv2).toHaveAttribute("href", "cv/Naeem Khan CV.pdf");
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<AboutSection />);
        expect(asFragment()).toMatchSnapshot();
    });
});
