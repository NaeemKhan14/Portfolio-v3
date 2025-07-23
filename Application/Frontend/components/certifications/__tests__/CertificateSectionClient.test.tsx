import { render, screen, act } from '@testing-library/react'
import CertificateSectionClient from '../CertificateSectionClient'

const mockFetchFromApi = jest.fn()
jest.mock('@/lib/api-fetcher', () => ({
  fetchFromApi: (...args: any[]) => mockFetchFromApi(...args),
}))

const data = {
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
}

async function renderWithAct(ui: React.ReactElement) {
  await act(async () => {
    render(ui)
  })
}

describe('CertificateSectionClient', () => {
  beforeEach(() => {
    mockFetchFromApi.mockReset()
  })

it('renders section with title and certificates', async () => {
  mockFetchFromApi.mockResolvedValue(data)

  await renderWithAct(<CertificateSectionClient />)

  expect(await screen.findByText('Security Certification')).toBeInTheDocument()
  expect(await screen.findByText('JavaScript Course')).toBeInTheDocument()
})

  it('renders only 2 certificates', async () => {
    mockFetchFromApi.mockResolvedValue(data)

    await renderWithAct(<CertificateSectionClient />)

    const cards = await screen.findAllByTestId('certificate-card')
    expect(cards).toHaveLength(2)
  })

  it('renders divider', async () => {
    mockFetchFromApi.mockResolvedValue({ docs: [] })
    await renderWithAct(<CertificateSectionClient />)

    expect(await screen.findByTestId('divider')).toBeInTheDocument()
  })

  it('renders "More Certificates" button', async () => {
    mockFetchFromApi.mockResolvedValue(data)

    await renderWithAct(<CertificateSectionClient />)

    expect(
      await screen.findByTestId('more certificates btn'),
    ).toBeInTheDocument()
  })

  it('does not render "More Certificates" link when there are no certificates', async () => {
    mockFetchFromApi.mockResolvedValue({ docs: [] })

    await renderWithAct(<CertificateSectionClient />)

    const moreLink = screen.queryByText(/More Certificates.../i)
    expect(moreLink).not.toBeInTheDocument()
  })

  it('empty data recieved from backend server', async () => {
    mockFetchFromApi.mockResolvedValue({ docs: [] })

    await renderWithAct(<CertificateSectionClient />)

    expect(await screen.findByText(/no certificates/i)).toBeInTheDocument()
  })

  it('renders error message if fetch fails', async () => {
    // This is to shut up the simulated error from showing up in console
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    mockFetchFromApi.mockRejectedValue(
      new Error('Could not get certificates from the server'),
    )

    await renderWithAct(<CertificateSectionClient />)

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/Could not get certificates from the server/i),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: /try again/i }),
    ).toBeInTheDocument()
    consoleError.mockRestore()
  })
  
})
