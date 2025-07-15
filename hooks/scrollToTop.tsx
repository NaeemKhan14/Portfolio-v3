'use client'

import { useEffect, useState } from 'react'
import { Button } from '@heroui/react'
import { ArrowUp } from 'lucide-react'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 10) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className='fixed right-0 bottom-0 p-6'>
      {isVisible && (
        <Button
          isIconOnly
          aria-label='Scroll to top'
          className='bg-danger text-white transition-all hover:bg-gray-800 dark:hover:bg-gray-600'
          size='lg'
          onClick={scrollToTop}
        >
          <ArrowUp className='h-5 w-5' />
        </Button>
      )}
    </div>
  )
}
