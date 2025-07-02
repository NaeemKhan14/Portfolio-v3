import { notFound } from "next/navigation";
import { project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { Divider } from "@heroui/react";

type Props = {
    params: {
        slug: string;
    };
};

export default async function ProjectDetailPage({ params }: Props) {

    const { slug } = await params;
    const proj = project.find((p) => p.slug === slug);

    if (!proj) return notFound();

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4 text-center">{proj.title}</h1>
            <Divider className="mb-10" />
            <div className="whitespace-pre-line text-lg mb-6 w-full">
                {proj.description}
            </div>
            <Divider className="mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {proj.images.map((imgUrl, index) => (
                    <div key={index} className="w-full h-64 relative">
                        <Image
                            src={imgUrl}
                            alt={`Project Image ${index + 1}`}
                            fill
                            className="object-cover border rounded-lg"
                        />
                    </div>
                ))}
            </div>

            <div className="text-right">
                <Link
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 dark:text-red-400 hover:underline"
                >
                    View on GitHub →
                </Link>
            </div>
        </div>
    );
}
