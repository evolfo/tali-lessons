import React, { useState } from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Container, Button, Icon } from 'semantic-ui-react'
import { BreadcrumbSchema, PERSON_ID } from '../components/StructuredData'
import RecorderDiagram from '../components/RecorderDiagram'
import { serializeJsonLd } from '../lib/jsonld'
import { FINGERINGS, OCTAVES, INSTRUMENTS, HOLE_LABELS, fingeringText } from '../data/fingerings'

const SITE = 'https://www.talirecorderlessons.com'
const PAGE_URL = `${SITE}/recorder-fingering-chart`
const TITLE = 'Recorder Fingering Chart: Soprano & Alto'
const DESCRIPTION =
  'Free printable recorder fingering chart: Baroque fingering for soprano and alto across two octaves, with clear hole diagrams and how to read them.'

const describe = (holes) =>
  holes
    .split('')
    .map((c, i) => {
      const name = HOLE_LABELS[i] === 'Thumb' ? 'thumb hole' : 'hole ' + HOLE_LABELS[i]
      if (c === '#') return `${name} covered`
      if (c === '/') return i === 0 ? `${name} pinched (half covered)` : `${name} half covered`
      return `${name} open`
    })
    .join(', ')

const NOTES_BY_OCTAVE = Object.fromEntries(OCTAVES.map((o) => [o.id, FINGERINGS.filter((f) => f.octave === o.id)]))

