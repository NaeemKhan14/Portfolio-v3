import { render, screen } from '@testing-library/react'
import CertificateSection from '../CertificateSection'

jest.mock('@/lib/api-fetcher', () => ({
  fetchFromApi: jest.fn().mockResolvedValue({
    docs: [
      {
        id: '1',
        credential_id: 'ABC123',
        title: 'Security Certification',
        issuer: 'Security Institute',
        type: 'certification',
        date: new Date('2023-06-15T00:00:00.000Z'),
        logo: '/security-logo.png',
        link: 'https://example.com/cert/1',
      },
      {
        id: '2',
        credential_id: 'DEF456',
        title: 'JavaScript Course',
        issuer: 'JS Academy',
        type: 'course',
        date: new Date('2023-03-10T00:00:00.000Z'),
        logo: '/js-logo.png',
        link: 'https://example.com/cert/2',
      },
    ],
  }),
}))

describe('CertificateSection', () => {
  it('renders section with title and certificates', async () => {
    render(await CertificateSection())

    // Wait for data to load
    expect(await screen.findByText('Certificates')).toBeInTheDocument()
    expect(screen.getByText('Security Certification')).toBeInTheDocument()
    expect(screen.getByText('JavaScript Course')).toBeInTheDocument()
  })

  it('renders only 2 certificates', async () => {
    render(await CertificateSection())

    const cards = await screen.findAllByTestId('certificate-card')
    expect(cards.length).toBe(2)
  })

  it('renders "More Certificates" link', async () => {
    render(await CertificateSection())

    expect(await screen.findByText('More Certificates...')).toHaveAttribute(
      'href',
      '/certificates',
    )
  })

  it('renders divider', async () => {
    render(await CertificateSection())

    expect(screen.getByTestId('divider')).toBeInTheDocument()
  })
})
