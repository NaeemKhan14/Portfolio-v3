'use client';

import { Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectsList({ projects }: { projects: ProjectsList[] }) {
    const router = useRouter();

    return (
        <div className="flex flex-col md:max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Projects</h1>
            <Divider className="mb-8" />

            {projects.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
                    <p className="text-gray-500">Check back soon for updates!</p>
                </div>
            ) : (
                projects.map((project) => (
                    <Card
                        key={project.id}
                        className="mb-6 bg-black-900/100 hover:shadow-gray-400 hover:shadow-md dark:hover:shadow-white dark:hover:shadow-sm border border-gray-500 dark:border-gray-700 transition-all"
                        isHoverable
                        isPressable
                        onPress={() => router.push(`/projects/${project.slug}`)}
                    >
                        <CardHeader className="flex flex-col text-2xl font-semibold">
                            <p>{project.title}</p>
                        </CardHeader>
                        <Divider />
                        <CardBody className="w-full items-center">
                            <p>{project.short_desc}</p>
                        </CardBody>
                        <CardFooter className="flex justify-end">
                            <Link
                                className="text-sm font-medium text-danger hover:underline"
                                href={`/projects/${project.slug}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                Read more
                            </Link>
                        </CardFooter>
                    </Card>
                ))
            )}
        </div>
    );
}