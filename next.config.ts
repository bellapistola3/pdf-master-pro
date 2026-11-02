import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;
