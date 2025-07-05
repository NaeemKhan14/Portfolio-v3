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
          key={proj.project_id} 
          className="mb-6 bg-black-900/100 hover:shadow-gray-400 hover:shadow-md dark:hover:shadow-white dark:hover:shadow-sm border border-gray-500 dark:border-gray-700 transition-all" 
          isHoverable 
          isPressable
          onPress={() => router.push(`/projects/${proj.project_id}`)}
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
              href={`/projects/${proj.project_id}`}
              onClick={(e) => e.stopPropagation()}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
