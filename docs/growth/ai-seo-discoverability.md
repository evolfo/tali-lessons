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

## On-site work shipped since this doc was written

Everything below is off-site (needs a human with an account/login). But there was more real
on-site leverage available, and it's now done:

- **Entity linking.** Every JSON-LD block on the site (Person, Organization, Service, Course,
  Product, BlogPosting, VideoObject) now shares a consistent `@id` for "Tali Rubinstein" and
  "Tali Recorder Lessons," instead of each page redefining a disconnected blob. This is what
  lets Google/LLMs resolve every mention across the site as *the same entity*.
- **Verified `sameAs` links.** Found via live search research: Tali Rubinstein has an existing
  **Wikipedia article** (`en.wikipedia.org/wiki/Tali_Rubinstein`) and **Wikidata entry**
  (`wikidata.org/wiki/Q105627819`) — confirmed as the same person via matching bio facts
  (Berklee, Latin Grammy album, Obama's 2018 list). Wikipedia/Wikidata are the two strongest
  possible entity signals for both Google's Knowledge Graph and LLM training/retrieval data,
  and neither was linked anywhere on the site before. Added those plus LinkedIn, Facebook,
  X/Twitter, and her personal site (`talirubinstein.com`, already referenced in body text but
  never in structured data) to the Person schema's `sameAs`.
- **Course schema** added to the four lesson-specialization pages (beginner/kids/baroque/
  advanced), on top of the existing commercial `Service` schema. `Course` is what Google's
  "Learning Content" rich results and AI answer engines actually look for when someone asks
  "where can I learn X," as distinct from "where can I buy X."
- **IndexNow** wired into the build (`scripts/submit-indexnow.js`, runs in `postbuild`). Every
  production deploy now pings Bing/Yandex (and anyone else on IndexNow) with the full URL list
  immediately, instead of waiting for their next scheduled crawl. No account signup needed —
  IndexNow only requires hosting a key file, which is already in `public/`. This matters
  because Bing's index feeds Copilot/Bing Chat directly.

## Priority off-site actions

### 1. American Recorder Society (ARS) — deprioritized, paid membership required
The ARS teacher directory (`americanrecorder.org/find_recorder_teachers.php`) is still the
top-authority hub in this niche, but listing in it requires paid ARS membership, which you've
said isn't worth it right now — dropping this from the priority list.

One thing worth being explicit about: getting backend/CMS/FTP access to `americanrecorder.org`
to add a listing without membership isn't something I can do or would do. It's a third
party's system I have no legitimate access to — that would be unauthorized access to someone
else's website, not a growth tactic. The only real paths in are (a) pay for membership, or
(b) email whoever maintains the separate, non-directory "Online Resources" page
(`americanrecorder.org/on-line_resources.php`) and ask if they'll add a free link there — that
page doesn't obviously require membership, but confirming that needs a human to actually email
them, which is outside what I can do from here.

### 2. LearnRecorder.com — contact info not publicly findable from here
Tried to find a contact email/submission form for LearnRecorder.com (`learnrecorder.com`) via
search - couldn't find one. Their teacher-directory page
(`learnrecorder.com/recorder-teachers/`) lists existing profiles like Anne Timberlake's, but no
public contact path surfaced in search results, and this session's web access is restricted to
search snippets - it can't browse the site directly to check a footer/Contact page or try a
WHOIS domain-contact lookup, both of which are the next real steps. If you (or anyone with
normal browser access) can open `learnrecorder.com` directly, check for a "Contact," "Add Your
Listing," or "About" link, or a WHOIS lookup on the domain — any of those would likely surface
it in under a minute in a way this session can't.

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
| Entity `@id` linking across all schema | Done | Shipped in code |
| Wikipedia/Wikidata/LinkedIn/etc. `sameAs` | Done | Shipped in code |
| Course schema on lesson pages | Done | Shipped in code |
| IndexNow (Bing/Yandex instant ping) | Done | Shipped in code, active on next production deploy |
| ARS teacher directory | Deprioritized | Requires paid membership — skipped per owner decision |
| ARS resources page (non-directory) | Not started | May not require membership — worth a quick email to confirm |
| LearnRecorder.com profile | Blocked | Contact info not found via search; needs direct site visit or WHOIS |
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
