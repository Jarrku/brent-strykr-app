const withPlugins = require('next-compose-plugins');

const withPrefresh = require('@prefresh/next');
const preact = require('preact');
const withPreact = require('next-plugin-preact');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
  },
  async redirects() {
    return [];
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = { fs: 'empty' };
    }

    return config;
  },
};

module.exports = withPlugins([[withPreact, { experimental: { modern: true } }]], nextConfig);
