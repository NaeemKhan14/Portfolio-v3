import { render, screen, fireEvent } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/config/site'
import Navbar from '../navbar'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))
// TO-DO: mobile-menu test
describe('Navbar', () => {
  beforeEach(() => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
  })

  it('renders the desktop and mobile navigation items', () => {
    render(<Navbar />)
    siteConfig.navItems.forEach((item) => {
      const navLink = screen.getByRole('link', { name: item.label })
      expect(navLink).toHaveAttribute('href', item.href)
    })

    siteConfig.navMenuItems.forEach((item) => {
      const menuLink = screen.getByRole('link', { name: item.label })
      expect(menuLink).toHaveAttribute('href', item.href)
    })
  })

  it('renders ThemeSwitch on both desktop and mobile', () => {
    render(<Navbar />)
    const themeSwitches = screen.getAllByRole('switch')
    expect(themeSwitches.length).toBe(2)
  })

  it('renders mobile menu toggle button', () => {
    render(<Navbar />)
    const toggle = screen.getByTestId('mobile-menu-toggle')
    expect(toggle).toBeInTheDocument()
  })

  it('highlights active link with correct style', () => {
    const activeHref = siteConfig.navItems[1].href
    ;(usePathname as jest.Mock).mockReturnValue(activeHref)

    render(<Navbar />)

    const activeLink = screen.getByRole('link', {
      name: siteConfig.navItems[1].label,
    })
    expect(activeLink.className).toMatch(/danger/i)
  })

  it('contains correct number of mobile menu links', () => {
    render(<Navbar />)
    const links = screen.getAllByRole('link')
    const expectedCount = siteConfig.navMenuItems.length
    expect(links.length).toBeGreaterThanOrEqual(expectedCount)
  })
})
