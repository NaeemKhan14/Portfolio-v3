'use client'

import { useEffect } from 'react'

export default function Error({
  error
}: {
  error: Error
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="mx-auto flex flex-col md:max-w-2xl text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Something went wrong
        </h1>

        {error?.message && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {error.message}
          </p>
        )}

        <div className="mt-3">
          <button
            className='bg-danger rounded-lg px-4 py-2 text-center text-sm text-white transition-colors hover:bg-pink-300 dark:hover:bg-pink-900'
          >
            Try again
          </button>
        </div>
    </section>
  )
}
