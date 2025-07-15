import { CertificateCard } from './CertificateCard'
import { Divider } from '@heroui/react'
import prisma from '@/lib/prisma'

export default async function CertificateSection() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { id: 'asc' },
    take: 2,
  })

  return (
    <section className='py-8'>
      <div className='mx-auto mb-10 max-w-3xl px-6'>
        <h2 className='mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white'>
          Certificates
        </h2>
        <div className='grid gap-6 md:gap-2'>
          {certificates.map((cert, idx) => (
            <CertificateCard key={idx} {...cert} />
          ))}
        </div>
        <div className='mt-3 text-center'>
          <a
            className='bg-danger rounded-lg px-4 py-4 text-center text-sm text-white transition-colors hover:bg-pink-300 dark:hover:bg-pink-900'
            href='/certificates'
          >
            More Certificates...
          </a>
        </div>
      </div>
      <Divider data-testid='divider' className='mx-auto max-w-3xl' />
    </section>
  )
}
