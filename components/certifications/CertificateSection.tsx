import { CertificateCard } from "./CertificateCard";
import { Divider } from "@heroui/react";
import prisma from "@/lib/prisma";


export default async function CertificateSection() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { id: "asc" },
    take: 2
  });

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Certificates
        </h2>
        <div className="grid gap-6 md:gap-2">
          {certificates.map((cert, idx) => (
            <CertificateCard key={idx} {...cert} />
          ))}
        </div>
        <div className="mt-3 text-center">
          <a
            className="text-center text-sm bg-danger hover:bg-pink-300 dark:hover:bg-pink-900 text-white px-4 py-4 rounded-lg transition-colors"
            href="/certificates"
          >
            More Certificates...
          </a>
        </div>
      </div>
    <Divider data-testid="divider" className="max-w-3xl mx-auto"/>
    </section>
  );
}
