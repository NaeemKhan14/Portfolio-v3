import { CertificateCard } from "./CertificateCard";


const certificates = [
  {
    title: "Pre-Security",
    issuer: "TryHackMe",
    date: "June 2025",
    logo: "/images/tryhackme.jpg",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-0IQ89TVQIC.pdf",
    credential_id: 'THM-0IQ89TVQIC'
  },
  {
    title: "Cyber Security 101",
    issuer: "TryHackMe",
    date: "June 2025",
    logo: "/images/tryhackme.jpg",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-LBBXQLLEAD.pdf",
    credential_id: 'THM-LBBXQLLEAD'
  },
];

export default function CertificateSection() {
  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Certificates
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((cert, idx) => (
            <CertificateCard key={idx} {...cert} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            className="text-red-600 dark:text-red-400 hover:underline"
            href="/certificates"
          >
            More Certificates...
          </a>
        </div>
      </div>
    </section>
  );
}
