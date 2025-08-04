import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import ProjectCards from '../ProjectCards'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

const mockProjects = [
  {
    id: 'proj-1',
    slug: 'next-dashboard',
    title: 'Next.js Dashboard',
    short_desc: 'An interactive admin panel built with Next.js and Tailwind CSS.',
  },
  {
    id: 'proj-2',
    slug: 'next-dashboard2',
    title: 'Next.js Dashboard2',
    short_desc: 'An interactive admin panel built with Next.js and Tailwind CSS.2',
  },
]

describe('ProjectCards', () => {
  const mockRouterPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    })
  })

  it('renders correct number of cards', () => {
    render(<ProjectCards projects={mockProjects} />)
    const cards = screen.getAllByRole('project')
    expect(cards).toHaveLength(mockProjects.length)
  })

  it('displays correct project information', () => {
    render(<ProjectCards projects={mockProjects} />)
    
    // First project
    expect(screen.getByText('Next.js Dashboard')).toBeInTheDocument()
    expect(screen.getByText('An interactive admin panel built with Next.js and Tailwind CSS.')).toBeInTheDocument()
    
    // Second project
    expect(screen.getByText('Next.js Dashboard2')).toBeInTheDocument()
    expect(screen.getByText('An interactive admin panel built with Next.js and Tailwind CSS.2')).toBeInTheDocument()
  })

  it('has correct links for each project', () => {
    render(<ProjectCards projects={mockProjects} />)
    const links = screen.getAllByRole('link', { name: 'Read more' })
    
    expect(links[0]).toHaveAttribute('href', '/projects/next-dashboard')
    expect(links[1]).toHaveAttribute('href', '/projects/next-dashboard2')
  })

  it('stops propagation when "Read more" is clicked', () => {
    render(<ProjectCards projects={mockProjects} />)
    const readMoreLinks = screen.getAllByText('Read more')
    
    // Create a spy on stopPropagation
    const stopPropagationSpy = jest.spyOn(Event.prototype, 'stopPropagation')
    
    fireEvent.click(readMoreLinks[0])
    
    expect(stopPropagationSpy).toHaveBeenCalled()
    stopPropagationSpy.mockRestore() // Clean up the spy
  })

  it('does not trigger card navigation when "Read more" is clicked', () => {
    render(<ProjectCards projects={mockProjects} />)
    const readMoreLinks = screen.getAllByText('Read more')
    
    fireEvent.click(readMoreLinks[0])
    
    // Card navigation should not be triggered for "Read more" clicks
    expect(mockRouterPush).not.toHaveBeenCalled()
  })

  it('applies correct styling to cards', () => {
    render(<ProjectCards projects={mockProjects} />)
    const cards = screen.getAllByRole('project')
    
    cards.forEach(card => {
      expect(card).toHaveClass('bg-black-900/100')
      expect(card).toHaveClass('border-gray-500')
      expect(card).toHaveClass('hover:shadow-md')
    })
  })
})