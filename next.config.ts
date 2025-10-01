import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['cdn2.thedogapi.com', 'cdn2.thecatapi.com'],
  },
};

export default nextConfig;
