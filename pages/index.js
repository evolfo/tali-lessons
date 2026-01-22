import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import loadable from '@loadable/component'
import { NextSeo } from 'next-seo'
import { PersonSchema, MusicSchoolSchema, FAQSchema, ServiceSchema } from '../components/StructuredData'

const HomePage = loadable(() => import('../components/HomePage'));

const Home = () => {
  return (
    <>
      <NextSeo
        title="Online Recorder Lessons with Tali Rubinstein | Professional Instruction for All Levels"
        description="Learn recorder with world-renowned musician Tali Rubinstein. Online lessons for beginners to advanced players. Personalized instruction, flexible scheduling, and original sheet music available."
        canonical="https://www.talirecorderlessons.com/"
        openGraph={{
          url: 'https://www.talirecorderlessons.com',
          title: 'Online Recorder Lessons with Tali Rubinstein',
          description: 'Professional online recorder instruction for all skill levels. Learn from a world-class performer and educator.',
          images: [
            {
              url: 'https://www.talirecorderlessons.com/img/background1.jpg',
              width: 1200,
              height: 630,
              alt: 'Tali Rubinstein teaching recorder lessons',
            },
          ],
          site_name: 'Tali Recorder Lessons',
        }}
      />

      <PersonSchema />
      <MusicSchoolSchema />
      <FAQSchema />
      <ServiceSchema />

      <Head>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <meta name="keywords" content="recorder lessons, online music lessons, recorder teacher, learn recorder, recorder instruction, music education, baroque recorder, Tali Rubinstein, online recorder classes" />

        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Online Worldwide" />

        {/* Additional meta tags for LLM understanding */}
        <meta name="author" content="Tali Rubinstein" />
        <meta name="subject" content="Online Recorder Music Lessons" />
        <meta name="topic" content="Music Education, Recorder Instruction" />
        <meta name="classification" content="Education, Music" />
      </Head>

      {/* Google Analytics - using next/script for proper loading */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-162281626-1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-162281626-1');
        `}
      </Script>

      <HomePage />
    </>
  );
}

export default Home