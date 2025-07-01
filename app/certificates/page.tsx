import { certificates } from "@/app/data/certificates";
import { CertificateCardMain } from "./CertificateCardMain";


export default function CertificatesPage() {
  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
          All Certificates
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <CertificateCardMain key={idx} {...cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
