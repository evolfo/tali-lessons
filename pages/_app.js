import React from 'react'

import '../styles/App.scss'
import 'semantic-ui-css/semantic.min.css'

import loadable from '@loadable/component'

import { DefaultSeo } from "next-seo"
import nextSeoConfig from '../next-seo.config'
import { CartProvider } from 'use-shopping-cart'
import { CartModalProvider } from '../contexts/CartModalContext'

const MainHeader = loadable(() => import('../templates/MainHeader'));
const Footer = loadable(() => import('../templates/Footer'));

export default function App({ Component, pageProps }) {
   return (
     <CartProvider
       mode="payment"
       cartMode="checkout-session"
       stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
       currency="USD"
       shouldPersist={true}
     >
       <CartModalProvider>
         <div id="app">
             <MainHeader />
             <DefaultSeo {...nextSeoConfig} />
             <div className="big-container">
                <Component {...pageProps} />
             </div>
             <Footer />
         </div>
       </CartModalProvider>
     </CartProvider>
   )
}