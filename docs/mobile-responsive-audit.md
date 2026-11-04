# Mobile responsive + Lighthouse audit

Whole site: 19 routes (home, about, tutorials, blog + post, contact, FAQ, glossary, store,
both booking pages, checkout, success, the four lesson pages, two product pages).

## Result

Lighthouse, mobile preset (Moto G Power emulation, simulated slow 4G, 4x CPU), `next build` + `next start`.

| Category (average of 19 pages) | Before | After |
|---|---|---|
| Performance | 71 | **98** (range 93-100) |
| Accessibility | 90 | **100** (every page) |
| SEO | 91 | **100** (every page) |
| Best practices | 96 | **99** |
| CLS | 0 - 0.83 | **0** (every page) |
| LCP (home) | 6.7 s | **2.3 s** |
| TBT (home) | 1,260 ms | **60 ms** |

Desktop preset: 100 / 100 / 100 / 100 on every page.

### What is not 100, and why

- **Performance 93-99 on the pages whose LCP is an image** (home, about, tutorials, store, product
  pages). Run-to-run variance in this setup is about +/-3 points. The local server speaks HTTP/1.1,
  which Lighthouse models as a 6-connection queue; production (HTTP/2) should do a little better.
  **Re-run PageSpeed Insights on the deployed site to confirm.**
- **Best practices 96 on `/`, `/book-bundle-lesson`, `/checkout`.** The only failure is
  `errors-in-console`: the sandbox this was measured in blocks Google Tag Manager, Appointlet's
  loader and Stripe.js. They load normally in production. Not a code defect.

Scores are lab data. Real-user (CrUX) numbers will differ.

## Responsive audit (6 viewports: 320, 375, 414, 768, 1024, 1440)

| Finding | Fix |
|---|---|
| FAQ "Quick Navigation" grid (`minmax(300px, 1fr)`) overflowed a 320px screen by 24px, clipped by `#app { overflow: hidden }` | `minmax(min(300px, 100%), 1fr)` |
| FAQ tables 2px wider than a 320px screen | wrapped in `.table-scroll` |
| Footer text 8.4px (headings) and 9.8px (links) on phones, no tap padding | 12.6px+, links and social icons >= 44px tap targets |
| Cart button, carousel dots, FAQ links, "Back to Products", hero/primary buttons 29-36px tall | >= 44px on phones |
| Logo squashed on phones (HTML `height` fixed while CSS `max-width: 200px` shrank the width) | `height: auto` |
| About page: portrait photo behind body text on phones | light white overlay <= 768px |
| Product page: 450px decorative image wider than a phone, sat behind the copy | hidden <= 767px, `next/image`, `alt=""` |
| Floating cart button: white icon on light-blue gradient (~2.6:1) | dark navy with white ring |
| Desktop header "Book a Lesson" / cart: white text on a light-blue gradient (~2.6:1; Lighthouse cannot evaluate gradients) | white pills, dark-blue text (>= 7:1) |

Semantic UI's `.ui.grid` has `margin: -1rem`, so grids on home, about and book-lesson extend 14px
past the viewport edge on each side. `#app` used `overflow: hidden` to trim that, which also made
`#app` a scroll container and silently disabled `position: sticky` (the product page's price card
never stuck). It is now `overflow-x: clip`: same visual result (122 full-page screenshots across 20
pages and 6 widths were pixel-compared before/after; differences are <= 8/255 gradient dithering),
no horizontal scroll at any width, and the sticky card works as written.

## Root causes found (these account for most of the score change)

1. **Header, footer, home page and store page were client-only.** `@loadable/component` without
   SSR meant the server HTML had an empty `<div class="big-container">`: slow LCP, layout shift,
   and nothing for non-JS crawlers to read. Now server-rendered.
2. **The whole app re-mounted after hydration on every page.** `use-shopping-cart` changes its
   element tree after mount (adds a `PersistGate`), so React unmounts and re-mounts everything.
   It also rebuilt its Redux store on every render and loaded Stripe.js on every page. Replaced by
   `contexts/CartContext.js` (same hook name and fields, about 135 lines, localStorage
   persistence, restored after mount). Cart behavior is covered by a 16-step browser test (add,
   quantity, persist across reload, remove, checkout payload shape, clear on success, malformed
   storage).
