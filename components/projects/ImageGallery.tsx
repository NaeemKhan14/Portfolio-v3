"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function ImageGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {images.map((imgUrl, index) => (
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
    </>
  );
}