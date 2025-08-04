import { CertificateCard } from '@/components/certifications/CertificateCard'
import { PaginationWrapper } from '@/components/ui/PaginationWrapper'
import { fetchFromApi } from '@/lib/api-fetcher'
import { ApiResponse } from '@/types/ApiResponse'
import { notFound } from 'next/navigation'

export default async function CertificatesList({
  currentPage,
  limit = 4
}: {
  currentPage: number
  limit?: number
}) {

  const data = await fetchFromApi<ApiResponse<Certificate>>(
    `/certificates?sort=-type,-date&page=${currentPage}&limit=${limit}`
  )
  const { docs: certificates, totalPages } = data

  if (currentPage > totalPages) notFound()

  return (
    <>
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
    </>
  )
}