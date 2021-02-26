import React from 'react'
import Head from 'next/head'
import loadable from '@loadable/component'

const HomePage = loadable(() => import('../components/HomePage'));

const Home = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/img/favicon.ico" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-162281626-1"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-162281626-1');
              `,
          }}
        />
      </Head>
      <HomePage />
    </>
  );
}

export default Home