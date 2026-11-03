const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Real publish dates for local blog posts, keyed by URL path. Everything else
// gets no <lastmod>: stamping every URL with the build time on each deploy
// claims "everything changed today" and teaches crawlers to ignore the field.
const postDates = {};
const postsDir = path.join(__dirname, 'posts');
for (const file of fs.readdirSync(postsDir)) {
  if (!file.endsWith('.md')) continue;
  const { data } = matter(fs.readFileSync(path.join(postsDir, file), 'utf8'));
  if (data.date) postDates['/blog/' + file.replace(/\.md$/, '')] = new Date(data.date).toISOString();
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.talirecorderlessons.com',
  generateRobotsTxt: true,
  autoLastmod: false,
  changefreq: undefined,
  priority: undefined,
  transform: async (config, loc) => ({
    loc,
    lastmod: postDates[loc],
  }),
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
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
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
