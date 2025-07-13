import { certificates } from "@/data/certificates";
import { CertificateCard } from "./CertificateCard";
import { Divider } from "@heroui/react";


export default function CertificateSection() {
  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto lg:mx-64 px-6 mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Certificates
        </h2>
        <div className="grid gap-6 md:gap-2">
          {certificates.slice(0, 2).map((cert, idx) => (
            <CertificateCard key={idx} {...cert} />
          ))}
        </div>
        <div className="mt-3 text-center">
          <a
            className="text-white bg-danger px-8 py-4 rounded-lg text-sm hover:bg-pink-300 dark:hover:bg-pink-900"
            href="/certificates"
          >
            More Certificates...
          </a>
        </div>
      </div>
    <Divider className="max-w-3xl mx-auto"/>
    </section>
  );
}
