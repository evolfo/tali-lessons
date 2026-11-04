# Analytics (Google Analytics 4)

The site used a Universal Analytics tag (`UA-162281626-1`), which Google stopped processing in
July 2023, and it only loaded on the home page. It is replaced by GA4 loaded site-wide from
`pages/_app.js`.

## Turn it on

1. In Google Analytics create a **GA4 property** and a **Web data stream** for
   `https://www.talirecorderlessons.com`.
2. Copy the **Measurement ID** (looks like `G-ABC123XYZ4`).
3. In Vercel, add the environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` with that value
   (Production, and Preview too if you want preview traffic recorded) and redeploy.
   It is read at build time, so changing it needs a new deploy.

With no ID set (or one that doesn't look like `G-...`), nothing is loaded, so local development
and previews stay out of your data by default.

## Notes

- The tag loads with `strategy="lazyOnload"`, after the page is interactive, so it doesn't affect
  Lighthouse performance or LCP.
- Page views for client-side navigation are recorded by GA4's "enhanced measurement" (page changes
  based on browser history events), which is on by default for new web streams.
- No consent banner is included. If you have visitors in the EU/UK, consider adding one (Google
  Consent Mode) before enabling analytics there.
