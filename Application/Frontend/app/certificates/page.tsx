import CertificatesList from '@/components/certifications/CertificatesList'
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