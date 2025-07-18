'use client'

import { Breadcrumbs as HeroBreadcrumbs, BreadcrumbItem } from '@heroui/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const Breadcrumbs = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <HeroBreadcrumbs className='container mx-auto max-w-3xl p-8 pb-8'>
      <BreadcrumbItem>
        <Link
          href='/'
          className={pathname === '/' ? 'text-danger font-bold' : ''}
        >
          Home
        </Link>
      </BreadcrumbItem>

      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`
        const isCurrent = index === pathSegments.length - 1
        const label =
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')

        return (
          <BreadcrumbItem key={href}>
            {isCurrent ? (
              <span className='text-danger font-bold'>{label}</span>
            ) : (
              <Link href={href} className='hover:text-danger'>
                {label}
              </Link>
            )}
          </BreadcrumbItem>
        )
      })}
    </HeroBreadcrumbs>
  )
}
