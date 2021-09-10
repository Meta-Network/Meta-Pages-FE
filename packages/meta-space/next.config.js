/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    return config
  },
}

module.exports = withPlugins([], nextConfig)