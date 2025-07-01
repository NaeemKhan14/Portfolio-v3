import Image from "next/image";
import { Link } from "@heroui/link";

interface Certificate {
    title: string;
    issuer: string;
    date: string;
    logo?: string;
    link?: string | null;
    credential_id?: string | null;
}

export const CertificateCard: React.FC<Certificate> = ({
    title,
    issuer,
    date,
    logo,
    link,
    credential_id,
}) => {
    return (
        <div className="p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md dark:hover:shadow-gray-800/30">
            <div className="flex items-center gap-4 mb-4">
                {logo && (
                    <Image
                        src={logo}
                        alt={`${issuer} logo`}
                        width={40}
                        height={40}
                        className="rounded-md"
                    />
                )}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{issuer}</p>
                </div>
            </div>
            {date.toLowerCase() === "ongoing" ? (
                <span className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded">
                    In Progress
                </span>
            ) : <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{date}</p>}
            {credential_id && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Credential ID: <span className="font-mono">{credential_id}</span>
                </p>
            )}
            {link && (
                <Link
                    href={link}
                    isExternal
                    className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
                >
                    View Certificate
                </Link>
            )}
        </div>
    );
}