const withPlugins = require('next-compose-plugins');
const withPreact = require('next-plugin-preact');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// TODO: fetch navLinks from sanity, setup rewrites for baseUrl -> url.

const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination: process.env.NODE_ENV === 'development' ? 'http://localhost:3333/studio/:path*' : '/studio/index.html',
};

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    // concurrentFeatures: true,
    // serverComponents: true,
    optimizeCss: process.env.NODE_ENV === 'production',
    modern: true,
    polyfillsOptimization: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['tailwindui.com', 'images.unsplash.com', 'images.ctfassets.net', 'cdn.sanity.io'],
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
};

module.exports = withPlugins([[withBundleAnalyzer], [withPreact]], nextConfig);
// module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
