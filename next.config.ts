import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Example of ignoring TypeScript errors during the build
  },
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary to the allowed domains
  },
};

export default nextConfig;
