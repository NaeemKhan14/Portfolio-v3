import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { Link } from '@heroui/link'
import clsx from 'clsx'

import { Providers } from './providers'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { NavbarWrapper } from '@/components/ui/navbar/navbar-wrapper'
import { ScrollToTop } from '@/hooks/scrollToTop'
import { Breadcrumbs } from '@/components/ui/breadcrumbs/breadcrumbs'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/images/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body
        className={clsx(
          'text-foreground bg-background min-h-screen font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className='relative flex h-screen flex-col'>
            <NavbarWrapper />
            <main className='container mx-auto max-w-7xl grow px-6'>
              <Breadcrumbs />
              {children}
            </main>
            <ScrollToTop />
            <footer className='flex w-full items-center justify-center py-3'>
              <span className='pr-1'>© 2022 All Rights Reserved.</span>
              <span className='text-default-600 pr-1'>Powered by</span>

              <Link
                isExternal
                className='flex items-center gap-1 text-current'
                href='https://heroui.com?utm_source=next-app-template'
                title='heroui.com homepage'
              >
                <p className='text-danger hover:underline'>HeroUI</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
