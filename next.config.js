/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' to enable server-side features
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['images.unsplash.com', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  // Add performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig;