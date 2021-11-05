/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  webpack: (config, options) => {
    return config
  },
}

module.exports = withPlugins([], nextConfig)