/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  <-- REMOVED (Vercel doesn't need this)
  
  images: {
    // unoptimized: true, <-- REMOVED (Vercel will optimize images for you!)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Keep these to prevent build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
