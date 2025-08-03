export async function fetchFromApi<T>(
  endpoint: string,
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_CMS_API_URL is not defined')
  }

  const res = await fetch(`${baseUrl}${endpoint}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch data for ${endpoint}`)
  }

  return res.json()
}
