/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            // port: '3000',
            // pathname: '/account123/**',
          },
          {
            protocol: 'http',
            hostname: 'host.docker.internal',
            // port: '3000',
            // pathname: '/account123/**',
          },
          {
            protocol: 'http',
            hostname: 'mysql',
            // port: '3000',
            // pathname: '/account123/**',
          }
        ],
      },
}

module.exports = nextConfig
