#!/usr/bin/env node
/**
 * Pings the IndexNow API (https://www.indexnow.org/) with every URL in the
 * freshly-generated sitemap after each production build/deploy. Bing,
 * Yandex, and other IndexNow-participating search engines then re-crawl
 * those URLs immediately instead of waiting for their next scheduled
 * crawl - Bing's index in particular feeds Bing Chat/Copilot, so this is
 * a direct, no-account-needed lever for faster AI-answer-engine pickup.
 *
 * No third-party account or API key signup required: IndexNow only asks
 * that a random key be hosted as a static file at the site root (see
 * public/<key>.txt) to prove ownership of the domain.
 *
 * Runs as part of `postbuild` (after next-sitemap has written
 * public/sitemap.xml). Never fails the build - a network hiccup here
 * should not block a deploy.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const INDEXNOW_KEY = '854e766b75e2b0f0efe4429779591e87';
const HOST = 'www.talirecorderlessons.com';
const SITE_URL = `https://${HOST}`;
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Only submit on real production builds. Netlify sets CONTEXT to
// 'production' for the primary branch; deploy previews/branch deploys
// build against the same production URLs in the sitemap, so pinging for
// those would tell IndexNow content is live before it actually is.
const isProductionBuild = process.env.CONTEXT
  ? process.env.CONTEXT === 'production'
  : true; // allow manual/local runs (e.g. `node scripts/submit-indexnow.js`)

function extractUrls(sitemapXml) {
  const matches = sitemapXml.match(/<loc>(.*?)<\/loc>/g) || [];
  return matches.map((tag) => tag.replace(/<\/?loc>/g, '').trim());
}

function submit(urlList) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    });

    const req = https.request(
      {
        hostname: 'api.indexnow.org',
        path: '/indexnow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(body),
        },
        timeout: 10000,
      },
      (res) => {
        // IndexNow returns 200/202 on success.
        res.resume();
        resolve(res.statusCode);
      }
    );

    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('IndexNow request timed out')));
    req.write(body);
    req.end();
  });
}

async function main() {
  if (!isProductionBuild) {
    console.log('[indexnow] Skipping - not a production build (CONTEXT=' + process.env.CONTEXT + ')');
    return;
  }

  if (!fs.existsSync(SITEMAP_PATH)) {
    console.log('[indexnow] Skipping - no sitemap.xml found at ' + SITEMAP_PATH);
    return;
  }

  const sitemapXml = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const urls = extractUrls(sitemapXml);

  if (urls.length === 0) {
    console.log('[indexnow] Skipping - no URLs found in sitemap.xml');
    return;
  }

  try {
    const statusCode = await submit(urls);
    console.log(`[indexnow] Submitted ${urls.length} URLs, status ${statusCode}`);
  } catch (err) {
    // Never fail the build over this.
    console.warn('[indexnow] Submission failed (non-fatal):', err.message);
  }
}

main();
