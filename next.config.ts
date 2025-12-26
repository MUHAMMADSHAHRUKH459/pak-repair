import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 uses serverExternalPackages instead
  serverExternalPackages: ['mongoose'],
  
  // Empty turbopack config to silence warnings
  turbopack: {},
};

export default nextConfig;