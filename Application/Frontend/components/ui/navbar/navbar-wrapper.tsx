'use client'

import { Divider } from '@heroui/react'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('./navbar'), { ssr: false })

export function NavbarWrapper() {
  return (
    <>
      <Navbar />
      <Divider className='mx-auto max-w-3xl' />
    </>
  )
}
