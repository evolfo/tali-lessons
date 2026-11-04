import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Container } from 'semantic-ui-react'
import { BreadcrumbSchema, PERSON_ID, ORGANIZATION_ID } from '../components/StructuredData'
import { serializeJsonLd } from '../lib/jsonld'

const SITE = 'https://www.talirecorderlessons.com'
const PAGE_URL = `${SITE}/which-recorder-to-buy`
const TITLE = 'Soprano vs Alto: Which Recorder to Buy'
const DESCRIPTION =
  'Which recorder should you buy? Soprano vs alto, plastic vs wood, Baroque vs German fingering, and what a beginner really needs, explained for beginners and returning players.'
const PUBLISHED = '2026-11-04'

const QA = [
  {
    q: 'Should a beginner buy a soprano or an alto recorder?',
    a: 'Most beginners should start on a soprano (descant) recorder in C. It is small, inexpensive, and used by nearly every beginner method book and school programme. Choose an alto in F instead if you are an adult or older teenager who wants Baroque solo repertoire from the start, or if soprano-sized finger holes feel cramped.',
  },
  {
    q: 'Is a plastic or wooden recorder better for a beginner?',
    a: 'A plastic recorder is the better first instrument. Good plastic models are accurate, durable, cheap, and need no special care. A wooden recorder has a warmer sound but must be warmed up and oiled, and can crack, so it makes sense as a second instrument once you know you will keep playing.',
  },
  {
    q: 'Do I need Baroque or German fingering?',
    a: 'Choose Baroque (English) fingering. It is the standard for serious playing and for historical repertoire, and its chromatic notes are better in tune. German fingering makes the note F easier at first but is harder to play in tune later, so players who continue usually have to switch.',
  },
]

const section = { marginBottom: '2.5rem' }
const h2 = { fontSize: '1.9rem', color: '#2c3e50', marginBottom: '1rem' }
const p = { fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }
const cell = { padding: '0.7rem 0.9rem', borderBottom: '1px solid #e9ecef', textAlign: 'left', verticalAlign: 'top' }
const head = { ...cell, background: '#f4f7fb', fontWeight: 700 }

const WhichRecorder = () => {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: TITLE,
      description: DESCRIPTION,
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      inLanguage: 'en',
      author: { '@id': PERSON_ID, '@type': 'Person', name: 'Tali Rubinstein' },
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: QA.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ]

  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESCRIPTION}
        canonical={PAGE_URL}
        openGraph={{
          url: PAGE_URL,
          title: TITLE,
          description: DESCRIPTION,
          type: 'article',
          images: [{ url: `${SITE}/img/recorders.jpg`, width: 1200, height: 630, alt: 'Recorders of different sizes' }],
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Which recorder to buy', url: '/which-recorder-to-buy' },
        ]}
      />
      {structuredData.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(d) }} />
      ))}

      <Container style={{ marginTop: '6rem', marginBottom: '4rem', maxWidth: '850px' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Soprano vs Alto: Which Recorder Should You Buy?</h1>
        <p style={{ ...p, fontSize: '1.25rem' }}>
          <strong>Short answer:</strong> buy a plastic soprano (descant) recorder in C with Baroque fingering. It
          costs roughly $20 to $30, it is what almost every beginner method assumes, and it is the right
          instrument for online lessons. Pick an alto in F instead if you are an adult who wants Baroque solo
          music straight away.
        </p>

        <section style={section}>
          <h2 style={h2}>The recorder sizes at a glance</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.05rem' }}>
              <thead>
                <tr>
                  <th scope="col" style={head}>Recorder</th>
                  <th scope="col" style={head}>Pitched in</th>
                  <th scope="col" style={head}>Who it is for</th>
                </tr>
              </thead>
              <tbody>
                <tr><th scope="row" style={cell}>Soprano (descant)</th><td style={cell}>C</td><td style={cell}>Beginners, children, school programmes, most method books</td></tr>
                <tr><th scope="row" style={cell}>Alto (treble)</th><td style={cell}>F</td><td style={cell}>The main Baroque solo instrument (Handel, Telemann); a common second recorder</td></tr>
                <tr><th scope="row" style={cell}>Tenor</th><td style={cell}>C</td><td style={cell}>Consort and ensemble playing</td></tr>
                <tr><th scope="row" style={cell}>Bass</th><td style={cell}>F</td><td style={cell}>Bass lines in recorder consorts</td></tr>
                <tr><th scope="row" style={cell}>Sopranino</th><td style={cell}>F</td><td style={cell}>Some Baroque concertos and ensembles; not a first instrument</td></tr>
              </tbody>
            </table>
          </div>
          <p style={p}>
            See the <Link href="/glossary">recorder glossary</Link> for plain-English definitions of each size.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>Soprano or alto for a beginner?</h2>
          <p style={p}>
            The soprano is smaller, cheaper, and more forgiving of small hands, and what you learn on it
            (breath control, tonguing, finger technique) carries straight over to the alto. That makes it the
            safe first choice for children and for adults who simply want to start playing.
          </p>
          <p style={p}>
            The alto has a lower, mellower tone and carries most of the solo Baroque repertoire, including the
            Handel sonatas. Adults who know they want that music, or who find the soprano&apos;s tone too piercing,
            can reasonably begin on an alto. Many players end up owning both.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>Plastic or wood?</h2>
          <p style={p}>
            Start with plastic. Well-made plastic recorders are accurate, survive being dropped, can be washed,
            and need no break-in. Wooden recorders sound warmer and more refined, but they need warming up before
            playing, occasional oiling, and protection from cracking. Move to wood once you are sure you will keep
            playing and your teacher can help you choose one.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>Baroque or German fingering?</h2>
          <p style={p}>
            Choose <strong>Baroque (English) fingering</strong>. It is the standard for serious players and for
            historical repertoire, and it is better in tune on chromatic notes. German fingering simplifies the note F
            for absolute beginners, but players who continue have to relearn. If a product listing does not say which
            system it uses, look for a different one.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>What to buy, and what it costs</h2>
          <p style={p}>
            For a first recorder, a good plastic soprano costs about $20 to $30. A wooden student instrument is
            more, typically $60 to $100. The <Link href="/faq#best-recorder">FAQ</Link> lists specific models, and{' '}
            <Link href="/faq#equipment">what else you need</Link> for online lessons (a music stand and a device
            with a camera) comes to a total start-up cost of roughly $40 to $150.
          </p>
        </section>

        <section style={section}>
          <h2 style={h2}>Questions people ask</h2>
          {QA.map(({ q, a }) => (
            <div key={q} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#2c3e50' }}>{q}</h3>
              <p style={p}>{a}</p>
            </div>
          ))}
        </section>

        <div style={{ background: '#f4f7fb', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.7rem', marginTop: 0 }}>Not sure what to buy?</h2>
          <p style={{ ...p, maxWidth: '620px', margin: '0 auto 1.25rem' }}>
            Ready to start playing? See the{' '}
            <Link href="/lessons/beginner-recorder-lessons">beginner recorder lessons</Link> or{' '}
            <Link href="/book-lesson">book a lesson</Link>.
          </p>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}

export default WhichRecorder
