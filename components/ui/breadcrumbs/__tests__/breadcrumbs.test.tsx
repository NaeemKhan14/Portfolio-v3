import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { Breadcrumbs } from '../breadcrumbs'
import { HTMLAttributes, ReactNode } from 'react'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

jest.mock('@heroui/react', () => ({
  Breadcrumbs: ({
    children,
    ...props
  }: { children: ReactNode } & HTMLAttributes<HTMLElement>) => (
    <nav {...props}>{children}</nav>
  ),
  BreadcrumbItem: ({ children }: { children: ReactNode }) => (
    <span>{children}</span>
  ),
}))

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...props
  }: {
    href: string
    children: ReactNode
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
})

const mockUsePathname = usePathname as jest.Mock

describe('Breadcrumbs', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders only Home on root path', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Breadcrumbs />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Home')).toHaveClass('font-bold text-danger')
  })

  it('renders single segment correctly (/blog)', () => {
    mockUsePathname.mockReturnValue('/blog')
    render(<Breadcrumbs />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toHaveClass('font-bold text-danger')
  })

  it('renders blog dynamic route (/blog/1)', () => {
    mockUsePathname.mockReturnValue('/blog/1')
    render(<Breadcrumbs />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('1')).toHaveClass('font-bold text-danger')
  })

  it('renders projects dynamic route (/projects/1)', () => {
    mockUsePathname.mockReturnValue('/projects/1')
    render(<Breadcrumbs />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('1')).toHaveClass('font-bold text-danger')
  })

  it('renders kebab-case segment correctly (/projects/alpha-test)', () => {
    mockUsePathname.mockReturnValue('/projects/alpha-test')
    render(<Breadcrumbs />)

    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Alpha test')).toHaveClass('font-bold text-danger')
  })

  it('handles trailing slash (/certificates/)', () => {
    mockUsePathname.mockReturnValue('/certificates/')
    render(<Breadcrumbs />)

    expect(screen.getByText('Certificates')).toHaveClass(
      'font-bold text-danger',
    )
  })

  it('handles empty path (edge case)', () => {
    mockUsePathname.mockReturnValue('')
    render(<Breadcrumbs />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.queryByText(/.+/)).toBeTruthy() // only Home exists
  })
})
