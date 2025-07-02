import Image from "next/image";
import { Link } from "@heroui/link";

export const CertificateCard: React.FC<Certificate> = ({
    title,
    issuer,
    date,
    logo,
    link,
    credential_id,
}) => {
    return (
        <div className="p-6 rounded-xl hover:shadow-gray-400 hover:shadow-md dark:hover:shadow-white dark:hover:shadow-sm border border-gray-500 dark:border-gray-700 transition-all">
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{date}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Credential ID: <span className="font-mono">{credential_id}</span>
            </p>
            {link && (
                <Link
                    href={link}
                    isExternal
                    className="text-sm font-medium text-danger hover:underline"
                >
                    View Certificate →
                </Link>
            )}
        </div>
    );
}