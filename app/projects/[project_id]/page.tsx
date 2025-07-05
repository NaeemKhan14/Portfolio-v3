import { notFound } from "next/navigation";
import { project } from "@/data/projects";
import Link from "next/link";
import { Divider } from "@heroui/react";
import ImageGallery from "@/components/projects/ImageGallery";

type PageParams = {
  params: {
    project_id: string;
  };
};

export default async function ProjectDetailPage({ params }: PageParams) {
  
  const project_id = (await params).project_id;
  const proj = project.find(proj_elem => proj_elem.project_id === Number(project_id))

  if (!proj) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">{proj.title}</h1>
      <Divider className="mb-10" />
      <div className="whitespace-pre-line text-lg mb-6 w-full">
        {proj.description}
      </div>
      <Divider className="mb-10" />
      
      {proj.images.length > 0 && (
        <ImageGallery images={proj.images} />
      )}

      <div className="text-right">
        <Link
          href={proj.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-danger hover:underline"
        >
          View on GitHub →
        </Link>
      </div>
    </div>
  );
}