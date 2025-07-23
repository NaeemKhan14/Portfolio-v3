'use client'

import Error from '@/app/error'
import { fetchFromApi } from '@/lib/api-fetcher'
import { Divider } from '@heroui/react'
import { useEffect, useState } from 'react'
import { CertificateCard } from './CertificateCard'

export default function CertificateSectionClient() {
  const [certificates, setCertificates] = useState<Certificate[] | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const fetchCertificates = async () => {
    try {
      const data = await fetchFromApi<Certificate>(
        '/certificates?sort=-date&limit=2',
      )
      setCertificates(data.docs)
    } catch (err) {
      setError(new globalThis.Error('Could not get certificates from the server'))
    }
  }
  useEffect(() => {
    fetchCertificates()
  }, [])

  if (error) {
    return <Error error={error} />
  }

  if (!certificates) {
    return (
      <div className='mx-auto mb-10 max-w-3xl px-6 py-8'>
        <h2 className='mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white'>
          Certificates
        </h2>
        <h4 className='text-center'>Loading Certificates...</h4>
      </div>
    )
  }

  return (
    <section className='py-8'>
      <div className='mx-auto mb-10 max-w-3xl px-6'>
        <h2 className='mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white'>
          Certificates
        </h2>

        {certificates.length === 0 ? (
          <p className='text-center text-gray-600 dark:text-gray-300'>
            No Certificates.
          </p>
        ) : (
          <>
            <div className='grid gap-6 md:gap-2'>
              {certificates.map((cert, idx) => (
                <CertificateCard key={idx} {...cert} />
              ))}
            </div>
            <div className='mt-3 text-center'>
              <a
                data-testid='more certificates btn'
                className='bg-danger rounded-lg px-4 py-4 text-center text-sm text-white transition-colors hover:bg-pink-300 dark:hover:bg-pink-900'
                href='/certificates'
              >
                More Certificates...
              </a>
            </div>
          </>
        )}
      </div>
      <Divider data-testid='divider' className='mx-auto max-w-3xl' />
    </section>
  )
}
