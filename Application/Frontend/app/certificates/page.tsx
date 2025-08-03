import { CertificateCard } from '@/components/certifications/CertificateCard'
import { PaginationWrapper } from '@/components/ui/PaginationWrapper'
import { fetchFromApi } from '@/lib/api-fetcher'
import { ApiResponse } from '@/types/apiResponse'
import { Divider } from '@heroui/react'
import { notFound } from 'next/navigation'

export default async function CertificatesPage({ searchParams }: { searchParams?: { page?: string } }) {
  const pageNum = await searchParams
  const currentPage = Number(pageNum?.page || 1)
  const limit = 4

  try {
    const data = await fetchFromApi<ApiResponse<Certificate>>(`/certificates?sort=-type,-date&page=${currentPage}&limit=${limit}`)
    const { docs: certificates, totalPages } = data

    if (currentPage > totalPages) notFound()

    return (
      <div className='mx-auto flex flex-col md:max-w-2xl'>
        <h1 className='mb-6 text-center text-3xl font-bold'>Certificates</h1>
        <Divider className='mb-8' />
        {certificates.length === 0 ? (
          <p className='text-center text-gray-600 dark:text-gray-300'>
            No Certificates.
          </p>
        ) : (
          <div className='grid grid-cols-1 gap-8'>
            {certificates.map((cert, idx) => (
              <CertificateCard key={idx} {...cert} />
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className='mt-10 flex justify-center'>
            <PaginationWrapper
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    )
  } catch (error) {
    throw new Error('Error in retrieving certificates from the server')
  }
}
