// Daily check (see vercel.json). Substack posts show up on the site immediately
// through ISR, but the sitemap, llms-full.txt and IndexNow pings are generated at
// build time. If Substack has a post the deployed sitemap does not list, trigger a
// rebuild through a Vercel Deploy Hook. Nothing happens when nothing is new, so
// there is no daily rebuild and no daily IndexNow resubmission.
//
// Env: CRON_SECRET (Vercel sends it as a Bearer token on cron calls) and
// VERCEL_DEPLOY_HOOK_URL (Project Settings > Git > Deploy Hooks).
import Parser from 'rss-parser'
import { titleToSlug, fetchArchiveIndex } from '../../../lib/substack'

const SITE = process.env.SITE_URL || 'https://www.talirecorderlessons.com'

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET
  // Fail closed: without a configured secret nobody can trigger this.
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  try {
    const parser = new Parser({ timeout: 10000 })
    const feed = await parser.parseURL(process.env.SUBSTACK_RSS_URL || 'https://talirecorder.substack.com/feed')
    const archive = await fetchArchiveIndex()
    const slugs = [...new Set([...feed.items.map((i) => titleToSlug(i.title)), ...archive.map((e) => e.slug)])]

    const sitemapRes = await fetch(`${SITE}/sitemap.xml`, { headers: { 'User-Agent': 'tali-lessons-cron' } })
    if (!sitemapRes.ok) throw new Error(`sitemap fetch failed: ${sitemapRes.status}`)
    const sitemap = await sitemapRes.text()

    const missing = slugs.filter((slug) => !sitemap.includes(`/blog/${slug}<`))
    if (missing.length === 0) {
      return res.status(200).json({ changed: false, checked: slugs.length })
    }

    const hook = process.env.VERCEL_DEPLOY_HOOK_URL
    if (!hook) {
      console.warn('[cron] new Substack posts not in sitemap, but VERCEL_DEPLOY_HOOK_URL is not set:', missing)
      return res.status(200).json({ changed: true, triggered: false, missing: missing.length, reason: 'no deploy hook configured' })
    }

    const hookRes = await fetch(hook, { method: 'POST' })
    if (!hookRes.ok) throw new Error(`deploy hook failed: ${hookRes.status}`)
    console.log('[cron] triggered rebuild for new Substack posts:', missing)
    return res.status(200).json({ changed: true, triggered: true, missing: missing.length })
  } catch (err) {
    console.error('[cron] refresh-site failed:', err.message)
    return res.status(500).json({ error: 'refresh failed' })
  }
}
