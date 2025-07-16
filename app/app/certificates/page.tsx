import { CertificateCard } from '@/components/certifications/CertificateCard'
import { fetchFromApi } from '@/lib/payload/fetcher'
import { Divider } from '@heroui/react'

export default async function CertificatesPage() {
  const data = await fetchFromApi<Certificate>('/certificates?sort=-date')
  const certificates =  data.docs

  return (
    <div className='mx-auto flex flex-col md:max-w-2xl'>
      <h1 className='mb-6 text-center text-3xl font-bold'>Certificates</h1>
      <Divider className='mb-8' />
      <div className='grid grid-cols-1 gap-8'>
        {certificates.map((cert, idx) => (
          <CertificateCard key={idx} {...cert} />
        ))}
      </div>
    </div>
  )
}