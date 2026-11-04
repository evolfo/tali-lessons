import React from 'react'
import Link from 'next/link'

// Internal links between the lesson pages and the site's key resources.
// Used on the homepage, every lesson page, and the end of blog posts: these
// pages previously linked nowhere but the footer, which left the lesson
// pages (the ones that should rank) without internal link support.
export const LESSON_PATHS = [
  { href: '/lessons/beginner-recorder-lessons', title: 'Beginner lessons', text: 'Start from scratch. No prior music reading required.' },
  { href: '/lessons/kids-recorder-lessons', title: 'Kids lessons', text: 'Age-appropriate lessons for young students, typically ages 8 and up.' },
  { href: '/lessons/baroque-recorder-lessons', title: 'Baroque lessons', text: 'Handel, Bach, Vivaldi, Telemann, ornamentation, and historically informed technique.' },
  { href: '/lessons/advanced-recorder-lessons', title: 'Advanced lessons', text: 'Virtuosic technique, jazz improvisation, and pre-professional preparation.' },
]

const RESOURCES = [
  { href: '/faq', title: 'Recorder lessons FAQ', text: 'Costs, which recorder to buy, and how long it takes to learn.' },
  { href: '/which-recorder-to-buy', title: 'Which recorder to buy', text: 'Soprano vs alto, plastic vs wood, and what a beginner needs.' },
  { href: '/glossary', title: 'Recorder glossary', text: 'Recorder terms and techniques in plain English.' },
  { href: '/tutorials', title: 'Free tutorials', text: 'Short video lessons on the fundamentals.' },
]

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', margin: '1rem 0 0', padding: 0, listStyle: 'none' }
const card = { display: 'block', height: '100%', padding: '1rem 1.25rem', border: '2px solid #e9ecef', borderRadius: '10px', background: '#fff', color: 'inherit', textDecoration: 'none' }

const Cards = ({ items }) => (
  <ul style={grid}>
    {items.map((item) => (
      <li key={item.href}>
        <Link href={item.href} style={card}>
          <strong style={{ display: 'block', color: '#2b77c4', fontSize: '1.1rem', marginBottom: '.25rem' }}>{item.title}</strong>
          <span style={{ color: '#555', fontSize: '.95rem', lineHeight: 1.5 }}>{item.text}</span>
        </Link>
      </li>
    ))}
  </ul>
)

/**
 * variant="home":    heading + intro for the homepage
 * variant="related": compact block for lesson pages and blog posts; `current`
 *                    hides the page you are already on.
 */
const LessonPaths = ({ variant = 'related', current }) => {
  const lessons = LESSON_PATHS.filter((p) => p.href !== current)
  const isHome = variant === 'home'

  return (
    <section
      aria-labelledby="lesson-paths-heading"
      style={{ maxWidth: '1000px', margin: isHome ? '3rem auto' : '3rem auto 2rem', padding: '0 1rem' }}
    >
      <h2 id="lesson-paths-heading" style={{ fontSize: isHome ? '2rem' : '1.6rem', textAlign: isHome ? 'center' : 'left' }}>
        {isHome ? 'Online Recorder Lessons for Every Level' : 'Explore more recorder lessons'}
      </h2>
      {isHome && (
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
          Live one-to-one video lessons over Zoom, 45 or 60 minutes, for adults and for children.
          Choose the path that fits where you are today:
        </p>
      )}
      <Cards items={lessons} />
      <h3 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>Helpful resources</h3>
      <Cards items={RESOURCES} />
    </section>
  )
}

export default LessonPaths
