import { render, screen } from '@testing-library/react'
import { fetchFromApi } from '@/lib/api-fetcher'
import { notFound } from 'next/navigation'
import CertificatesList from '../CertificatesList'

jest.mock('@/lib/api-fetcher')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
  usePathname: jest.fn().mockReturnValue('/'),
  notFound: jest.fn(),
}))

// Mock CertificateCard with simplified output
jest.mock('@/components/certifications/CertificateCard', () => ({
  __esModule: true,
  CertificateCard: ({ title }: { title: string }) => (
    <div data-testid="certificate-card">{title}</div>
  )
}))

// Mock PaginationWrapper
jest.mock('@/components/ui/PaginationWrapper', () => ({
  __esModule: true,
  PaginationWrapper: ({ currentPage, totalPages }: any) => (
    <div data-testid="pagination-wrapper">
      Pagination: {currentPage} of {totalPages}
    </div>
  )
}))

const mockApiResponse = {
  docs: [
    {
      id: 'cert-1',
      credential_id: 'X1',
      title: 'Offensive Security Certified Professional',
      issuer: 'OffSec',
      type: 'certification',
      date: '2025-04-15T00:00:00.000Z',
      logo: '/oscp.png',
      link: 'https://example.com/oscp',
    }
  ],
  totalPages: 2
}

describe('CertificatesList', () => {
  const mockFetchFromApi = fetchFromApi as jest.MockedFunction<typeof fetchFromApi>

  beforeEach(() => {
    jest.clearAllMocks()
    mockFetchFromApi.mockReset()
  })

  it('renders "No Certificates." when there are no certificates', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      docs: [],
      totalPages: 1
    } as any)

    const Component = await CertificatesList({ currentPage: 1 })
    render(Component)

    expect(screen.getByText('No Certificates.')).toBeInTheDocument()
    expect(screen.queryByTestId('certificate-card')).not.toBeInTheDocument()
  })

  it('renders certificate cards when data is available', async () => {
    mockFetchFromApi.mockResolvedValueOnce(mockApiResponse as any)

    const Component = await CertificatesList({ currentPage: 1 })
    render(Component)

    expect(screen.getByTestId('certificate-card')).toBeInTheDocument()
    expect(screen.getByText('Offensive Security Certified Professional')).toBeInTheDocument()
  })

  it('renders pagination when totalPages > 1', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      ...mockApiResponse,
      totalPages: 3
    } as any)

    const Component = await CertificatesList({ currentPage: 1 })
    render(Component)

    expect(screen.getByTestId('pagination-wrapper')).toBeInTheDocument()
    expect(screen.getByText('Pagination: 1 of 3')).toBeInTheDocument()
  })

  it('does not render pagination when totalPages = 1', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      ...mockApiResponse,
      totalPages: 1
    } as any)

    const Component = await CertificatesList({ currentPage: 1 })
    render(Component)

    expect(screen.queryByTestId('pagination-wrapper')).not.toBeInTheDocument()
  })

  it('calls notFound when currentPage > totalPages', async () => {
    mockFetchFromApi.mockResolvedValueOnce({
      ...mockApiResponse,
      totalPages: 1
    } as any)

    await CertificatesList({ currentPage: 2 })
    expect(notFound).toHaveBeenCalled()
  })

  it('throws error when fetchFromApi fails', async () => {
    mockFetchFromApi.mockRejectedValueOnce(new Error('API failure'))

    await expect(
      CertificatesList({ currentPage: 1 })
    ).rejects.toThrow('Error in retrieving certificates from the server')
  })

  it('calls API with correct parameters', async () => {
    mockFetchFromApi.mockResolvedValueOnce(mockApiResponse as any)

    await CertificatesList({ currentPage: 2, limit: 6 })

    expect(mockFetchFromApi).toHaveBeenCalledWith(
      '/certificates?sort=-type,-date&page=2&limit=6'
    )
  })
})
