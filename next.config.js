9;
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'page.ts', 'api.tsx', 'api.ts'],
  experimental: {
    appDir: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Cloudfront URL
        hostname: 'd34pqvj560nej5.cloudfront.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'image.10mm.today',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
