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
    ],
  },
};

module.exports = nextConfig;
