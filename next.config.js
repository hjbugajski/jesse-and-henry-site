const production = true; // process.env.NODE_ENV === 'production';

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
  redirects: async () => {
    return [
      {
        source: '/protected',
        destination: '/',
        permanent: true,
      },
      {
        source: '/protected/guest-information',
        destination: '/guest-information',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
