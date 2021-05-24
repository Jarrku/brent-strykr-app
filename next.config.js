const withPlugins = require('next-compose-plugins');
// const withPreact = require('next-plugin-preact');
// const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// TODO: fetch navLinks from sanity, setup rewrites for baseUrl -> url.

const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination: process.env.NODE_ENV === 'development' ? 'http://localhost:3333/studio/:path*' : '/studio/index.html',
};

const nextConfig = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  experimental: { optimizeCss: process.env.NODE_ENV === 'production', modern: true, polyfillsOptimization: true },
  images: {
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
  // webpack(config, { dev, isServer }) {
  //   const splitChunks = config.optimization && config.optimization.splitChunks;
  //   if (splitChunks && isServer && splitChunks.cacheGroups) {
  //     const cacheGroups = splitChunks.cacheGroups;
  //     const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;

  //     if (cacheGroups.framework) {
  //       cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
  //         test: preactModules,
  //       });
  //       cacheGroups.commons.name = 'framework';
  //     } else {
  //       cacheGroups.preact = {
  //         name: 'commons',
  //         chunks: 'all',
  //         test: preactModules,
  //       };
  //     }
  //   }

  //   // Install webpack aliases:
  //   const aliases = config.resolve.alias || (config.resolve.alias = {});
  //   aliases.react = aliases['react-dom'] = 'preact/compat';
  //   aliases.preact = path.resolve(__dirname, 'node_modules', 'preact');

  //   // inject Preact DevTools
  //   if (dev && !isServer) {
  //     const entry = config.entry;
  //     config.entry = () =>
  //       entry().then((entries) => {
  //         entries['main.js'] = ['preact/debug'].concat(entries['main.js'] || []);
  //         return entries;
  //       });
  //   }

  //   return config;
  // },
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    // [withPreact]
  ],
  nextConfig,
);
