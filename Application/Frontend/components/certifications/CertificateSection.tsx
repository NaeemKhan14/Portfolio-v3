import { fetchFromApi } from '@/lib/api-fetcher'
import { CertificateCard } from './CertificateCard'
import { Divider } from '@heroui/react'

export default async function CertificateSection() {
  try {
    const data = await fetchFromApi<Certificate>(
      '/certificates?sort=-date&limit=2',
    )
    const certificates = data.docs

    if (!certificates || certificates.length === 0) {
      return (
        <section className='py-8'>
          <div className='mx-auto mb-10 max-w-3xl px-6 py-8'>
            <h2 className='mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white'>
              Certificates
            </h2>
            <h4 className='text-center' data-testid='no-certs'>No Cerificates</h4>
          </div>
          <Divider data-testid='divider' className='mx-auto max-w-3xl' />
        </section>
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
  } catch {
    return (
      <section className='py-8'>
        <div className='mx-auto mb-10 max-w-3xl px-6 py-8'>
          <h2 className='mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white'>
            Certificates
          </h2>
          <p className='text-center text-red-500'>
            Could not load certificates. Please try again later.
          </p>
        </div>
        <Divider data-testid='divider' className='mx-auto max-w-3xl' />
      </section>

    )
  }
}

