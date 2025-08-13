'use client'

import { useState } from 'react'
import { Button } from '@heroui/react'

export default function DownloadButton({ label, filename }: { label: string, filename: string }) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/proxy/media/${encodeURIComponent(filename)}`)

      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed')
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onPress={handleDownload}
      isLoading={loading}
      color='danger'
      size='md'
      className='bg-danger rounded text-center text-sm text-white transition-colors hover:bg-pink-300 dark:hover:bg-pink-900 w-full max-w-[200px] md:max-w-[230px]'
    >
      {label}
    </Button>
  )
}
