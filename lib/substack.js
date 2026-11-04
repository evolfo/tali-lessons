// Older Substack posts. The RSS feed only carries the ~20 newest posts, so
// anything older used to vanish from the site on the next deploy. Substack's
// public archive endpoints list every free post; we use them to add the posts
// the feed no longer includes. Everything here is best effort: on any failure
// we return what we have and the site falls back to feed-only behaviour.
//
// CommonJS so both Next pages and the prebuild script (scripts/generate-llms.js)
// can require it.

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const MAX_ARCHIVE_POSTS = 300;

function titleToSlug(title) {
  return (
    'substack-' +
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  );
}

function substackOrigin() {
  const feed = process.env.SUBSTACK_RSS_URL || 'https://talirecorder.substack.com/feed';
  try {
    return new URL(feed).origin;
  } catch (e) {
    return 'https://talirecorder.substack.com';
  }
}

async function getJson(url, retries = 2) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      if (i < retries) await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw lastErr;
}

let indexCache = { at: 0, entries: null };

// Every free post Substack lists: [{ slug, apiSlug, title, date, image, link }]
async function fetchArchiveIndex() {
  if (indexCache.entries && Date.now() - indexCache.at < 5 * 60 * 1000) return indexCache.entries;
  const origin = substackOrigin();
  const entries = [];
  try {
    for (let offset = 0; offset < MAX_ARCHIVE_POSTS; offset += 25) {
      const page = await getJson(`${origin}/api/v1/archive?sort=new&search=&offset=${offset}&limit=25`);
      if (!Array.isArray(page) || page.length === 0) break;
      for (const p of page) {
        if (!p || !p.title || !p.slug) continue;
        if (p.audience && p.audience !== 'everyone') continue; // never republish paywalled posts
        entries.push({
          slug: titleToSlug(p.title),
          apiSlug: p.slug,
          title: p.title,
          date: p.post_date || '',
          image: p.cover_image || null,
          link: p.canonical_url || `${origin}/p/${p.slug}`,
        });
      }
      if (page.length < 25) break;
    }
    indexCache = { at: Date.now(), entries };
  } catch (err) {
    console.warn('[substack] archive index unavailable, using RSS only:', err.message);
    return indexCache.entries || [];
  }
  return entries;
}

const bodyCache = new Map();

// Fetch one post's HTML and return it in the same shape the RSS parser gives
// ({ title, link, pubDate, isoDate, content, enclosureUrl }), or null.
async function fetchArchiveItem(entry) {
  if (bodyCache.has(entry.slug)) return bodyCache.get(entry.slug);
  try {
    const post = await getJson(`${substackOrigin()}/api/v1/posts/${encodeURIComponent(entry.apiSlug)}`);
    if (!post || !post.body_html || (post.audience && post.audience !== 'everyone')) return null;
    const item = {
      title: entry.title,
      link: entry.link,
      pubDate: entry.date,
      isoDate: entry.date,
      content: post.body_html,
      enclosureUrl: post.cover_image || entry.image,
    };
    bodyCache.set(entry.slug, item);
    return item;
  } catch (err) {
    console.warn(`[substack] could not fetch archive post "${entry.title}":`, err.message);
    return null;
  }
}

// Posts that exist on Substack but are missing from `knownSlugs` (the RSS set).
async function fetchOlderPosts(knownSlugs) {
  const known = new Set(knownSlugs);
  const seen = new Set();
  const missing = (await fetchArchiveIndex()).filter((e) => {
    if (known.has(e.slug) || seen.has(e.slug)) return false;
    seen.add(e.slug);
    return true;
  });
  const items = [];
  for (let i = 0; i < missing.length; i += 4) {
    const batch = await Promise.all(missing.slice(i, i + 4).map(fetchArchiveItem));
    items.push(...batch.filter(Boolean));
  }
  return items;
}

async function findOlderPost(slug) {
  const entry = (await fetchArchiveIndex()).find((e) => e.slug === slug);
  return entry ? fetchArchiveItem(entry) : null;
}

module.exports = { titleToSlug, fetchArchiveIndex, fetchOlderPosts, findOlderPost };
