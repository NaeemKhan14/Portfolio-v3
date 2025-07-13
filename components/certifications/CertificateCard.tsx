'use client'

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";

interface Certificate {
    title: string;
    issuer: string;
    type?: string;
    date: string;
    logo?: string;
    link?: string | null;
    credential_id?: string | null;
}

export const CertificateCard: React.FC<Certificate> = ({
  title,
  issuer,
  type,
  date,
  logo,
  link,
  credential_id,
}) => {
  const isCertification = type === 'certification';

  return (
    <Card
      className={`relative mb-6 hover:shadow-md bg-black-900/100 border transition-all group
        ${isCertification 
          ? 'border-yellow-500 dark:border-yellow-400 hover:shadow-yellow-500/30 dark:hover:shadow-yellow-400/30' 
          : 'border-gray-500 dark:border-gray-700 hover:shadow-gray-400 dark:hover:shadow-white'}
        ${isCertification ? 'ring-1 ring-yellow-500 dark:ring-yellow-400' : ''}
      `}
      isHoverable
      isPressable
      onPress={() => link != null ? window.open(link, '_blank') : ''}
    >
      {/* Certification badge */}
      {isCertification && (
        <div className="absolute -top-0 -right-0 bg-yellow-500 dark:bg-yellow-600 text-gray-900 text-xs font-bold px-2 py-1 rounded-full z-10">
          CERTIFIED
        </div>
      )}

      {/* Large logo with hover effect */}
      {logo && (
        <div className={`absolute right-4 top-4 opacity-10 group-hover:opacity-70 transition-all duration-400 transform group-hover:scale-110
          ${isCertification ? 'opacity-20 group-hover:opacity-90' : ''}`}>
          <Image
            src={logo}
            alt={`${issuer} logo`}
            width={80}
            height={80}
            className="rounded-md"
          />
        </div>
      )}
      
      <CardHeader className="flex items-center gap-4">
        {/* Logo aligned to the left */}
        {logo && (
          <Image
            src={logo}
            alt={`${issuer} logo`}
            width={48}
            height={48}
            className="rounded-md flex-shrink-0"
          />
        )}

        {/* Centered title and issuer that takes remaining space */}
        <div className="flex-1 flex flex-col items-center text-center">
          <p className={`text-xl font-bold ${isCertification ? 'text-yellow-500 dark:text-yellow-400' : ''}`}>
            {title}
          </p>
          <p className="text-small text-default-500">{issuer}</p>
        </div>

        {/* Empty div to balance the logo on the left */}
        <div className="w-12 flex-shrink-0"></div>
      </CardHeader>

      <Divider className={isCertification ? 'bg-yellow-500 dark:bg-yellow-400' : ''} />

      <CardBody className="text-center">
        <div className="mb-2 flex justify-center">
          <span className={`inline-block text-xs font-medium px-3 py-2 rounded-full ${
            isCertification 
              ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}>
            {date.toLowerCase() === "ongoing" ? "In Progress" : date}
          </span>
        </div>
        {credential_id && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Credential ID: <span className="font-mono">{credential_id}</span>
          </p>
        )}
      </CardBody>

      <Divider className={isCertification ? 'bg-yellow-500 dark:bg-yellow-400' : ''} />

      <CardFooter className="justify-center">
        {link && (
          <Link
            href={link}
            isExternal
            className={`text-sm font-medium hover:underline ${
              isCertification 
                ? 'text-yellow-600 dark:text-yellow-400' 
                : 'text-danger'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            View Certificate →
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};