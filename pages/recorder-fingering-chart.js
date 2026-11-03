import React, { useState } from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Container } from 'semantic-ui-react'
import { BreadcrumbSchema, PERSON_ID } from '../components/StructuredData'
import RecorderDiagram from '../components/RecorderDiagram'
import { serializeJsonLd } from '../lib/jsonld'
import { FINGERINGS, INSTRUMENTS, HOLE_LABELS, fingeringText } from '../data/fingerings'

const SITE = 'https://www.talirecorderlessons.com'
const PAGE_URL = `${SITE}/recorder-fingering-chart`
const TITLE = 'Recorder Fingering Chart: Soprano & Alto'
const DESCRIPTION =
  'Free printable recorder fingering chart: Baroque (English) fingering for soprano and alto, low C to high C, with clear hole diagrams and how to read them.'

const describe = (holes) =>
  holes
    .split('')
    .map((c, i) => `${HOLE_LABELS[i] === 'Thumb' ? 'thumb hole' : 'hole ' + HOLE_LABELS[i]} ${c === '#' ? 'covered' : c === '/' ? 'half covered' : 'open'}`)
    .join(', ')

const FingeringChart = () => {
  const [instrument, setInstrument] = useState('soprano')
  const [selectedId, setSelectedId] = useState('f')
  const names = INSTRUMENTS[instrument].names
  const selected = FINGERINGS.find((f) => f.id === selectedId)

  const noteLabel = (f) => {
    const base = names(f.name)
    const alt = f.alt ? names(f.alt) : null
    return alt ? `${base} / ${alt}` : base
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    '@id': PAGE_URL,
    name: 'Recorder Fingering Chart (Baroque fingering)',
    description: DESCRIPTION,
    url: PAGE_URL,
    inLanguage: 'en',
    isAccessibleForFree: true,
    learningResourceType: 'Chart',
    educationalLevel: 'Beginner',
    teaches: 'Baroque (English) fingering for soprano and alto recorder, low C to high C',
    author: { '@id': PERSON_ID, '@type': 'Person', name: 'Tali Rubinstein' },
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
          images: [{ url: `${SITE}/img/recorders.jpg`, width: 1200, height: 630, alt: 'Recorders of different sizes' }],
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Recorder Fingering Chart', url: '/recorder-fingering-chart' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .fc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 1fr)); gap: 14px; }
            .fc-card { background: #fff; border: 2px solid #e9ecef; border-radius: 10px; padding: 12px 6px 10px; text-align: center; cursor: pointer; font: inherit; color: inherit; }
            .fc-card:hover { border-color: #667eea; }
            .fc-card[aria-pressed="true"] { border-color: #667eea; box-shadow: 0 0 0 3px #667eea33; }
            .fc-note { font-size: 1.25rem; font-weight: 700; color: #2c3e50; margin-bottom: 6px; }
            .fc-text { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: .9rem; color: #555; margin-top: 6px; }
            .fc-toggle button { padding: .6rem 1.2rem; border: 2px solid #667eea; background: #fff; color: #667eea; font: inherit; font-weight: 600; cursor: pointer; }
            .fc-toggle button:first-child { border-radius: 8px 0 0 8px; }
            .fc-toggle button:last-child { border-radius: 0 8px 8px 0; border-left: 0; }
            .fc-toggle button[aria-pressed="true"] { background: #667eea; color: #fff; }
            .fc-detail { display: flex; gap: 2rem; align-items: center; justify-content: center; flex-wrap: wrap; }
            @media print {
              #footer, .no-print, header, nav { display: none !important; }
              .fc-card { break-inside: avoid; border-color: #999; }
            }
          `,
        }}
      />

      <Container style={{ marginTop: '6rem', marginBottom: '4rem', maxWidth: '1000px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Recorder Fingering Chart</h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
          Baroque (English) fingering for soprano and alto recorder, low C to high C. Click any note to enlarge it.
        </p>

        <div className="fc-toggle no-print" style={{ textAlign: 'center', marginBottom: '2rem' }} role="group" aria-label="Choose your recorder">
          {Object.entries(INSTRUMENTS).map(([key, inst]) => (
            <button key={key} type="button" aria-pressed={instrument === key} onClick={() => setInstrument(key)}>
              {inst.short}
            </button>
          ))}
          <p style={{ color: '#666', marginTop: '.75rem', marginBottom: 0 }}>{INSTRUMENTS[instrument].label}</p>
        </div>

        {/* Selected note, enlarged */}
        <section
          aria-live="polite"
          style={{ background: '#f8f9fa', border: '2px solid #e9ecef', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}
        >
          <div className="fc-detail">
            <RecorderDiagram
              holes={selected.holes}
              width={130}
              label={`${noteLabel(selected)} on ${INSTRUMENTS[instrument].short} recorder: ${describe(selected.holes)}`}
            />
            <div>
              <h2 style={{ fontSize: '2.4rem', margin: 0 }}>{noteLabel(selected)}</h2>
              <p className="fc-text" style={{ fontSize: '1.3rem' }}>{fingeringText(selected.holes)}</p>
              <p style={{ color: '#555', maxWidth: '380px', marginBottom: 0 }}>
                {selected.octave === 'high' ? 'Upper register: ' : ''}
                {describe(selected.holes)}.
              </p>
            </div>
          </div>
        </section>

        <div className="no-print" style={{ textAlign: 'right', marginBottom: '.75rem' }}>
          <button type="button" onClick={() => window.print()} style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', font: 'inherit', textDecoration: 'underline' }}>
            Print this chart
          </button>
        </div>

        <div className="fc-grid">
          {FINGERINGS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="fc-card"
              aria-pressed={selectedId === f.id}
              onClick={() => setSelectedId(f.id)}
            >
              <div className="fc-note">{noteLabel(f)}</div>
              <RecorderDiagram
                holes={f.holes}
                width={64}
                label={`${noteLabel(f)}: ${describe(f.holes)}`}
              />
              <div className="fc-text">{fingeringText(f.holes)}</div>
            </button>
          ))}
        </div>

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#2c3e50' }}>How to read this chart</h2>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
            <li><strong>Filled circle</strong> = cover the hole completely with the pad of your finger. <strong>Empty circle</strong> = leave it open.</li>
            <li><strong>T</strong> is the thumb hole on the back, covered by your left thumb. Your left hand covers holes 1-3 (index, middle, ring), your right hand covers holes 4-7 (index, middle, ring, little finger).</li>
            <li>Holes 6 and 7 are <Link href="/glossary#double-holes">double holes</Link>. A half-filled pair means cover only one hole of the pair.</li>
            <li>The written fingering, such as <code>0 123 4&ndash;67</code>, lists the thumb (0), then holes 1-3, then holes 4-7. A dash means that hole is open.</li>
            <li>Notes with two names, such as {'C\u266f / D\u266d'}, are the same note and use the same fingering.</li>
          </ul>

          <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginTop: '2rem' }}>Soprano and alto: same fingerings, different note names</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
            Soprano and tenor recorders are C instruments, and alto, bass, and sopranino recorders are F instruments. They share the same finger patterns, but the
            all-holes-covered fingering sounds a C on a soprano and an F on an alto. Use the buttons above to switch the note names to match your instrument.
          </p>

          <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginTop: '2rem' }}>Baroque or German fingering?</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
            This chart is for <Link href="/glossary#baroque-fingering">Baroque (English) fingering</Link>, the standard for serious playing and the one taught in private lessons.
            Some school recorders use <Link href="/glossary#german-fingering">German fingering</Link>, which changes the fingering for F and a few other notes. If your recorder came with a
            different chart, or a note will not come out in tune, check the product description or ask your teacher which system you have.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
            A chart tells you where your fingers go, not how the note should sound. Cover the holes fully, blow gently, and listen: too much air pushes notes sharp. See the{' '}
            <Link href="/faq">recorder lessons FAQ</Link> for practice routines and learning timelines.
          </p>
        </section>

        <div
          className="no-print"
          style={{ background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)', padding: '2.5rem 2rem', borderRadius: '12px', textAlign: 'center', marginTop: '3rem' }}
        >
          <h2 style={{ fontSize: '1.8rem', marginTop: 0 }}>Ready to go beyond the chart?</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 1.5rem' }}>
            Learn clean tone, breathing, and the upper register in live online lessons with Tali Rubinstein.
          </p>
          <Link href="/lessons/beginner-recorder-lessons">Beginner recorder lessons</Link>
          {' · '}
          <Link href="/tutorials">Free tutorials</Link>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}

export default FingeringChart
