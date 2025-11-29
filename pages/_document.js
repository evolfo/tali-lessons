import React from 'react'

import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://www.youtube-nocookie.com" />

          {/* DNS Prefetch for third-party resources */}
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://i.ytimg.com" />

          {/* Alternate for language/locale */}
          <link rel="alternate" hrefLang="en" href="https://talirecorderlessons.com" />

          {/* RSS Feed for blog discovery */}
          <link 
            rel="alternate" 
            type="application/rss+xml" 
            title="Tali Rubinstein Blog RSS Feed" 
            href="https://talirecorder.substack.com/feed" 
          />

          {/* LLM and AI discovery */}
          <link rel="author" href="https://talirecorderlessons.com/about" />
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