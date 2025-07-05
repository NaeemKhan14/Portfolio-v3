import { render, screen } from "@testing-library/react";
import CertificateSection from "../CertificateSection";

// Mock certificate data if needed
jest.mock("@/data/certificates", () => ({
  certificates: [
    {
      id: 1,
      title: "Pre-Security",
      issuer: "TryHackMe",
      date: "June 2025",
      logo: "/images/tryhackme.jpg",
      link: "https://example.com/cert1.pdf",
      credential_id: "THM-123",
    },
    {
      id: 2,
      title: "Cyber Security 101",
      issuer: "TryHackMe",
      date: "June 2025",
      logo: "/images/tryhackme.jpg",
      link: "https://example.com/cert2.pdf",
      credential_id: "THM-456",
    },
    {
      id: 3,
      title: "SAL1",
      issuer: "TryHackMe",
      date: "ongoing",
      logo: "/images/tryhackme.jpg",
      link: null,
      credential_id: "",
    },
  ],
}));

describe("CertificateSection", () => {
  it("renders heading and certificate cards", () => {
    render(<CertificateSection />);
    
    expect(screen.getByText("Certificates")).toBeInTheDocument();
    expect(screen.getByText("Pre-Security")).toBeInTheDocument();
    expect(screen.getByText("Cyber Security 101")).toBeInTheDocument();
    // "SAL1" is sliced out, only 2 shown
    expect(screen.queryByText("SAL1")).not.toBeInTheDocument();
  });

  it("renders 'More Certificates' link", () => {
    render(<CertificateSection />);
    const moreLink = screen.getByRole("link", { name: /more certificates/i });
    expect(moreLink).toBeInTheDocument();
    expect(moreLink).toHaveAttribute("href", "/certificates");
  });
});
