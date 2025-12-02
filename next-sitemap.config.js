/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.talirecorderlessons.com',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/success', '/checkout'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/success', '/checkout'],
      },
    ],
  },
  // Generate sitemap during build
  generateIndexSitemap: false,
}
