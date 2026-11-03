import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Container } from 'semantic-ui-react'
import { BreadcrumbSchema, PERSON_ID } from '../components/StructuredData'
import { serializeJsonLd } from '../lib/jsonld'
import { GLOSSARY_CATEGORIES, glossaryTerms } from '../data/glossary'

const SITE = 'https://www.talirecorderlessons.com'
const PAGE_URL = `${SITE}/glossary`
const TITLE = 'Recorder Glossary: Recorder Terms and Techniques Explained'
const DESCRIPTION =
  'Plain-English definitions of recorder terms: soprano vs alto, Baroque vs German fingering, windway, labium, tonguing, flattement, divisions, basso continuo, and more.'

const Glossary = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': PAGE_URL,
    name: 'Recorder Glossary',
    description: DESCRIPTION,
    url: PAGE_URL,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID, '@type': 'Person', name: 'Tali Rubinstein' },
    hasDefinedTerm: glossaryTerms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${PAGE_URL}#${t.slug}`,
      name: t.term,
      description: t.definition,
      url: `${PAGE_URL}#${t.slug}`,
      inDefinedTermSet: PAGE_URL,
    })),
  }

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
          type: 'website',
          images: [
            {
              url: `${SITE}/img/recorders.jpg`,
              width: 1200,
              height: 630,
              alt: 'Recorders of different sizes',
            },
          ],
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Glossary', url: '/glossary' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />

      <Container style={{ marginTop: '6rem', marginBottom: '4rem', maxWidth: '900px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Recorder Glossary</h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
          Recorder terms, instrument types, and techniques in plain English.
        </p>

        <nav
          aria-label="Glossary categories"
          style={{
            background: '#f8f9fa',
            padding: '1.5rem 2rem',
            borderRadius: '8px',
            marginBottom: '3rem',
            border: '2px solid #e9ecef',
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: '1.3rem' }}>Jump to a category</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem' }}>
            {GLOSSARY_CATEGORIES.map((category) => (
              <li key={category}>
                <a href={`#category-${category.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{category}</a>
              </li>
            ))}
          </ul>
        </nav>

        {GLOSSARY_CATEGORIES.map((category) => (
          <section
            key={category}
            id={`category-${category.toLowerCase().replace(/[^a-z]+/g, '-')}`}
            style={{ marginBottom: '3rem' }}
          >
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1.5rem' }}>{category}</h2>
            {glossaryTerms
              .filter((t) => t.category === category)
              .map((t) => (
                <article
                  key={t.slug}
                  id={t.slug}
                  style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e9ecef' }}
                >
                  <h3 style={{ fontSize: '1.4rem', color: '#2c3e50', marginBottom: '0.5rem' }}>{t.term}</h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '0.5rem' }}>
                    {t.definition}
                  </p>
                  {t.learnMore && (
                    <p style={{ margin: 0 }}>
                      Learn more: <Link href={t.learnMore.href}>{t.learnMore.label}</Link>
                    </p>
                  )}
                </article>
              ))}
          </section>
        ))}

        <div
          style={{
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            padding: '2.5rem 2rem',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '1.8rem', marginTop: 0 }}>Want to put these terms into practice?</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 1.5rem' }}>
            Learn them hands-on in online recorder lessons with Tali Rubinstein, or read the{' '}
            <Link href="/faq">recorder lessons FAQ</Link> for costs, instruments, and learning timelines.
          </p>
          <Link href="/book-lesson">Book a lesson</Link>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}

export default Glossary
