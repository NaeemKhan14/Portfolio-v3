import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import ProjectsList from '../ProjectsList'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockProjects: ProjectList[] = [
  {
    id: 'proj-1',
    slug: 'next-dashboard',
    title: 'Next.js Dashboard',
    short_desc:
      'An interactive admin panel built with Next.js and Tailwind CSS.',
  },
  {
    id: 'proj-2',
    slug: 'ai-chatbot',
    title: 'AI Chatbot',
    short_desc: 'A conversational chatbot powered by GPT-4.',
  },
]

describe('ProjectsList', () => {
  let mockPush: jest.Mock

  beforeEach(() => {
    mockPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    jest.clearAllMocks()
  })

  it('renders section heading', () => {
    render(<ProjectsList projects={mockProjects} />)
    expect(
      screen.getByRole('heading', { name: 'Projects' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('divider')).toBeInTheDocument()
  })

  it('renders individual project cards', () => {
    render(<ProjectsList projects={mockProjects} />)

    mockProjects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument()
      expect(screen.getByText(project.short_desc)).toBeInTheDocument()
    })

    const readMoreLinks = screen.getAllByRole('link', { name: 'Read more' })
    expect(readMoreLinks).toHaveLength(mockProjects.length)
  })

  it('renders empty state when no projects are passed', () => {
    render(<ProjectsList projects={[]} />)
    expect(screen.getByText('No projects yet')).toBeInTheDocument()
    expect(screen.getByText(/Check back soon/i)).toBeInTheDocument()
  })

  it('links have correct href attributes', () => {
    render(<ProjectsList projects={mockProjects} />)

    const readMoreLinks = screen.getAllByRole('link', { name: 'Read more' })
    mockProjects.forEach((project, index) => {
      expect(readMoreLinks[index]).toHaveAttribute(
        'href',
        `/projects/${project.slug}`,
      )
    })
  })

  it('applies correct styling to cards', () => {
    render(<ProjectsList projects={mockProjects} />)
    const cards = screen.getAllByRole('button')

    cards.forEach((card) => {
      expect(card).toHaveClass('bg-black-900/100')
      expect(card).toHaveClass('border-gray-500')
      expect(card).toHaveClass('hover:shadow-md')
    })
  })
})
