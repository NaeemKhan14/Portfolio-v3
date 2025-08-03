'use client'

import { Spinner } from '@heroui/react'

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center py-8">
      <Spinner color="danger" label="Loading..." />
    </div>
  )
}