'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Pagination } from '@heroui/react'

export function PaginationWrapper({
  currentPage,
  totalPages,
  basePath,
  queryParams = {},
}: PaginationWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    // Overwrite or add 'page'
    params.set('page', page.toString())

    // Merge in any additional query params
    for (const [key, value] of Object.entries(queryParams)) {
      params.set(key, value)
    }

    // Navigate to the correct URL
    router.push(`${basePath || pathname}?${params.toString()}`)
  }

  return (
    <Pagination
      loop
      showControls
      size='lg'
      color='danger'
      total={totalPages}
      initialPage={currentPage}
      onChange={handlePageChange}
    />
  )
}
