import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@upstash/redis'],
  turbopack: {},
};

export default nextConfig;