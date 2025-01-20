/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true
    },
    basePath: '/procabservices',
    assetPrefix: '/procabservices/',  // Note the trailing slash
    trailingSlash: true,  // Add this line
  }

  module.exports = nextConfig