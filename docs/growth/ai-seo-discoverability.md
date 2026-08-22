# AI & Search Discoverability — Off-Site Growth Plan

## Competitive landscape (live search research, Aug 2026)

Ran the actual target queries — "online recorder lessons," "best online recorder teacher,"
"learn recorder online beginner" — to see who's really occupying the results this site needs to
win. Findings:

- **This site already ranks.** The homepage and `/lessons/beginner-recorder-lessons` both
  surface directly for "online recorder lessons," and the homepage shows for "best online
  recorder teacher." This isn't a cold start — it's an incumbent-vs-incumbent fight, not
  "how do we get indexed."
- **American Recorder Society (`americanrecorder.org`) dominates every query.** It's a
  50+ year old nonprofit's `.org` domain with a real teacher directory, free classes, and an
  FAQ — it will not be out-ranked head-on by any single teacher's site. The correct move
  (below) is to get *listed inside* their directory, not to compete against it in the SERP.
- **The direct competitors are individual teacher-brand sites, not big platforms** — chiefly
  **Anne Timberlake** (`annetimberlake.com`), whose positioning is nearly identical to Tali's
  (professional performer + educator, personal-brand site, Zoom lessons, a blog). Her pricing
  is materially lower: **$30 / $40 / $50 / $62 for 30 / 45 / 60 / 75 minutes**, vs. this site's
  **$95 / $105 for 45 / 60 minutes** (no 30-minute option). That's not a bug to fix — Tali's
  "world-renowned, first recorder player at Berklee" positioning can justify a premium price —
  but it's worth knowing the site is priced ~2-3x the closest comparable competitor, and the
  copy/credentials need to keep earning that gap on every page, not just `/about`.
- **Marketplaces are in the mix but not dominant**: Lessonface, Superprof, TakeLessons,
  Preply (33 recorder tutors from $11/hr), Outschool (kids). These matter for capturing
  marketplace-native search intent, not for outranking anyone.
- **This site already has one real earned mention**: CMUSE's "15 Websites To Learn Recorder
  Lessons Online" (`cmuse.org/learn-recorder-lessons-online`) — see the confirmed/pending list
  below for what's still worth checking.

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
> repertoire and contemporary recorder playing (jazz, pop, R&B). Lessons are 45 or 60 minutes
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
- Teacher directory: https://americanrecorder.org/find_recorder_teachers.php — the directory
  supports filtering by "Offers Online recorder Instruction," confirmed live in this research
  pass. Listing appears to require ARS membership (see
  https://americanrecorder.org/benefits_of_membership.php) — worth the cost for this niche.
- General resources page (separate from the directory, may accept non-member links too):
  https://americanrecorder.org/on-line_resources.php
- Once a member, their print/digital magazine (*American Recorder*) is also open to teacher
  profiles or guest articles — a strong, topically-relevant backlink beyond the directory entry.

### 2. LearnRecorder.com — recorder-specific teacher profile directory
Confirmed in this research pass: LearnRecorder.com (`learnrecorder.com`) hosts individual,
per-teacher profile pages, e.g.
`learnrecorder.com/recorder-teacher-stlouis-mo-anne-timberlake/` for Anne Timberlake. This is
a low-effort, highly relevant listing — find their submission/contact path and request a
profile page linking to `https://www.talirecorderlessons.com`.

### 3. Confirm and reinforce existing organic mentions
- **CMUSE** — confirmed real: Tali has an existing blog post (`/blog/cmuse`) thanking CMUSE for
  including her in "15 Websites To Learn Recorder Lessons Online"
  (`cmuse.org/learn-recorder-lessons-online`), and that CMUSE page still surfaces in live
  search results in 2026, so it looks maintained. Still worth a human click-through to confirm
  the outbound link target is current (this session's web access couldn't reach the domain
  directly to verify).
- **Singersroom** — `singersroom.com/best-online-recorder-lessons/` is a live "10 Best Online
  Recorder Lessons" roundup that surfaced in this research (this session couldn't fetch the
  page directly to check its contents). Worth a human check: if Tali isn't listed, this is a
  direct, on-topic outreach target; if she is, nothing to do.

