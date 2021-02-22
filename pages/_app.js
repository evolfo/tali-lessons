import React from 'react'

import '../styles/App.scss'
import 'semantic-ui-css/semantic.min.css'

import loadable from '@loadable/component'

import { DefaultSeo } from "next-seo"
import nextSeoConfig from '../next-seo.config'

const MainHeader = loadable(() => import('../templates/MainHeader'));
const Footer = loadable(() => import('../templates/Footer'));

export default function App({ Component, pageProps }) {
   return (
     <div id="app">
         <MainHeader />
         <DefaultSeo {...nextSeoConfig} />
         <div className="big-container">
            <Component {...pageProps} />
         </div>
         <Footer />
     </div>
   )
}