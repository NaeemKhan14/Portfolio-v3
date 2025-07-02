/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
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
