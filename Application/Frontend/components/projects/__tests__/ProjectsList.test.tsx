// import { render, screen } from '@testing-library/react'
// import { useRouter } from 'next/navigation'
// import ProjectsList from '../ProjectsList'

// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }))

// const mockPush = jest.fn()

// const mockProjects = [
//   {
//     id: 1,
//     slug: 'next-dashboard',
//     title: 'Next.js Dashboard',
//     short_desc:
//       'An interactive admin panel built with Next.js and Tailwind CSS.',
//   },
//   {
//     id: 2,
//     slug: 'ai-chatbot',
//     title: 'AI Chatbot',
//     short_desc: 'A conversational chatbot powered by GPT-4.',
//   },
// ]

// describe('ProjectsList', () => {
//   beforeEach(() => {
//     ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
//     jest.clearAllMocks()
//   })

//   it('renders section heading', () => {
//     render(<ProjectsList projects={mockProjects} />)
//     expect(
//       screen.getByRole('heading', { name: /Projects/i }),
//     ).toBeInTheDocument()
//   })

//   it('renders individual project cards', () => {
//     render(<ProjectsList projects={mockProjects} />)
//     mockProjects.forEach((project) => {
//       expect(screen.getByText(project.title)).toBeInTheDocument()
//       expect(screen.getByText(project.short_desc)).toBeInTheDocument()
//     })
//   })

//   it('renders empty state when no projects are passed', () => {
//     render(<ProjectsList projects={[]} />)
//     expect(screen.getByText('No projects yet')).toBeInTheDocument()
//     expect(screen.getByText(/Check back soon/i)).toBeInTheDocument()
//   })

//   it('prevents card navigation when link is clicked', () => {
//     render(<ProjectsList projects={mockProjects} />)
//     const links = screen.getAllByRole('link', { name: 'Read more' })
//     const firstLink = links[0]

//     const clickEvent = new MouseEvent('click', {
//       bubbles: true,
//       cancelable: true,
//     })
//     Object.defineProperty(clickEvent, 'stopPropagation', {
//       value: jest.fn(),
//       writable: true,
//     })

//     firstLink.dispatchEvent(clickEvent)
//     expect(clickEvent.stopPropagation).toHaveBeenCalled()
//   })
// })
