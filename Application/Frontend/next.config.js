/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  output: 'standalone',
  reactCompiler: false,
  images: {
    remotePatterns: [{
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
}

module.exports = nextConfig