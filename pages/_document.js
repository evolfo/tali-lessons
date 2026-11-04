import React from 'react'

import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://www.youtube-nocookie.com" />

          {/* DNS Prefetch for third-party resources */}
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://i.ytimg.com" />

          {/* Self-hosted Lato: preload the two weights used above the fold */}
          <link rel="preload" href="/fonts/lato-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/lato-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

          {/* RSS Feed for blog discovery */}
          <link 
            rel="alternate" 
            type="application/rss+xml" 
            title="Tali Rubinstein Blog RSS Feed" 
            href="https://talirecorder.substack.com/feed" 
          />

          {/* Favicons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* LLM and AI discovery */}
          <link rel="author" href="https://www.talirecorderlessons.com/about" />
          <link rel="alternate" type="text/plain" title="LLM Summary (llms.txt)" href="https://www.talirecorderlessons.com/llms.txt" />
          {/* Per-page <NextSeo> only emits "index,follow"; this adds the rich-result directives. */}
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}