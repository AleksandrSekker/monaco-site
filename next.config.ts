import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    // Add both qualities
    qualities: [75, 85],
  },
  // Add webpack configuration to handle Sanity modules and path aliases
  webpack: (config, { isServer }) => {
    // Handle path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/sanity': path.resolve(__dirname, 'sanity'),
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Add TypeScript page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Enable experimental features
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
