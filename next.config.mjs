/** @type {import('next').NextConfig} */
const nextConfig = {
  // For local development, basePath is '/'
  // This file will be overwritten during deployment with the appropriate basePath
  images: { unoptimized: true },
  output: 'standalone',
};

export default nextConfig;
