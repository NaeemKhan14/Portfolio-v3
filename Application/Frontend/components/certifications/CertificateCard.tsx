'use client'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Chip,
} from '@heroui/react'

export const CertificateCard: React.FC<Certificate> = ({
  title,
  issuer,
  type,
  date,
  logo,
  link,
  credential_id,
}) => {
  const isCertification = type === 'certification'

  return (
    <Card
      data-testid='certificate-card'
      className={`bg-black-900/100 group relative mb-6 border transition-all hover:shadow-md ${isCertification
        ? 'border-warning-500 dark:border-warning-400 hover:shadow-warning-500/30 dark:hover:shadow-warning-400/30'
        : 'border-gray-500 hover:shadow-gray-400 dark:border-gray-700 dark:hover:shadow-white'
        } ${isCertification ? 'ring-warning-500 dark:ring-warning-400 ring-1' : ''} `}
      isHoverable
      isPressable
      onPress={() => (link != null ? window.open(link, '_blank') : '')}
    >
      {/* Certification badge */}
      {isCertification && (
        <div>
          <Chip
            color='warning'
            radius='sm'
            className='absolute -top-0 -right-0 z-10 px-2 py-1 text-xs font-bold group-hover:z-0'
          >
            Professional Certification
          </Chip>
          <p className='mb-10 md:mb-0'></p>
        </div>
      )}
      {/* Large logo with hover effect */}
      <div
        className={`absolute top-4 right-4 transform opacity-10 transition-all duration-400 group-hover:scale-110 group-hover:opacity-70 ${isCertification ? 'opacity-20 group-hover:opacity-90' : ''}`}
      >
        <Image
          src={logo}
          alt={`${issuer} logo`}
          width={80}
          height={80}
          className='rounded-md'
        />
      </div>

      <CardHeader className='flex items-center gap-4'>
        {/* Logo aligned to the left */}
        <Image
          src={logo}
          alt={`${issuer} logo`}
          width={48}
          height={48}
          className='shrink-0 rounded-md'
        />

        {/* Centered title and issuer that takes remaining space */}
        <div className='flex flex-1 flex-col items-center text-center'>
          <p
            className={`text-xl font-bold ${isCertification ? 'text-warning-500 dark:text-warning-400' : ''}`}
          >
            {title}
          </p>
          <p className='text-small text-default-500'>{issuer}</p>
        </div>

        {/* Empty div to balance the logo on the left */}
        <div className='w-12 shrink-0'></div>
      </CardHeader>

      <Divider
        className={isCertification ? 'bg-warning-500 dark:bg-warning-400' : ''}
      />

      <CardBody className='text-center'>
        <div className='mb-2 flex justify-center'>
          <span
            className={`inline-block rounded-full px-3 py-2 text-xs font-medium ${isCertification
              ? 'bg-warning-500/20 text-warning-700 dark:text-warning-300'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
          >
            {new Date(date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        </div>

        {credential_id.includes('Master')
          ? <span className='font-mono'>{credential_id}</span>
          : <p className='mb-3 text-xs text-gray-500 dark:text-gray-400'>
            Credential ID: <span className='font-mono'>{credential_id}</span>
          </p>}
      </CardBody>

      <Divider
        className={isCertification ? 'bg-warning-500 dark:bg-warning-400' : ''}
      />

      <CardFooter className='justify-center'>
        <Link
          href={link}
          isExternal
          className={`text-sm font-medium hover:underline ${isCertification
            ? 'text-warning-600 dark:text-warning-400'
            : 'text-danger'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          View Certificate →
        </Link>
      </CardFooter>
    </Card>
  )
}
