import React from 'react'
import Link from 'next/link'
import { formatUSD, lessonPackages, singleLessons } from '../lib/pricing'

// Visible price table. Prices come from data/products.js via lib/pricing.js,
// so this always matches checkout and the Offer structured data.
const wrap = { maxWidth: '1000px', margin: '3rem auto', padding: '0 1rem' }
const table = { width: '100%', borderCollapse: 'collapse', margin: '1rem 0', fontSize: '1.05rem' }
const cell = { padding: '.7rem .9rem', borderBottom: '1px solid #e9ecef', textAlign: 'left' }
const head = { ...cell, background: '#f4f7fb', fontWeight: 700 }
const button = {
  display: 'inline-block', padding: '.8rem 1.6rem', borderRadius: '8px', background: '#2b77c4',
  color: '#fff', fontWeight: 700, textDecoration: 'none', marginRight: '.75rem', marginTop: '.5rem',
}

const LessonPricing = ({ heading = 'Online Recorder Lesson Prices' }) => (
  <section aria-labelledby="lesson-pricing-heading" style={wrap}>
    <h2 id="lesson-pricing-heading" style={{ fontSize: '1.6rem' }}>{heading}</h2>
    <p style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
      Private one-to-one lessons with Tali Rubinstein over live video. A single lesson costs{' '}
      <strong>{formatUSD(singleLessons[0].price)} for {singleLessons[0].minutes} minutes</strong> or{' '}
      <strong>{formatUSD(singleLessons[1].price)} for {singleLessons[1].minutes} minutes</strong>. Lesson
      packages lower the price per lesson.
    </p>
    <div style={{ overflowX: 'auto' }}>
      <table style={table}>
        <caption style={{ captionSide: 'bottom', textAlign: 'left', padding: '.5rem 0', color: '#555', fontSize: '.95rem' }}>
          Prices in US dollars. Packages are 60-minute lessons.
        </caption>
        <thead>
          <tr>
            <th scope="col" style={head}>Lesson</th>
            <th scope="col" style={head}>Price</th>
            <th scope="col" style={head}>Per lesson</th>
          </tr>
        </thead>
        <tbody>
          {singleLessons.map((l) => (
            <tr key={l.id}>
              <th scope="row" style={{ ...cell, fontWeight: 600 }}>{l.minutes}-minute lesson</th>
              <td style={cell}>{formatUSD(l.price)}</td>
              <td style={cell}>{formatUSD(l.price)}</td>
            </tr>
          ))}
          {lessonPackages.map((p) => (
            <tr key={p.id}>
              <th scope="row" style={{ ...cell, fontWeight: 600 }}>
                {p.count} lessons (60 min each), {p.discountPercent}% off
              </th>
              <td style={cell}>{formatUSD(p.price)}</td>
              <td style={cell}>{formatUSD(p.perLesson)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Link href="/book-lesson" style={button}>Book a single lesson</Link>
    <Link href="/book-bundle" style={{ ...button, background: '#fff', color: '#2b77c4', border: '2px solid #2b77c4' }}>
      See lesson packages
    </Link>
  </section>
)

export default LessonPricing
