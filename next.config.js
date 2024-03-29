const production = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: production ? 'https' : 'http',
        hostname: production ? '*.jesseandhenry.com' : 'localhost',
        pathname: '/media/**',
      },
    ],
  },
};

module.exports = nextConfig;
