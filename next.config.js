const withPlugins = require('next-compose-plugins');

// const withPrefresh = require('@prefresh/next');
// const preact = require('preact');
// const withPreact = require('next-plugin-preact');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
  },
  async headers() {
    return [
      {
        source: '/fonts/inter-var-latin.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [];
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = { fs: 'empty', module: 'empty' };
    }

    return config;
  },
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    // [withPreact, { experimental: { modern: true } }]
  ],
  nextConfig,
);
