import { render, screen, fireEvent } from '@testing-library/react'
import { CertificateCard } from '../CertificateCard'

const mockCertification: Certificate = {
  id: '1',
  credential_id: 'ABC123',
  title: 'Security Certification',
  issuer: 'Security Institute',
  type: 'certification',
  date: new Date('2023-06-15T00:00:00.000Z'),
  logo: '/security-logo.png',
  link: 'https://example.com/cert/1',
}

const mockCertificate = {
  id: '2',
  credential_id: 'DEF456',
  title: 'JavaScript Course',
  issuer: 'JS Academy',
  type: 'course',
  date: new Date('2023-03-10T00:00:00.000Z'),
  logo: '/js-logo.png',
  link: 'https://example.com/cert/2',
}

describe('CertificateCard', () => {
  it('renders certification card with all elements', () => {
    render(<CertificateCard {...mockCertification} />)

    expect(screen.getByTestId('certificate-card')).toBeInTheDocument()
    expect(screen.getByText(mockCertification.title)).toBeInTheDocument()
    expect(screen.getByText(mockCertification.issuer)).toBeInTheDocument()
    expect(screen.getByText('Professional Certification')).toBeInTheDocument()
    expect(screen.getByText(/Credential ID/)).toBeInTheDocument()
    expect(screen.getByText('June 2023')).toBeInTheDocument()
    expect(screen.getByText('View Certificate →')).toBeInTheDocument()
  })

  it('renders certificate card without certification badge', () => {
    render(<CertificateCard {...mockCertificate} />)

    expect(
      screen.queryByText('Professional Certification'),
    ).not.toBeInTheDocument()
  })

  it('applies correct styling for certification type', () => {
    render(<CertificateCard {...mockCertification} />)
    const card = screen.getByTestId('certificate-card')

    expect(card).toHaveClass('border-warning-500')
    expect(card).toHaveClass('ring-warning-500')
  })

  it('applies correct styling for non-certification type', () => {
    render(<CertificateCard {...mockCertificate} />)
    const card = screen.getByTestId('certificate-card')

    expect(card).toHaveClass('border-gray-500')
    expect(card).not.toHaveClass('ring-warning-500')
  })

    it('opens link in new tab when clicked', () => {
      render(<CertificateCard {...mockCertification} />)
      const card = screen.getByTestId('certificate-card')

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })

      // Mock window.open
      const mockOpen = jest.fn()
      const originalOpen = window.open
      window.open = mockOpen

      card.dispatchEvent(clickEvent)

      expect(mockOpen).toHaveBeenCalledWith(mockCertification.link, '_blank')

      // Restore original window.open
      window.open = originalOpen
    })

  it('formats date correctly', () => {
    render(<CertificateCard {...mockCertification} />)
    expect(screen.getByText('June 2023')).toBeInTheDocument()
  })
})
