'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@heroui/react'
import { useState } from 'react'

export default function MoreCertificatesButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    router.push('/certificates')
  }

  return (
    <Button
      onPress={handleClick}
      isLoading={loading}
      className='bg-danger rounded-lg px-4 py-4 text-center text-sm text-white transition-colors hover:bg-pink-300 dark:hover:bg-pink-900'
    >
      More Certificates...
    </Button>
  )
}
