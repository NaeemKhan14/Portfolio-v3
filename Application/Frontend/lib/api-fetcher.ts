export async function fetchFromApi<T>(
  endpoint: string,
): Promise<{ docs: T[] }> {
  const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_CMS_API_URL is not defined')
  }

  const res = await fetch(`${baseUrl}${endpoint}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`)
  }

  return res.json()
}
