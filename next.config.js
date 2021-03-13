const withPlugins = require('next-compose-plugins');
const withPreact = require('next-plugin-preact');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination: process.env.NODE_ENV === 'development' ? 'http://localhost:3333/studio/:path*' : '/studio/index.html',
};

const nextConfig = {
  reactStrictMode: true,

  experimental: { optimizeCss: process.env.NODE_ENV === 'production' },
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 'images.ctfassets.net'],
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
  rewrites: () => [STUDIO_REWRITE],
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

module.exports = withPlugins([[withBundleAnalyzer], [withPreact]], nextConfig);
