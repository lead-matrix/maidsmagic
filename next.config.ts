import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Prevent non-critical lint deprecations or stylistic warnings from failing Vercel production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
