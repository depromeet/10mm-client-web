9;
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
    pageExtensions: ['page.tsx', 'page.ts', 'api.tsx', 'api.ts'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
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
