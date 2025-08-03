/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove 'standalone' for Vercel deployment
    // output: 'standalone',
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "100MB",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.pixabay.com",
            },
            {
                protocol: "https",
                hostname: "img.freepik.com",
            },
            {
                protocol: "https",
                hostname: "cloud.appwrite.io",
            },
            {
                protocol: "https",
                hostname: "fra.cloud.appwrite.io",
            },
        ],
    },
}

module.exports = nextConfig 