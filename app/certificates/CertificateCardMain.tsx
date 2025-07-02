'use client'

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";
import { useRouter } from "next/navigation";

export const CertificateCardMain: React.FC<Certificate> = ({
  title,
  issuer,
  date,
  logo,
  link,
  credential_id,
}) => {
  const router = useRouter();

  return (
    <Card
      className="relative mb-6 hover:shadow-gray-400 hover:shadow-md bg-black-900/100 dark:hover:shadow-white dark:hover:shadow-sm border border-gray-500 dark:border-gray-700 transition-all group"
      isHoverable
      isPressable
      onPress={() => link != null ? router.push(link) : ''}
    >
      {/* Large logo with hover effect */}
      {logo && (
        <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-70 transition-all duration-400 transform group-hover:scale-110">
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
          <p className="text-xl font-bold">{title}</p>
          <p className="text-small text-default-500">{issuer}</p>
        </div>

        {/* Empty div to balance the logo on the left */}
        <div className="w-12 flex-shrink-0"></div>
      </CardHeader>

      <Divider />

      <CardBody className="text-center">
        <div className="mb-2 flex justify-center">
          <span className="inline-block text-xs font-medium px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {date.toLowerCase() === "ongoing" ? "In Progress" : date}
          </span>
        </div>
        {credential_id && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Credential ID: <span className="font-mono">{credential_id}</span>
          </p>
        )}
      </CardBody>

      <Divider />

      <CardFooter className="justify-center">
        {link && (
          <Link
            href={link}
            isExternal
            className="text-sm font-medium text-danger hover:underline"
            onClick={(e) => e.stopPropagation()} // Prevent card navigation when clicking link
          >
            View Certificate →
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};