import { fetchFromApi } from '@/lib/api-fetcher'

describe('fetchFromApi', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    global.fetch = jest.fn()
  })

  afterEach(() => {
    process.env = originalEnv
    jest.restoreAllMocks()
  })

  it('fetches data successfully', async () => {
    process.env.CMS_INTERNAL_URL = 'https://localhost:3001/api'
    const mockData = { docs: [{ id: '1', title: 'Test' }] }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const result = await fetchFromApi('/test')

    expect(global.fetch).toHaveBeenCalledWith(
      'https://localhost:3001/api/test',
      expect.objectContaining({ cache: 'no-store' }),
    )
    expect(result).toEqual(mockData)
  })

  it('throws error when API URL is not defined', async () => {
    delete process.env.CMS_INTERNAL_URL

    await expect(fetchFromApi('/test')).rejects.toThrow(
      'CMS_INTERNAL_URL is not defined',
    )
  })

  it('throws error when fetch fails', async () => {
    process.env.CMS_INTERNAL_URL = 'https://localhost:3001/api'
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    await expect(fetchFromApi('/test')).rejects.toThrow('Failed to fetch data for /test')
  })
})
