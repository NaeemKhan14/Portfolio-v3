import { render, screen } from "@testing-library/react";
import { CertificateCard } from "../CertificateCard";

const mockCert = {
  title: "Cyber Security 101",
  issuer: "TryHackMe",
  date: "June 2025",
  logo: "/images/tryhackme.jpg",
  link: "https://example.com/cert.pdf",
  credential_id: "THM-LBBXQLLEAD",
};

describe("CertificateCard", () => {
  it("renders certificate details correctly", () => {
    render(<CertificateCard {...mockCert} />);

    expect(screen.getByText("Cyber Security 101")).toBeInTheDocument();
    expect(screen.getByText("TryHackMe")).toBeInTheDocument();
    expect(screen.getByText("June 2025")).toBeInTheDocument();
    expect(screen.getByText("Credential ID:")).toBeInTheDocument();
    expect(screen.getByText("THM-LBBXQLLEAD")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view certificate/i })).toHaveAttribute("href", mockCert.link);
  });

  it("does not render the link if 'link' is null", () => {
    render(<CertificateCard {...mockCert} link={null} />);
    expect(screen.queryByRole("link", { name: /view certificate/i })).not.toBeInTheDocument();
  });
});