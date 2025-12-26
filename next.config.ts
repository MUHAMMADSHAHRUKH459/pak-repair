import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'mongoose'];
    return config;
  },
};

export default nextConfig;