/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHooks: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
