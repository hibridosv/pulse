/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'connect.test',
          },{
            protocol: 'https',
            hostname: 'api.latam-pos.com',
          },
          {
            protocol: 'https',
            hostname: 'unsplash.com',
          },
        ],
    },
};

export default nextConfig;
