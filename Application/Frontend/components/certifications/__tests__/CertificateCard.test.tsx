// import { render, screen, fireEvent } from '@testing-library/react'
// import { CertificateCard } from '../CertificateCard'

// const baseProps = {
//   title: 'Full Stack Developer',
//   issuer: 'Coursera',
//   type: 'certificate',
//   date: '2025-05-12',
//   logo: '/images/logo.png',
//   link: 'https://example.com',
//   credential_id: 'abc123',
// }

// describe('CertificateCard', () => {
//   it('renders card with certificate type', () => {
//     render(<CertificateCard {...baseProps} />)

//     expect(screen.getByTestId('certificate-card')).toBeInTheDocument()
//     expect(screen.getByText(baseProps.title)).toBeInTheDocument()
//     expect(screen.getByText(baseProps.issuer)).toBeInTheDocument()
//     expect(
//       screen.getByText(
//         (_, node: any) =>
//           node.textContent === `Credential ID: ${baseProps.credential_id}`,
//       ),
//     ).toBeInTheDocument()
//     expect(screen.getByText('View Certificate →')).toHaveAttribute(
//       'href',
//       baseProps.link,
//     )
//     expect(
//       screen.queryByText('Professional Certification'),
//     ).not.toBeInTheDocument()
//   })

//   it('renders card with certification type and badge', () => {
//     render(<CertificateCard {...baseProps} type='certification' />)

//     expect(screen.getByText('Professional Certification')).toBeInTheDocument()
//     expect(screen.getByText(baseProps.title)).toHaveClass('text-warning-500')
//     expect(screen.getByText(baseProps.date)).toHaveClass('text-warning-700')
//     expect(screen.getByText('View Certificate →')).toHaveClass(
//       'text-warning-600',
//     )
//   })

//   it('stops propagation when link is clicked', () => {
//     render(<CertificateCard {...baseProps} />)
//     const link = screen.getByText('View Certificate →')
//     const clickEvent = new MouseEvent('click', {
//       bubbles: true,
//       cancelable: true,
//     })

//     Object.defineProperty(clickEvent, 'stopPropagation', {
//       value: jest.fn(),
//       writable: true,
//     })
//     link.dispatchEvent(clickEvent)
//     expect(clickEvent.stopPropagation).toHaveBeenCalled()
//   })

//   it('renders both logos with correct alt text', () => {
//     render(<CertificateCard {...baseProps} />)

//     const images = screen.getAllByRole('img', {
//       name: `${baseProps.issuer} logo`,
//     })
//     expect(images).toHaveLength(2)
//     images.forEach((img) => expect(img).toHaveAttribute('src', baseProps.logo))
//   })
// })
