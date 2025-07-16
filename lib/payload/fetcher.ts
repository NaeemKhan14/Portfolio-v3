export async function fetchFromApi<T>(endpoint: string): Promise<{ docs: T[] }> {
  console.log(`${process.env.CMS_API_URL}${endpoint}`)
  const res = await fetch(`${process.env.CMS_API_URL}${endpoint}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`)
  }

  return res.json()
}