const FingeringChart = () => {
  const [instrument, setInstrument] = useState('soprano')
  const [octave, setOctave] = useState('low')
  const [selectedId, setSelectedId] = useState('f')
  const names = INSTRUMENTS[instrument].names
  const selected = FINGERINGS.find((f) => f.id === selectedId)

  // Switching octave keeps the same note (F low -> F high) so the enlarged view
  // follows the player up the instrument.
  const changeOctave = (next) => {
    if (next === octave) return
    const from = NOTES_BY_OCTAVE[octave]
    const to = NOTES_BY_OCTAVE[next]
    const idx = Math.max(0, from.findIndex((f) => f.id === selectedId))
    setSelectedId(to[Math.min(idx, to.length - 1)].id)
    setOctave(next)
  }

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
    teaches: 'Baroque (English) fingering for soprano and alto recorder, from low C up to the highest D',
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
            .fc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(128px, 1fr)); gap: 14px; }
            .fc-card { background: #fff; border: 2px solid #e9ecef; border-radius: 10px; padding: 12px 6px 10px; text-align: center; cursor: pointer; font: inherit; color: inherit; transition: border-color .2s, box-shadow .2s; }
            .fc-card:hover { border-color: #2b77c4; }
            .fc-card[aria-pressed="true"] { border-color: #2b77c4; box-shadow: 0 0 0 3px rgba(43, 119, 196, .2); }
            .fc-note { font-size: 1.25rem; font-weight: 700; color: #2c3e50; margin-bottom: 6px; }
            .fc-text { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: .9rem; color: #555; margin-top: 6px; }
            .fc-detail { display: flex; gap: 2.5rem; align-items: center; justify-content: center; flex-wrap: wrap; }
            /* Site buttons: same blue as the header and footer */
            .fc-btn.ui.button { font-family: inherit; font-weight: 700; }
            .fc-btn.ui.primary.button { background: linear-gradient(180deg, #2b77c4 0%, #2a5a8a 100%); color: #fff; }
            .fc-btn.ui.primary.button:hover, .fc-btn.ui.primary.button:focus { background: linear-gradient(270deg, #8fc4f9 0%, #72aee6 100%); }
            .fc-btn.ui.basic.button { background: #fff; box-shadow: 0 0 0 1px #2b77c4 inset !important; color: #2b77c4 !important; }
            .fc-btn.ui.basic.button:hover, .fc-btn.ui.basic.button:focus { background: #e7f3ff; box-shadow: 0 0 0 1px #2a5a8a inset !important; color: #2a5a8a !important; }
            .fc-octave-title { font-size: 1.4rem; color: #2c3e50; margin: 0 0 .9rem; }
            @media print {
              /* print both octaves, whichever tab is open on screen */
              .fc-octave[hidden] { display: block !important; margin-top: 1.5rem; }
              #footer, .no-print, header, nav { display: none !important; }
              .fc-card { break-inside: avoid; border-color: #999; }
            }
          `,
        }}
      />

      <Container style={{ marginTop: '6rem', marginBottom: '4rem', maxWidth: '1000px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Recorder Fingering Chart</h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
          Baroque (English) fingering for soprano and alto recorder, from low C up to the highest D. Click any note to enlarge it.
        </p>

        <div className="no-print" style={{ textAlign: 'center', marginBottom: '2rem' }} role="group" aria-label="Choose your recorder">
          <Button.Group>
            {Object.entries(INSTRUMENTS).map(([key, inst]) => (
              <Button
                key={key}
                type="button"
                className="fc-btn"
                primary={instrument === key}
                basic={instrument !== key}
                aria-pressed={instrument === key}
                onClick={() => setInstrument(key)}
              >
                {inst.short}
              </Button>
            ))}
          </Button.Group>
          <p style={{ color: '#666', marginTop: '.75rem', marginBottom: 0 }}>{INSTRUMENTS[instrument].label}</p>
        </div>

        <div className="no-print" style={{ textAlign: 'center', marginBottom: '2rem' }} role="group" aria-label="Choose an octave">
          <Button.Group>
            {OCTAVES.map((o) => (
              <Button
                key={o.id}
                type="button"
                className="fc-btn"
                primary={octave === o.id}
                basic={octave !== o.id}
                aria-pressed={octave === o.id}
                onClick={() => changeOctave(o.id)}
              >
                {o.label}
              </Button>
            ))}
          </Button.Group>
          <p style={{ color: '#666', marginTop: '.75rem', marginBottom: 0 }}>
            {OCTAVES.find((o) => o.id === octave).range}
            {octave === 'high' ? ' (thumb open or pinched)' : ''}
          </p>
        </div>

        {/* Selected note, enlarged */}
        <section
          aria-live="polite"
          style={{ background: '#f8f9fa', border: '2px solid #e9ecef', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}
        >
          <div className="fc-detail">
            <RecorderDiagram
              holes={selected.holes}
              width={120}
              label={`${noteLabel(selected)} on ${INSTRUMENTS[instrument].short} recorder: ${describe(selected.holes)}`}
            />
            <div>
              <h2 style={{ fontSize: '2.4rem', margin: 0 }}>{noteLabel(selected)}</h2>
              <p className="fc-text" style={{ fontSize: '1.3rem' }}>{fingeringText(selected.holes)}</p>
              <p style={{ color: '#555', maxWidth: '380px', marginBottom: 0 }}>
                {OCTAVES.find((o) => o.id === selected.octave).label}: {describe(selected.holes)}.
              </p>
            </div>
          </div>
        </section>

        <div className="no-print" style={{ textAlign: 'right', marginBottom: '.75rem' }}>
          <Button type="button" basic size="small" className="fc-btn" icon labelPosition="left" onClick={() => window.print()}>
            <Icon name="print" />
            Print this chart
          </Button>
        </div>

        {OCTAVES.map((o) => (
          <div key={o.id} className="fc-octave" hidden={octave !== o.id}>
            <h2 className="fc-octave-title">{o.label} ({o.range})</h2>
            <div className="fc-grid">
              {NOTES_BY_OCTAVE[o.id].map((f) => (
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
                    width={70}
                    label={`${noteLabel(f)}, ${o.label.toLowerCase()}: ${describe(f.holes)}`}
                  />
                  <div className="fc-text">{fingeringText(f.holes)}</div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#2c3e50' }}>How to read this chart</h2>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
            <li><strong>Filled circle</strong> = cover the hole completely with the pad of your finger. <strong>Empty circle</strong> = leave it open.</li>
            <li><strong>T</strong> is the thumb hole on the back, covered by your left thumb. Your left hand covers holes 1-3 (index, middle, ring), your right hand covers holes 4-7 (index, middle, ring, little finger).</li>
            <li>Holes 6 and 7 are <Link href="/glossary#double-holes">double holes</Link>. A pair with one hole filled means cover only one hole of the pair.</li>
            <li>A <strong>half-filled thumb hole</strong> (<code>&frac12;</code> in the written fingering) means pinch it: slide your thumbnail into the hole so it is about half covered. The high octave uses this from E upward.</li>
            <li>The written fingering, such as <code>0 123 4&ndash;67</code>, lists the thumb (0), then holes 1-3, then holes 4-7. A dash means that hole is open.</li>
            <li>Notes with two names, such as {'C\u266f / D\u266d'}, are the same note and use the same fingering.</li>
          </ul>

          <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginTop: '2rem' }}>Low octave and high octave</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
            The low octave runs from the all-holes-covered C up to B. The high octave starts at the next C and climbs to the highest D, with different fingerings:
            the thumb hole is covered for the first high C, open for the next few notes, and pinched half open from E upward. Use the octave buttons above to switch between them.
          </p>

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
          style={{ background: '#e7f3ff', padding: '2.5rem 2rem', borderRadius: '12px', textAlign: 'center', marginTop: '3rem' }}
        >
          <h2 style={{ fontSize: '1.8rem', marginTop: 0, color: '#2c3e50' }}>Ready to go beyond the chart?</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 1.5rem', color: '#555' }}>
            Learn clean tone, breathing, and the upper register in live online lessons with Tali Rubinstein.
          </p>
          <Button as={Link} href="/lessons/beginner-recorder-lessons" primary size="large" className="fc-btn">
            Beginner recorder lessons
          </Button>
          <Button as={Link} href="/tutorials" basic size="large" className="fc-btn">
            Free tutorials
          </Button>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}

export default FingeringChart
