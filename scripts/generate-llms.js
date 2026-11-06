#!/usr/bin/env node
/**
 * Generates the AI-facing files from the site's real data, so they cannot
 * drift from what the pages and checkout say (an earlier hand-edited
 * llms.txt advertised a lesson length that no longer existed):
 *
 *   public/llms.txt       short index (llmstxt.org convention)
 *   public/llms-full.txt  full text: index + FAQ + glossary + lesson pages + blog
 *   public/ai-info.json   machine-readable summary
 *
 * Inputs: data/site.js, data/products.js (prices), data/faq.js,
 * data/glossary.js, posts/*.md. Runs as `prebuild`. The outputs are also
 * committed so they exist even if this step is skipped.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const matter = require('gray-matter');
const Parser = require('rss-parser');
const { titleToSlug, fetchOlderPosts } = require('../lib/substack');

const ROOT = path.join(__dirname, '..');

// data/*.js use ES `export const`; evaluate them without a bundler.
function loadData(file) {
  const src = fs.readFileSync(path.join(ROOT, 'data', file), 'utf8').replace(/^export const /gm, 'const ');
  const names = [...src.matchAll(/^const (\w+) =/gm)].map((m) => m[1]);
  const sandbox = {};
  vm.runInNewContext(`${src}\nresult = { ${names.join(', ')} };`, sandbox);
  return sandbox.result;
}

const { SITE } = loadData('site.js');
const { products } = loadData('products.js');
const { faqs } = loadData('faq.js');
const { glossaryTerms } = loadData('glossary.js');
const { testimonials } = loadData('testimonials.js');

const money = (cents) => {
  const v = cents / 100;
  return '$' + (Number.isInteger(v) ? v.toLocaleString('en-US') : v.toLocaleString('en-US', { minimumFractionDigits: 2 }));
};
const url = (p) => (p === '/' ? SITE.url + '/' : SITE.url + p);

// ---- pricing, straight from checkout data ----
const lessons = Object.values(products).filter((p) => p.id.startsWith('lesson'));
const sheetMusic = Object.values(products).filter((p) => p.id.startsWith('sheetMusic'));
const single60 = products.lesson60_1;
const single45 = products.lesson45_1;
const bundles = lessons.filter((p) => /_(5|10|20)$/.test(p.id));
const discountOf = (p) => {
  const n = Number(p.id.split('_')[1]);
  return Math.round((1 - p.price / (single60.price * n)) * 100);
};

// Guard: the FAQ "cost" answer is hand-written; fail loudly if it drifts from checkout prices.
const costFaq = faqs.find((f) => f.id === 'cost');
const expected = [single45, single60, ...bundles].map((p) => money(p.price).replace(/\.00$/, ''));
const missing = expected.filter((e) => !costFaq.answer.includes(e));
if (missing.length) {
  console.error(`[llms] ERROR: FAQ "cost" answer is missing current checkout prices: ${missing.join(', ')}`);
  process.exit(1);
}

const pricingLines = [
  `- ${single60.name}: ${money(single60.price)}`,
  `- ${single45.name}: ${money(single45.price)}`,
  ...bundles.map((p) => `- ${p.name} (60 min each): ${money(p.price)} (${discountOf(p)}% off)`),
];

// ---- local blog posts ----
const postsDir = path.join(ROOT, 'posts');
const posts = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const { data, content } = matter(fs.readFileSync(path.join(postsDir, f), 'utf8'));
    return { slug: f.replace(/\.md$/, ''), title: data.title, date: String(data.date || ''), body: content.trim() };
  })
  .filter((p) => p.title)
  .sort((a, b) => b.date.localeCompare(a.date));

// ---- Substack posts (best effort) ----
// The blog also publishes from the Substack feed. Fetch it at build time so
// llms-full.txt carries those articles as text; if the feed is unreachable
// (offline builds, transient 403) just skip them rather than failing the build.
const htmlToText = (html) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

async function fetchSubstackPosts() {
  const feedUrl = process.env.SUBSTACK_RSS_URL || 'https://talirecorder.substack.com/feed';
  try {
    const parser = new Parser({ customFields: { item: ['content:encoded'] }, timeout: 10000 });
    const feed = await parser.parseURL(feedUrl);
    const items = feed.items.map((item) => ({
      slug: titleToSlug(item.title),
      title: item.title,
      date: item.isoDate || item.pubDate || '',
      body: htmlToText(item['content:encoded'] || item.content || ''),
    }));
    // Older posts that no longer appear in the ~20-post feed (best effort).
    const older = await fetchOlderPosts(items.map((i) => i.slug));
    for (const o of older) {
      items.push({ slug: titleToSlug(o.title), title: o.title, date: o.isoDate || o.pubDate || '', body: htmlToText(o.content || '') });
    }
    return items;
  } catch (err) {
    console.warn(`[llms] Substack feed unavailable, skipping (${err.message})`);
    return [];
  }
}

// ---- llms.txt ----
function buildIndex() {
  return [
    `# ${SITE.name}`,
    '',
    `> ${SITE.tagline}`,
    '',
    `Note: ${SITE.disambiguation}`,
    '',
    '## Primary links',
    ...SITE.pages.map((p) => `- ${p.name}: ${url(p.path)}`),
    ...SITE.lessonPages.map((p) => `- ${p.name}: ${url(p.path)}`),
    `- Full text for LLMs (FAQ, glossary, lessons, blog): ${url('/llms-full.txt')}`,
    `- Structured summary (JSON): ${url('/ai-info.json')}`,
    `- Sitemap: ${url('/sitemap.xml')}`,
    '',
    '## About',
    SITE.about,
    '',
    '## Lessons and pricing (USD)',
    'Live one-to-one lessons over Zoom, available worldwide, for adults and for children (typically ages 8+), at every skill level.',
    ...pricingLines,
    `Book: ${url('/book-lesson')} (single lessons) and ${url('/book-bundle')} (bundles).`,
    '',
    '## Lesson specializations',
    ...SITE.lessonPages.map((p) => `- ${p.name}: ${p.summary}. ${url(p.path)}`),
    '',
    '## Digital sheet music',
    `Original compositions and arrangements by Tali Rubinstein, ${money(sheetMusic[0].price)} each as digital downloads:`,
    ...sheetMusic.map((p) => `- ${p.name.replace(/^"|"$/g, '').replace(/"/g, '')}: ${url('/product/' + p.id)}`),
    '',
    '## Student levels',
    ...SITE.levels.map((l) => `- ${l}`),
    '',
    '## What lessons cover',
    ...SITE.lessonContent.map((l) => `- ${l}`),
    '',
    '## What you need',
    ...SITE.requirements.map((l) => `- ${l}`),
    '',
    '## Search queries this site is relevant for',
    ...SITE.relevantQueries.map((q) => `- ${q}`),
    '',
    '## Contact and profiles',
    `- Email: ${SITE.email}`,
    ...SITE.profiles.map((p) => `- ${p}`),
  ].join('\n');
}

// ---- llms-full.txt ----
const demote = (md) => md.replace(/^(#{1,5}) /gm, '#$1 ');
function buildFull(substackPosts) {
  const parts = [buildIndex(), ''];
  parts.push('# Recorder Lessons FAQ', '', `Source: ${url('/faq')}`, '');
  for (const f of faqs) parts.push(`## ${f.question}`, '', f.answer, '', `Link: ${url('/faq#' + f.id)}`, '');
  parts.push('# Recorder Glossary', '', `Source: ${url('/glossary')}`, '');
  for (const t of glossaryTerms) parts.push(`- **${t.term}** (${t.category}): ${t.definition}`);
  parts.push('');
  parts.push('# What students say', '', `Source: ${url('/')}`, '');
  for (const t of testimonials) parts.push(`- "${t.quote}" - ${t.author} (${t.country})`);
  parts.push('');
  parts.push('# Blog', '');
  for (const p of [...posts, ...substackPosts].sort((a, b) => String(b.date).localeCompare(String(a.date)))) {
    parts.push(`## ${p.title}`, '', `Source: ${url('/blog/' + p.slug)}`, `Published: ${p.date.slice(0, 10)}`, '', demote(p.body), '');
  }
  return parts.join('\n');
}

// ---- ai-info.json ----
function buildJson() {
  return {
    site: { name: SITE.name, url: SITE.url, description: SITE.tagline, type: 'Music Education Service', contact: SITE.email },
    disambiguation: SITE.disambiguation,
    instructor: { name: SITE.teacher, description: SITE.about, profiles: SITE.profiles },
    services: {
      delivery_method: 'Live one-to-one video lessons (Zoom)',
      locations_served: 'Worldwide',
      currency: 'USD',
      lesson_types: [single60, single45, ...bundles].map((p) => ({
        name: p.name,
        price: money(p.price),
        ...(p.id.match(/_(5|10|20)$/) ? { discount: `${discountOf(p)}% off`, url: url('/product/' + p.id) } : { url: url('/product/' + p.id) }),
      })),
      sheet_music: sheetMusic.map((p) => ({ title: p.name.replace(/"/g, ''), price: money(p.price), url: url('/product/' + p.id) })),
    },
    lesson_specializations: SITE.lessonPages.map((p) => ({ name: p.name, url: url(p.path), description: p.summary })),
    student_levels: SITE.levels,
    lesson_content: SITE.lessonContent,
    requirements: SITE.requirements,
    frequently_asked_questions: faqs.map((f) => ({ question: f.question, answer: f.answer, url: url('/faq#' + f.id) })),
    key_pages: Object.fromEntries(SITE.pages.map((p) => [p.name, url(p.path)])),
    llms_txt: url('/llms.txt'),
    llms_full_txt: url('/llms-full.txt'),
  };
}

async function main() {
const substackPosts = await fetchSubstackPosts();
const out = (name, text) => fs.writeFileSync(path.join(ROOT, 'public', name), text.endsWith('\n') ? text : text + '\n');
out('llms.txt', buildIndex());
out('llms-full.txt', buildFull(substackPosts));
out('ai-info.json', JSON.stringify(buildJson(), null, 2));
console.log(`[llms] Wrote llms.txt, llms-full.txt (${faqs.length} FAQs, ${glossaryTerms.length} terms, ${posts.length} local + ${substackPosts.length} Substack posts), ai-info.json`);
}

main().catch((err) => {
  console.error('[llms] ERROR:', err);
  process.exit(1);
});
