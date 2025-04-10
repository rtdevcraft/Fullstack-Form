/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: false,
  },

  webpack: (config) => {
    return config
  },
}

module.exports = nextConfig
