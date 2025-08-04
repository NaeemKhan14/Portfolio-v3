import { Divider } from '@heroui/react'
import { Suspense } from 'react'
import CertificatesList from './CertificatesList'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import EmptyPageLayout from '@/components/ui/EmptyPageWrapper'

export default async function CertificatesPage({ 
  searchParams 
}: { 
  searchParams?: { page?: string } 
}) {
  const pageNum = await searchParams
  const currentPage = Number(pageNum?.page || 1)

  return (
    <EmptyPageLayout title='Certificates'>
      <CertificatesList currentPage={currentPage} />
    </EmptyPageLayout>
  )
}