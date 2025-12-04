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
