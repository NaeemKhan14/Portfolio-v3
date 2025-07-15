import { render, screen } from '@testing-library/react'
import prisma from '@/lib/prisma'
import CertificateSection from '../CertificateSection'

const mockCertificates = [
  {
    id: 1,
    credential_id: 'cert001',
    title: 'Frontend Developer Certification',
    issuer: 'Codecademy',
    type: 'Professional',
    date: '2024-03-20',
    logo: '/certs/frontend.svg',
    link: 'https://example.com/cert001',
  },
  {
    id: 2,
    credential_id: 'cert002',
    title: 'Backend Developer Certification',
    issuer: 'Udemy',
    type: 'Professional',
    date: '2024-04-15',
    logo: '/certs/backend.svg',
    link: 'https://example.com/cert002',
  },
  {
    id: 3,
    credential_id: 'cert003',
    title: 'Full Stack Developer Certification',
    issuer: 'Udemy',
    type: 'Professional',
    date: '2024-07-13',
    logo: '/certs/fs.svg',
    link: 'https://example.com/cert003',
  },
]

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    certificate: {
      findMany: jest.fn(),
    },
  },
}))

describe('CertificateSection', () => {
  beforeEach(() => {
    ;(prisma.certificate.findMany as jest.Mock).mockResolvedValue(
      mockCertificates,
    )
  })

  it('renders heading correctly', async () => {
    render(await CertificateSection())
    expect(
      screen.getByRole('heading', { name: /Certificates/i }),
    ).toBeInTheDocument()
  })

  it('renders certificate cards', async () => {
    render(await CertificateSection())
    const cardTitles = mockCertificates.map((cert) => cert.title)
    cardTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  it('renders link to more certificates', async () => {
    render(await CertificateSection())
    const link = screen.getByRole('link', { name: /More Certificates/i })
    expect(link).toHaveAttribute('href', '/certificates')
  })

  it('renders divider element', async () => {
    render(await CertificateSection())
    const divider = screen.getByTestId('divider')
    expect(divider).toBeInTheDocument()
  })
})
