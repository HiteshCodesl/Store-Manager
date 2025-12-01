/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  experimental: {
    turbo: false
  },
   eslint: {
    ignoreDuringBuilds: true,
  }, 
    typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;


