# Analytics (Google Analytics 4)

The site already has a GA4 property, **"Tali's Recorder Lessons - GA4"**. Google auto-migrated it from
the old Universal Analytics property (`UA-162281626-1`), and it is still recording: the old tag on the
home page keeps feeding it through the property's "connected site tag". Two limitations of that setup:

- The old tag only loaded on the **home page**, so visits to every other page were never counted.
- It depends on a legacy `UA-` ID that Google could stop honoring.

`pages/_app.js` now loads GA4 directly, **site-wide**, using the property's own Measurement ID.
Use the existing property; do not create a new one (it would split your history).

## Turn it on

1. In Google Analytics: **Admin -> Data collection and modification -> Data streams**, open the
   **Web** stream, and copy its **Measurement ID** (looks like `G-ABC123XYZ4`).
2. In Vercel, add the environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` with that value
   (Production, and Preview too if you want preview traffic recorded).
3. Redeploy. The variable is read at build time.

**Set the variable before (or together with) merging the PR that removes the old tag.** With no ID
set, nothing is loaded, so removing the old tag first would pause tracking until the ID is added.

## Notes

- The tag loads with `strategy="lazyOnload"`, after the page is interactive, so it doesn't affect
  Lighthouse performance or LCP.
- Page views for client-side navigation are recorded by GA4's "enhanced measurement" (page changes
  based on browser history events), which is on by default for web streams.
- No consent banner is included. If you have visitors in the EU/UK, consider adding one (Google
  Consent Mode).
