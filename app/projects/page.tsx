'use client'

import { project } from "@/data/projects";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Projects</h1>
      <Divider className="mb-8" />
      {project.map((proj) => (
        <Card 
          key={proj.projectId} 
          className="mb-6 border border-gray-100 dark:border-gray-700 bg-black-900/100" 
          isHoverable 
          isPressable
          onPress={() => router.push(`/projects/${proj.projectId}`)}
        >
          <CardHeader className="flex flex-col text-2xl font-semibold">
            <p>{proj.title}</p>
          </CardHeader>
          <Divider />
          <CardBody className="w-full items-center">
            <p>{proj.short_desc}</p>
          </CardBody>
          <CardFooter className="flex justify-end">
            <Link
              className="text-sm font-medium text-danger hover:underline"
              href={`/projects/${proj.projectId}`}
              onClick={(e) => e.stopPropagation()} // Prevent double nav if clicking link inside card
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
