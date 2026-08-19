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
      // Explicit allow rules for AI crawlers/answer engines, so LLM-based
      // search (ChatGPT, Claude, Perplexity, Google AI Overviews, etc.)
      // can fetch and cite this site. `*` already allows everything below,
      // but naming these explicitly avoids any bot defaulting to caution
      // when it can't find itself listed.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'GoogleOther', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
    ],
  },
  // Generate sitemap during build
  generateIndexSitemap: false,
}
