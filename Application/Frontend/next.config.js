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
      {
        protocol: 'http',
        hostname: 'backend',
        pathname: '/api/media/file/**',
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
}

export default nextConfig
