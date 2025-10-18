/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'figma.com',
      },
      {
        protocol: 'https',
        hostname: '*.figma.com',
      },
    ],
  },
}

module.exports = nextConfig