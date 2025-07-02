/** @type {import('next').NextConfig} */
const nextConfig = {
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
