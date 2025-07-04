import { certificates } from "@/data/certificates";
import { CertificateCardMain } from "./CertificateCardMain";
import { Divider } from "@heroui/react";


export default function CertificatesPage() {
  return (
      // <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Certificates
        </h1>
        <Divider className="mb-8" />

        <div className="grid grid-cols-1 gap-8">
          {certificates.map((cert, idx) => (
            <CertificateCardMain key={idx} {...cert} />
          ))}
        </div>
      </div>
  );
}
