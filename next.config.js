/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  redirects: async () => {
    return [
      {
        source: '/protected',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
