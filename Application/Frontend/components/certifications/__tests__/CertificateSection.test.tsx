import { render, screen, act } from '@testing-library/react'
import CertificateSection from '../CertificateSection'

const mockFetchFromApi = jest.fn()
jest.mock('@/lib/api-fetcher', () => ({
  fetchFromApi: (...args: any[]) => mockFetchFromApi(...args),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}))

const mockData = {
  docs: [
    {
      id: '1',
      credential_id: 'ABC123',
      title: 'Security Certification',
      issuer: 'Security Institute',
      type: 'certification',
      date: '2023-06-15T00:00:00.000Z',
      logo: '/security-logo.png',
      link: 'https://example.com/cert/1',
    },
    {
      id: '2',
      credential_id: 'DEF456',
      title: 'JavaScript Course',
      issuer: 'JS Academy',
      type: 'course',
      date: '2023-03-10T00:00:00.000Z',
      logo: '/js-logo.png',
      link: 'https://example.com/cert/2',
    },
  ],
}

describe('CertificateSection', () => {
  beforeEach(() => {
    mockFetchFromApi.mockReset()
  })

  it('renders section with title and certificates', async () => {
    mockFetchFromApi.mockResolvedValue(mockData)

    const Component = await CertificateSection()
    await act(async () => {
      render(Component)
    })

    expect(screen.getByText('Security Certification')).toBeInTheDocument()
    expect(screen.getByText('JavaScript Course')).toBeInTheDocument()
  })

  it('renders only 2 certificates', async () => {
    mockFetchFromApi.mockResolvedValue(mockData)

    const Component = await CertificateSection()
    await act(async () => {
      render(Component)
    })

    const cards = screen.getAllByTestId('certificate-card')
    expect(cards).toHaveLength(2)
  })

  it('renders divider', async () => {
    mockFetchFromApi.mockResolvedValue({ docs: [] })

    const Component = await CertificateSection()
    await act(async () => {
      render(Component)
    })

    expect(screen.getByTestId('divider')).toBeInTheDocument()
  })

  it('renders "More Certificates" button', async () => {
    mockFetchFromApi.mockResolvedValue(mockData)

    const Component = await CertificateSection()
    await act(async () => {
      render(Component)
    })

    expect(screen.getByTestId('more certificates btn')).toBeInTheDocument()
  })

  it('does not render "More Certificates" link when there are no certificates', async () => {
    mockFetchFromApi.mockResolvedValue({ docs: [] })

    const Component = await CertificateSection()
    await act(async () => {
      render(Component)
    })

    const moreLink = screen.queryByText(/More Certificates.../i)
    expect(moreLink).not.toBeInTheDocument()
  })

  it('empty data received from backend server', async () => {
    mockFetchFromApi.mockResolvedValue({ docs: [] })

    const Component = await CertificateSection()
    await act(async () => {
      render(Component)
    })

    expect(screen.getByTestId('no-certs')).toBeInTheDocument()
  })

  it('renders error message if fetch fails', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    mockFetchFromApi.mockRejectedValue(
      new Error('Could not get certificates from the server'),
    )

    const Component = await CertificateSection()
    await act(async () => {
      render(Component)
    })

    expect(screen.getByText(/Could not load certificates/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Please try again later/i),
    ).toBeInTheDocument()
    
    consoleError.mockRestore()
  })
})