'use client'

import { notFound } from "next/navigation";
import { project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { Divider } from "@heroui/react";
import { useState } from "react";
import { use } from "react";

type PageParams = {
  params: {
    projectId: string;
  };
};

export default function ProjectDetailPage({ params }: PageParams) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Properly unwrap the params Promise with type assertion
  const unwrappedParams = use<{ projectId: string }>(params);
  const proj = project.find((p) => p.projectId === Number(unwrappedParams.projectId));

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {proj.images.map((imgUrl, index) => (
            <div 
              key={index} 
              className="w-full h-64 relative cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(imgUrl)}
            >
              <Image
                src={imgUrl}
                alt={`Project Image ${index + 1}`}
                fill
                className="object-cover border rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-full max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Enlarged project image"
              fill
              className="object-contain"
              priority
            />
            <button 
              className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close image"
            >
              &times;
            </button>
          </div>
        </div>
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