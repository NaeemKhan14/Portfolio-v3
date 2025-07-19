'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = {
  images: ProjectImages[]
}

function normalizeImageUrl(url: string): string {
  const base = process.env.NEXT_PUBLIC_CMS_API_URL || ''

  // If url already starts with http(s), return as is
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  // Strip extra `/api` to avoid `/api/api/...`
  return `${base}${url.replace(/^\/api/, '')}`
}

export default function ImageGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState<ProjectImages | null>(null)

  return (
    <>
      <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {images.map((img, index) => (
          <div
            key={index}
            className='relative h-64 w-full cursor-pointer transition-opacity hover:opacity-90'
            onClick={() =>
              setSelectedImage({
                ...img,
                url: normalizeImageUrl(img.url),
              })
            }
          >
            <Image
              src={normalizeImageUrl(img.url)}
              alt={img.alt || `Project Image ${index + 1}`}
              fill
              className='rounded-lg border object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4'
          onClick={() => setSelectedImage(null)}
          data-testid="modal-backdrop"
        >
          <div className='relative h-full max-h-[90vh] w-full max-w-4xl'>
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt || 'Preview'}
              fill
              className='rounded-lg object-contain'
              sizes='(max-width: 768px) 100vw, 80vw'
              priority
            />
            <button
              className='absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-2xl text-white'
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              aria-label='Close image'
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  )
}
