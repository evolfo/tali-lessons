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

          {/* DNS Prefetch for third-party resources */}
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />

          {/* Alternate for language/locale */}
          <link rel="alternate" hrefLang="en" href="https://talirecorderlessons.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}