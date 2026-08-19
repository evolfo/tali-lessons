# AI & Search Discoverability — Off-Site Growth Plan

## Where this site already stands

On-site AI-readiness is strong: `llms.txt`, `ai-info.json`, `.well-known/ai-plugin.json`,
per-page `schema.org` JSON-LD (Person, EducationalOrganization, Service, FAQPage, Breadcrumb,
Product, BlogPosting), a robots.txt that explicitly allows GPTBot/ClaudeBot/PerplexityBot/
Google-Extended/CCBot and the rest, and a next-sitemap-generated sitemap.

**That's necessary but not sufficient.** LLM answer engines (ChatGPT, Claude, Perplexity,
Google AI Overviews) and Google's classic ranking both weight *off-site* signals heavily —
who links to this site, who mentions Tali Rubinstein by name, and how many independent sources
corroborate the same facts (pricing, credentials, reviews). A perfectly-marked-up page that
nothing else on the web references or backs up won't out-rank or get cited over competitors
with real citations elsewhere. This doc is the off-site half of the SEO/GEO work — it can't be
automated from this repo, so it's written as ready-to-execute copy + a submission checklist.

## Standard listing copy (reuse everywhere)

**Tagline**
> Online recorder lessons with world-renowned musician and Berklee College of Music graduate
> Tali Rubinstein.

**Short description (~200 chars)**
> Tali Rubinstein teaches online recorder lessons for all ages and skill levels, from complete
> beginners to advanced/pre-professional players, via live video worldwide.

**Long description**
> Tali Rubinstein is a professional recorder player, composer, and music educator — the first
> recorder player ever admitted to Berklee College of Music (full scholarship). She teaches
> online recorder lessons worldwide for students of every level, specializing in both Baroque
> repertoire and contemporary recorder playing (jazz, pop, R&B). Lessons are 30/45/60 minutes
> via Zoom, with discounted multi-lesson packages and original digital sheet music available.

**Category tags:** Music Lessons, Online Music Education, Recorder Instruction, Woodwind
Instruction, Private Music Tutoring

**Website:** https://www.talirecorderlessons.com
**Booking:** https://www.talirecorderlessons.com/book-lesson

## Priority off-site actions

### 1. American Recorder Society (ARS) — highest priority, recorder-specific
The ARS (`americanrecorder.org`) is the top authority hub in this exact niche — its own
"Online Resources" and "Free Online Recorder Lessons" pages are exactly the kind of page an AI
answer engine pulls from when asked "where can I learn recorder online." Getting listed here is
worth more than a dozen generic directory listings.
- Online resources page: https://americanrecorder.org/on-line_resources.php — find their
  submission/contact process (usually a webmaster or chapter contact) and request inclusion.
- Consider ARS membership — it also opens up their print/digital magazine (*American Recorder*)
  for teacher profiles or guest articles, which is a strong, topically-relevant backlink.

### 2. Confirm and reinforce existing organic mentions
Tali already appears to be referenced in at least one third-party "learn recorder online"
roundup (CMUSE, `cmuse.org/learn-recorder-lessons-online`) found during this review — worth a
human check (this session's web access couldn't reach the domain to confirm the link is live
and pointing at the current URL). If it's live: nothing to do. If it's stale, outdated, or
missing: reach out to request an update to `https://www.talirecorderlessons.com`.

### 3. Google Business Profile
Even as an online-only, worldwide service, a Google Business Profile (service-area business,
no public address) is one of the highest-leverage listings for local + AI Overview visibility,
and it's the main place to accumulate real, verifiable reviews.
- Create at business.google.com, category "Music School" or "Music Instructor"
- Once 3-5 real student reviews exist, the `AggregateRating`/`Review` schema types can be added
  to `components/StructuredData.js` — **do not add rating/review-count structured data before
  real reviews exist.** Fabricated ratings are a policy violation and actively hurt trust
  signals once discovered.

### 4. Music-lesson marketplaces and directories
- **Lessonface** (lessonface.com) — already surfaces in "recorder lessons online" searches;
  listing a profile there (even alongside 1:1 site bookings) captures search traffic that
  currently goes to competitor teachers on that platform.
- **TakeLessons / Superprof / Thumbtack** — general instrument-lesson marketplaces; lower
  priority than ARS/Lessonface but easy to set up in parallel.

### 5. Music-education organizations and communities
- **NAfME** (National Association for Music Education) — recorder is a staple of elementary
  general-music curricula; a guest post or resource link aimed at classroom teachers is a
  strong, topically relevant backlink.
- **Homeschool music curriculum blogs/forums** — recorder is one of the most commonly taught
  homeschool instruments; this audience converts well for beginner/kids lessons and these sites
  link generously to teacher resources.
- Recorder-specific Facebook groups and forums (early music / historical performance
  communities) — answer real questions, link only when genuinely the best answer.

### 6. Turn video into text (biggest content-volume lever)
The YouTube channel (`@talirecorder`) and tutorials page already have real teaching video
content that AI crawlers mostly can't process — they index text, not audio/video. Publishing
transcripts (even lightly cleaned up) of tutorial videos as blog posts or a `/tutorials`
sub-page turns existing effort into indexable, citable text, and multiplies the long-tail
queries the site can match. This is the single highest-leverage content task once directory
listings are submitted.

### 7. Freshness signals
`BlogPostSchema` currently sets `dateModified` equal to `datePublished` for every post — that's
honest (no fabricated edit history) but also doesn't help AI systems judge recency. If/when
posts get real updates, add an `updated` field to the post frontmatter and thread it into
`dateModified` in `pages/blog/[slug].js` and `components/StructuredData.js`.

## Tracking

| Action | Status | Notes |
|---|---|---|
| ARS listing/outreach | Not started | Highest priority — recorder-specific authority site |
| Verify CMUSE mention | Not started | Confirm link target is current |
| Google Business Profile | Not started | Also unlocks real review schema later |
| Lessonface profile | Not started | |
| TakeLessons / Superprof | Not started | Lower priority |
| NAfME / homeschool outreach | Not started | |
| Video transcripts → text content | Not started | Biggest content-volume lever |

## What NOT to do

- Do not add `AggregateRating`/`Review` JSON-LD anywhere until real, attributable reviews exist
  (Google Business Profile, a marketplace, etc.). This mirrors a fix already made in a sibling
  project (Harmony Ensemble) after a fabricated 47-review/5.0 rating was found and removed.
- Do not buy reviews, backlinks, or "guaranteed AI citation" services — low-quality/paid link
  schemes are a demotion risk on Google and don't move AI-citation share, which tracks genuine
  topical authority.
- Do not keyword-stuff `llms.txt`/`ai-info.json` with claims not reflected on the actual pages —
  answer engines increasingly cross-check the crawlable page content against these summary
  files, and a mismatch undermines trust in both.