3. **`experimental.optimizeCss` (Critters)** inlined only part of each page's CSS and loaded the rest
   async, so pages painted unstyled and jumped when the stylesheet arrived (CLS 0.55-0.83 on lesson
   pages). Removed.
4. **A custom `splitChunks` config forced all of `node_modules` into one 400 KB `vendor` chunk**
   used by every page (50-80% unused). Removed; Next's default splitting is used.
5. **Render-blocking Google Fonts `@import`** inside `semantic.min.css`, plus an unused Poppins
   preload. Lato is now self-hosted (`public/fonts`, OFL) and preloaded.
6. **`semantic.min.css` (560 KB raw, 97% unused per page)** replaced with the component stylesheets the
   site uses; **icon fonts (95 KB, 2 requests) replaced by 10 inline SVGs** (`components/SvgIcon.js`,
   Font Awesome Free glyphs, CC BY 4.0 attribution kept in the file).
7. **`semantic-ui-carousel-react` added ~700 KB of JS to the home page** for a testimonial rotator.
   Replaced by `components/TestimonialCarousel.js` (about 50 lines; keyboard-accessible dots, pause on
   interaction, honors `prefers-reduced-motion`).
8. Smaller: LCP images were `loading="lazy"` (home, blog, store, tutorials, booking); the cart modal
   is now loaded on demand; the header logo is `next/image` instead of a 30 KB PNG at 1123px.

## Accessibility / SEO fixes

- `<main>`, `<header>`, `<footer>` landmarks; one `<h1>` on every page (six had none); footer
  headings no longer skip levels.
- Cart buttons had no accessible name; the cart "close" and "remove" controls were bare icons.
- `<button>` nested inside `<a>` ("Book a Lesson") is now a real link.
- Store cards were `<div onClick>` and not crawlable links; they are now real `<a>` elements.
- Contrast: `#4183c4` links (3.8:1), `#667eea` purple (3.5:1), Semantic's default primary
  button (3.9:1), `#999` prices (2.8:1), `#7f8c8d` copy (3.5:1), kids-lesson pink/orange hero.
- Tutorial thumbnails had no `alt`; contact iframe had no `title`.
- **Bug fixed:** every header nav link had an `onClick` that threw (`this.setState` in a function
  component, destructuring an argument Next never passes), so header navigation fell back to a
  full page reload instead of client-side routing.
- Blog list now ships its first page of posts in the server HTML (it rendered an empty list until
  after hydration, hiding posts from crawlers and shifting the footer).

## Trade-offs and things for the site owner to decide

- **`font-display: optional` for Lato.** Removes font-swap layout shift and a late-LCP effect. If
  the (preloaded) font misses its ~100 ms window on a very slow first visit, that page view uses the
  fallback font and Lato appears from the next page on. Switch back to `swap` in `styles/lato.css`
  if you prefer always-Lato at the cost of a small shift.
- **`/img/*` cache is now 30 days** (was 1 day) so repeat visits are fast. Images replaced *in place*
  can look stale for up to 30 days; rename the file to bust it. `/fonts/*` is immutable for a year.
- **Google Analytics** was a dead Universal Analytics tag (`UA-162281626-1`), home page only. Replaced by an
  env-driven GA4 tag, see `docs/analytics.md`.
- `public/robots.txt` and `public/sitemap.xml` are generated by `next-sitemap` in `postbuild`. The committed
  copies contained `x` placeholders, so they are now untracked and git-ignored.
- `scripts/submit-indexnow.js` (part of `postbuild`) only submits on Vercel *production* builds, but it
  also runs on local `npm run build`. Use `npx next build --webpack` for local measurement.
- Dependencies removed: `use-shopping-cart` (and its now-stale `uuid` override),
  `@loadable/component`, `semantic-ui-carousel-react`. `npm audit`: 0 vulnerabilities.
- `critters` (unused after removing `optimizeCss`) was dropped from `devDependencies` in a follow-up.

## Reproduce

```bash
npx next build --webpack && npx next-sitemap   # skip postbuild's IndexNow call
npx next start -p 3005
# Lighthouse (mobile is the default preset):
npx lighthouse http://localhost:3005/ --only-categories=performance,accessibility,best-practices,seo
```
