import React from 'react'
import Head from 'next/head'
import loadable from '@loadable/component'

const HomePage = loadable(() => import('../components/HomePage'));

const Home = () => {
  return (
    <>
      <Head>
        <title>Recorder Lessons with Tali Rubinstein - Music Lessons Online</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Looking to learn the recorder? Tali Rubinstein teaches online recorder lessons to all skill levels and age groups, from beginners to advanced students." />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="Recorder Lessons with Tali Rubinstein" />
        <meta property="og:description" content="Looking to learn the recorder? Tali Rubinstein teaches online recorder lessons to all skill levels and age groups, from beginners to advanced students." />
        <meta property="og:url" content="https://www.talirecorderlessons.com" />
        <meta property="og:image" content="/img/background1.jpg" />
        
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <link rel="canonical" href="https://www.talirecorderlessons.com" />

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