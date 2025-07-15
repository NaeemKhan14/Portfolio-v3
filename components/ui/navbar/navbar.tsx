'use client'

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
} from '@heroui/navbar'
import { Link } from '@heroui/link'
import { link as linkStyles } from '@heroui/theme'
import NextLink from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '../theme-switch'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <HeroUINavbar
      role='navigation'
      className='container mx-auto max-w-3xl md:mt-5'
      maxWidth='md'
      position='sticky'
    >
      {/* Desktop Nav */}
      <NavbarContent className='sm:basis-full' justify='start'>
        <ul className='ml-2 hidden justify-start gap-4 sm:flex'>
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: isActive ? 'danger' : 'foreground' }),
                    isActive,
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            )
          })}
        </ul>
      </NavbarContent>

      {/* Desktop Right Content */}
      <NavbarContent
        className='hidden basis-1/5 sm:flex sm:basis-full'
        justify='end'
      >
        <NavbarItem className='hidden gap-2 sm:flex'>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent className='basis-1 pl-4 sm:hidden' justify='end'>
        <ThemeSwitch />
        <NavbarMenuToggle data-testid='mobile-menu-toggle' />
      </NavbarContent>

      {/* Mobile Nav Menu */}
      <NavbarMenu>
        <div
          className='mx-4 mt-2 flex flex-col gap-2'
          data-testid='mobile-menu'
        >
          {siteConfig.navMenuItems.map((item, index) => {
            const isActive = pathname === item.href

            return (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                <Link
                  className={clsx(isActive && 'font-medium')}
                  color={isActive ? 'danger' : 'foreground'}
                  href={item.href}
                  size='lg'
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            )
          })}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  )
}

export default Navbar
