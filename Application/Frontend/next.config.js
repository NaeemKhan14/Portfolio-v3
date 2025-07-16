/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'naeemkhan.dev',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
}

export default nextConfig
