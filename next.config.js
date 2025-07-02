/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
