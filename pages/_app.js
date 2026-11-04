import React from 'react'

import '../styles/lato.css'
import '../styles/App.scss'
// Only the Semantic UI components the site uses, instead of the 98 KB
// semantic.min.css bundle (97% unused per page). site.css is vendored in
// styles/semantic-site.css without its render-blocking Google Fonts @import.
import 'semantic-ui-css/components/reset.min.css'
import '../styles/semantic-site.css'
import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/card.min.css'
import 'semantic-ui-css/components/container.min.css'
import 'semantic-ui-css/components/dimmer.min.css'
import 'semantic-ui-css/components/dropdown.min.css'
import 'semantic-ui-css/components/embed.min.css'
import 'semantic-ui-css/components/grid.min.css'
import 'semantic-ui-css/components/header.min.css'
import 'semantic-ui-css/components/image.min.css'
import 'semantic-ui-css/components/input.min.css'
import 'semantic-ui-css/components/label.min.css'
import 'semantic-ui-css/components/list.min.css'
import 'semantic-ui-css/components/loader.min.css'
import 'semantic-ui-css/components/menu.min.css'
import 'semantic-ui-css/components/message.min.css'
import 'semantic-ui-css/components/modal.min.css'
import 'semantic-ui-css/components/segment.min.css'
import 'semantic-ui-css/components/transition.min.css'

import Script from 'next/script'
import { DefaultSeo } from "next-seo"
import nextSeoConfig from '../next-seo.config'
import { CartProvider } from '../contexts/CartContext'
import { CartModalProvider } from '../contexts/CartModalContext'
import { WebSiteSchema } from '../components/StructuredData'

import MainHeader from '../templates/MainHeader'
import Footer from '../templates/Footer'

// Google Analytics 4. Set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-ABC123XYZ4) in the
// hosting environment to enable it; with no ID nothing is loaded. GA4's enhanced
// measurement records client-side route changes automatically. See docs/analytics.md.
const GA_ID = /^G-[A-Z0-9]{6,}$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '')
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  : null

export default function App({ Component, pageProps }) {
   return (
     <>
     {GA_ID && (
       <>
         <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
         <Script id="ga4-init" strategy="lazyOnload">
           {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
         </Script>
       </>
     )}
     <CartProvider>
       <CartModalProvider>
         <div id="app">
             <MainHeader />
             <DefaultSeo {...nextSeoConfig} />
             <WebSiteSchema />
             <main id="main" className="big-container">
                <Component {...pageProps} />
             </main>
             <Footer />
         </div>
       </CartModalProvider>
     </CartProvider>
     </>
   )
}