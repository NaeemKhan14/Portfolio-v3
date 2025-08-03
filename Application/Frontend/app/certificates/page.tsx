import { Divider } from '@heroui/react'
import { Suspense } from 'react'
import CertificatesList from './CertificatesList'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default async function CertificatesPage({ 
  searchParams 
}: { 
  searchParams?: { page?: string } 
}) {
  const pageNum = await searchParams
  const currentPage = Number(pageNum?.page || 1)

  return (
    <div className='mx-auto flex flex-col md:max-w-2xl'>
      <h1 className='mb-6 text-center text-3xl font-bold'>Certificates</h1>
      <Divider className='mb-8' />
      
      <Suspense fallback={<LoadingSpinner />}>
        <CertificatesList currentPage={currentPage} />
      </Suspense>
    </div>
  )
}