require('dotenv-flow').config();

//TODO change back to
//   siteUrl: `https://styrkr.be`,
module.exports = {
  siteUrl: `https://styrkr-staging.vercel.app`,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: [],
};
