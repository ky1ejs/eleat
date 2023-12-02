/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/items",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
