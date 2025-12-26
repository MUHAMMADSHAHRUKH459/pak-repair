import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['ioredis'],
  turbopack: {},
};

export default nextConfig;