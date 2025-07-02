import { certificates } from "@/data/certificates";
import { CertificateCard } from "./CertificateCard";


export default function CertificateSection() {
  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto lg:mx-64 px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Certificates
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.slice(0, 2).map((cert, idx) => (
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
