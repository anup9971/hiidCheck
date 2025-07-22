/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.hotelindelhi.in', 
  generateRobotsTxt: true,
  sitemapSize: 10000, // ✅ Increase this so only 1 sitemap is made
  changefreq: 'daily',
  priority: 0.7,
  exclude: [],
};