import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Note: We removed the 'eslint' block here because it causes errors.
  // We will handle linting in package.json instead.
};

export default nextConfig;
