import React from 'react'

import '../styles/App.scss'
import 'semantic-ui-css/semantic.min.css'

import loadable from '@loadable/component'

const MainHeader = loadable(() => import('../templates/MainHeader'));
const Footer = loadable(() => import('../templates/Footer'));

export default function App({ Component, pageProps }) {
   return (
     <div id="app">
         <MainHeader />
         <div className="big-container">
            <Component {...pageProps} />
         </div>
         <Footer />
     </div>
   )
}