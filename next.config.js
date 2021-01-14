const withPlugins = require('next-compose-plugins');

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

module.exports = withPlugins([], nextConfig);
