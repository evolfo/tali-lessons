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

import { DefaultSeo } from "next-seo"
import nextSeoConfig from '../next-seo.config'
import { CartProvider } from '../contexts/CartContext'
import { CartModalProvider } from '../contexts/CartModalContext'
import { WebSiteSchema } from '../components/StructuredData'

import MainHeader from '../templates/MainHeader'
import Footer from '../templates/Footer'

export default function App({ Component, pageProps }) {
   return (
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
   )
}