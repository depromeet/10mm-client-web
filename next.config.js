9;
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHooks: true,
    serverActions: true,
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