### 4. Preply and r/recorder — lower-effort, still worth doing
- **Preply** (`preply.com`) — a general tutoring marketplace with ~33 recorder tutors starting
  at $11/hr; listing here captures marketplace-native search traffic even at a premium price
  point.
- **r/recorder** (Reddit) — a real, small community for this exact instrument. Genuine
  participation (answering real beginner questions, linking to a tutorial only when it's
  actually the best answer) is both a trust-building move and, over time, an indexable/citable
  mention on a high-authority domain.

### 5. Google Business Profile
Even as an online-only, worldwide service, a Google Business Profile (service-area business,
no public address) is one of the highest-leverage listings for local + AI Overview visibility,
and it's the main place to accumulate real, verifiable reviews.
- Create at business.google.com, category "Music School" or "Music Instructor"
- Once 3-5 real student reviews exist, the `AggregateRating`/`Review` schema types can be added
  to `components/StructuredData.js` — **do not add rating/review-count structured data before
  real reviews exist.** Fabricated ratings are a policy violation and actively hurt trust
  signals once discovered.

### 6. Other music-lesson marketplaces and directories
- **Lessonface** (lessonface.com) — already surfaces in "recorder lessons online" searches;
  listing a profile there (even alongside 1:1 site bookings) captures search traffic that
  currently goes to competitor teachers on that platform.
- **TakeLessons / Superprof / Thumbtack** — general instrument-lesson marketplaces; lower
  priority than ARS/Lessonface but easy to set up in parallel.

### 7. Music-education organizations and communities
- **NAfME** (National Association for Music Education) — recorder is a staple of elementary
  general-music curricula; a guest post or resource link aimed at classroom teachers is a
  strong, topically relevant backlink.
- **Homeschool music curriculum blogs/forums** — recorder is one of the most commonly taught
  homeschool instruments; this audience converts well for beginner/kids lessons and these sites
  link generously to teacher resources.
- Recorder-specific Facebook groups and forums (early music / historical performance
  communities) — answer real questions, link only when genuinely the best answer.

### 8. Turn video into text (biggest content-volume lever)
The YouTube channel (`@talirecorder`) and tutorials page already have real teaching video
content that AI crawlers mostly can't process — they index text, not audio/video. Publishing
transcripts (even lightly cleaned up) of tutorial videos as blog posts or a `/tutorials`
sub-page turns existing effort into indexable, citable text, and multiplies the long-tail
queries the site can match. This is the single highest-leverage content task once directory
listings are submitted.

### 9. Freshness signals
`BlogPostSchema` currently sets `dateModified` equal to `datePublished` for every post — that's
honest (no fabricated edit history) but also doesn't help AI systems judge recency. If/when
posts get real updates, add an `updated` field to the post frontmatter and thread it into
`dateModified` in `pages/blog/[slug].js` and `components/StructuredData.js`.

## Tracking

| Action | Status | Notes |
|---|---|---|
| ARS teacher directory | Not started | Highest priority — americanrecorder.org/find_recorder_teachers.php, requires membership |
| LearnRecorder.com profile | Not started | Confirmed real per-teacher profile pages exist; low-effort |
| Verify CMUSE mention | Not started | Blog post + live search suggest it's still there; confirm link target |
| Check Singersroom roundup | Not started | singersroom.com/best-online-recorder-lessons/ — confirm if Tali is listed |
| Google Business Profile | Not started | Also unlocks real review schema later |
| Preply profile | Not started | Marketplace-native search intent |
| Lessonface profile | Not started | |
| TakeLessons / Superprof | Not started | Lower priority |
| r/recorder participation | Not started | Genuine Q&A engagement, not link-dropping |
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
