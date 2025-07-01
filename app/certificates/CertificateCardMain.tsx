import Image from "next/image";
import { Link } from "@heroui/link";

export const CertificateCardMain: React.FC<Certificate> = ({
  title,
  issuer,
  date,
  logo,
  link,
  credential_id,
}) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 dark:hover:shadow-gray-800/30 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col h-full">
      {/* Background badge */}
      <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-all">
        {logo && (
          <Image
            src={logo}
            alt={`${issuer} logo`}
            width={80}
            height={80}
            className="rounded-md"
          />
        )}
      </div>

      {/* Top Section */}
      <div className="flex items-start gap-4 mb-4 z-10 relative">
        {logo && (
          <Image
            src={logo}
            alt={`${issuer} logo`}
            width={48}
            height={48}
            className="rounded-md flex-shrink-0"
          />
        )}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 min-h-[2.5rem]">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
            {issuer}
          </p>
        </div>
      </div>

      {/* Bottom Section (always at bottom) */}
      <div className="mt-auto z-10 relative">
        {/* Date */}
        <div className="mb-2">
          <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {date.toLowerCase() === "ongoing" ? "In Progress" : date}
          </span>
        </div>

        {/* Credential ID */}
        {credential_id && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate">
            Credential ID: <span className="font-mono">{credential_id}</span>
          </p>
        )}

        {/* Link */}
        {link && (
          <Link
            href={link}
            isExternal
            className="inline-block text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
          >
            View Certificate →
          </Link>
        )}
      </div>
    </div>
  );
};