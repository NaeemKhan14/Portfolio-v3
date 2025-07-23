import dynamic from 'next/dynamic'
/**
 * This Server Component acts as a wrapper for the CertificateSectionClient component.
 *
 * This pattern is used because:
 * - CertificateSectionClient uses `useEffect` and client-side data fetching,
 *   which means it's a Client Component. Note that `useEffect` can only be used in 
 *   a client component.
 *
 * - Client Components in Next.js cannot be asynchronous at the top level and
 *   cannot run server-side logic. Since our data fetching depends on `useEffect`,
 *   we must ensure that the component is only rendered on the client.
 *
 * - By using `next/dynamic` with `ssr: false` (lazy loading), we disable server-side 
 *   rendering for CertificateSectionClient. This prevents Next.js from trying to render
 *   client-only hooks (like `useEffect`) on the server, which would throw an error.
 *
 * This structure lets us isolate the error/loading/fetch logic inside a single section,
 * without affecting the rest of the page or causing a full route-level error.
 * 
 * The main reason for doing this is to prevent the main page from completly crashing
 * whenever there is an error in fetching data from API, or server is down. So now 
 * instead we show the error related to it and only this section is affected. The 
 * rest of the page (which is static) stays the same.
 */
const CertificateFetcher = dynamic(() => import('./CertificateSectionClient'), {
  ssr: false,
})

export default function CertificateSection() {
  return <CertificateFetcher />
}