import React from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { Container } from 'semantic-ui-react'
import { PersonSchema, ServiceSchema } from '../components/StructuredData'

const FAQ = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much do recorder lessons cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tali Rubinstein offers online recorder lessons: $95 for 45 minutes or $105 for 60 minutes. Package bundles provide savings: 5-lesson package $498.75 (5% off), 10-lesson package $976.50 (7% off), 20-lesson package $1,890 (10% off).'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the best recorder for beginners?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best beginner recorders are: Yamaha YRS-23 ($20-25) - excellent plastic soprano recorder; Aulos 203 ($20-30) - warm tone, durable; Mollenhauer Student ($60-100) - wooden option for better sound. Start with a soprano (descant) recorder in C.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does it take to learn recorder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Learning timeline: 2-3 weeks for simple melodies, 2-3 months for folk songs and easy classical pieces, 6-12 months for intermediate baroque repertoire, 1-2 years for advanced technique and complex pieces. Daily 15-20 minute practice accelerates progress.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is recorder hard to learn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, the recorder is one of the easiest instruments to start. You can play your first notes in minutes. Basic melodies come within weeks. However, mastering advanced techniques, baroque ornamentation, and professional repertoire requires dedicated practice like any instrument.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can adults learn recorder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Adults often learn recorder faster than children due to better focus and understanding. Many adult beginners play recognizable songs within a month. The recorder is perfect for adults wanting to learn music - it\'s affordable, portable, and offers beautiful baroque and contemporary repertoire.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need to read music to learn recorder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No prior music reading is required. Recorder lessons teach music reading alongside playing technique. Students start with finger charts and simple notation, gradually building reading skills. Most students read standard notation comfortably within 3-6 months.'
        }
      },
      {
        '@type': 'Question',
        name: 'What age should you start recorder lessons?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Age 8+ is ideal for recorder lessons. At this age, children have sufficient hand coordination, attention span, and instruction-following ability. Some advanced 7-year-olds can start earlier. Adults can start at any age - it\'s never too late to learn recorder.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are online recorder lessons effective?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, online recorder lessons are highly effective. Camera angles show fingerings clearly, demonstrations are up-close, and students can record sessions for practice review. Many students prefer online lessons for convenience, scheduling flexibility, and ability to learn from expert teachers anywhere.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often should I practice recorder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Practice recommendations: Beginners: 15-20 minutes daily; Intermediate: 20-30 minutes daily; Advanced: 30-60 minutes daily. Consistency matters more than duration. Daily short sessions are more effective than one long weekly session. Quality practice with focus beats mindless repetition.'
        }
      },
      {
        '@type': 'Question',
        name: 'What styles of music can you play on recorder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Recorder repertoire includes: Baroque (Handel, Bach, Vivaldi, Telemann), Renaissance (dance music, consort pieces), Folk and traditional songs, Jazz and improvisation, Contemporary classical, Pop arrangements, Latin styles (bossa nova, samba), World music. The recorder is surprisingly versatile!'
        }
      }
    ]
  }

  return (
    <>
      <NextSeo
        title="Recorder Lessons FAQ | Common Questions Answered - Tali Rubinstein"
        description="Get answers to common recorder lesson questions: costs, best beginner recorders, learning timeline, online lesson effectiveness, and more. Expert answers from professional recorder teacher Tali Rubinstein."
        canonical="https://www.talirecorderlessons.com/faq"
        openGraph={{
          url: 'https://www.talirecorderlessons.com/faq',
          title: 'Recorder Lessons FAQ | Common Questions Answered',
          description: 'Everything you need to know about learning recorder: lesson costs, best instruments for beginners, learning timeline, and expert teaching approaches.',
          images: [
            {
              url: 'https://www.talirecorderlessons.com/img/about1.jpg',
              width: 1200,
              height: 630,
              alt: 'Tali Rubinstein Recorder Teacher',
            }
          ],
          type: 'website',
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PersonSchema />
      <ServiceSchema />

      <Container style={{ marginTop: '6rem', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
          Recorder Lessons FAQ
        </h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
          Common questions about learning recorder, answered by professional teacher Tali Rubinstein
        </p>

        {/* Table of Contents */}
        <div style={{
          background: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '3rem',
          border: '2px solid #e9ecef'
        }}>
          <h2 style={{ marginTop: 0, fontSize: '1.5rem', marginBottom: '1rem' }}>Quick Navigation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Getting Started</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="#cost">How much do lessons cost?</a></li>
                <li><a href="#best-recorder">Best recorder for beginners</a></li>
                <li><a href="#timeline">How long to learn?</a></li>
                <li><a href="#difficulty">Is recorder hard to learn?</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Learning Approach</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="#adults">Can adults learn recorder?</a></li>
                <li><a href="#read-music">Do I need to read music?</a></li>
                <li><a href="#age">What age to start?</a></li>
                <li><a href="#online">Are online lessons effective?</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Practice & Style</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="#practice">How often to practice?</a></li>
                <li><a href="#styles">What music styles?</a></li>
                <li><a href="#equipment">What equipment needed?</a></li>
                <li><a href="#transfer">Do skills transfer?</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Question 1 */}
          <div id="cost" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              How much do recorder lessons cost?
            </h2>
            
            <div style={{ background: '#e7f3ff', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '2px solid #667eea' }}>
              <h3 style={{ marginTop: 0, fontSize: '1.5rem', color: '#2c3e50', marginBottom: '1rem' }}>
                🎵 Tali Rubinstein's Lesson Pricing
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0' }}>
                <thead>
                  <tr style={{ background: '#667eea', color: 'white' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #667eea' }}>Lesson Package</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #667eea' }}>Duration</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #667eea' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Single Lesson</td>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>45 minutes</td>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>$95</strong></td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Single Lesson</td>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>60 minutes</td>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>$105</strong></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>5-Lesson Package</td>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>60 minutes each</td>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>$498.75</strong> (5% savings)</td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>10-Lesson Package</td>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>60 minutes each</td>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>$976.50</strong> (7% savings)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>20-Lesson Package</td>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>60 minutes each</td>
                    <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>$1,890</strong> (10% savings)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
              All lessons are conducted online via video call. Tali offers <strong>45-minute and 60-minute lessons</strong>, 
              with lesson packages providing increasing discounts for larger commitments. <Link href="/book-bundle">View all packages and book your lesson</Link>.
            </p>

            {/* General Market Pricing section removed per request */}
          </div>

          {/* Question 2 */}
          <div id="best-recorder" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              What is the best recorder for beginners?
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Recorder Model</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Price</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Yamaha YRS-23</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>$20-25</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Budget-conscious beginners, kids</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Aulos 203 Robin</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>$20-30</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Warm tone, very durable</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Mollenhauer Student</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>$60-100</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Adults, serious students, wooden option</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Zen-On 2300</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>$25-35</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Excellent quality-to-price ratio</td>
                </tr>
              </tbody>
            </table>
            <div style={{ background: '#e7f3ff', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', margin: 0 }}>
                <strong>🎵 Recommendation:</strong> Start with a <strong>soprano (descant) recorder in C</strong>.
                Plastic recorders are ideal for beginners - they're affordable, durable, and sound good.
                Wooden recorders offer warmer tone but require more care and maintenance.
              </p>
            </div>
          </div>

          {/* Question 3 */}
          <div id="timeline" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              How long does it take to learn recorder?
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Time Period</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>What You Can Play</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>1-2 weeks</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>First notes, very simple melodies (Hot Cross Buns, Mary Had a Little Lamb)</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>2-3 months</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Folk songs, easy classical pieces, basic music reading</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>6-12 months</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Intermediate baroque pieces, chromatic notes, simple ornamentation</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>1-2 years</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Advanced repertoire (Handel sonatas, Bach), complex techniques</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>2+ years</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Professional-level performance, virtuosic pieces, advanced ornamentation</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              <strong>Key factor:</strong> Consistent daily practice (15-30 minutes) dramatically accelerates progress.
              Students who practice daily advance 3-4 times faster than those practicing sporadically.
            </p>
          </div>

          {/* Question 4 */}
          <div id="difficulty" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              Is recorder hard to learn?
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
              <strong>No, the recorder is one of the easiest instruments to start.</strong> Here's why:
            </p>
            <ol style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              <li><strong>Immediate sound:</strong> You can produce your first notes in minutes, unlike instruments that take weeks to make a pleasant sound (violin, oboe, brass instruments).</li>
              <li><strong>Simple fingerings:</strong> Basic notes use straightforward finger patterns that are easy to memorize.</li>
              <li><strong>Affordable start:</strong> Quality beginner instruments cost $20-30, removing financial barriers.</li>
              <li><strong>Quick progress:</strong> Most students play recognizable melodies within 2-3 weeks.</li>
              <li><strong>Portable:</strong> Easy to practice anywhere, anytime.</li>
            </ol>
            <div style={{ background: '#fff3cd', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem', border: '1px solid #ffc107' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', margin: 0 }}>
                <strong>However:</strong> While <em>starting</em> is easy, <em>mastering</em> the recorder requires dedication.
                Advanced baroque ornamentation, virtuosic technique, and professional-level performance take years of practice -
                just like any serious instrument.
              </p>
            </div>
          </div>

          {/* Question 5 */}
          <div id="adults" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              Can adults learn recorder?
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
              <strong>Absolutely! Adults often learn recorder faster than children.</strong> Here's why the recorder is perfect for adult learners:
            </p>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              <li><strong>Better focus:</strong> Adults can concentrate for longer periods and practice more efficiently.</li>
              <li><strong>Faster comprehension:</strong> Music theory and concepts click more quickly for adult learners.</li>
              <li><strong>Quick satisfaction:</strong> Many adults play recognizable songs within their first month.</li>
              <li><strong>Beautiful repertoire:</strong> Baroque and Renaissance music offers sophisticated, rewarding pieces.</li>
              <li><strong>Low pressure:</strong> Learn at your own pace without performance anxiety.</li>
              <li><strong>Brain benefits:</strong> Learning music as an adult improves memory, coordination, and cognitive function.</li>
            </ul>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', fontStyle: 'italic' }}>
              Many of my students are adults in their 40s, 50s, 60s, and beyond who are discovering music for the first time
              or returning after decades away. It's never too late to start!
            </p>
          </div>

          {/* Question 6 */}
          <div id="read-music" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              Do I need to read music to learn recorder?
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
              <strong>No prior music reading required!</strong> Recorder lessons teach music reading alongside playing technique.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Timeline</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Reading Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Week 1-2</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Finger charts, note names (B, A, G)</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Month 1-2</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Simple staff notation, basic rhythms</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Month 3-6</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Standard notation, all notes, rhythm variations</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>6+ months</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Fluent sight-reading, dynamics, articulation</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginTop: '1rem' }}>
              Learning to read music <em>while</em> learning recorder is actually easier than learning notation separately.
              You immediately apply what you learn, making it stick faster.
            </p>
          </div>

          {/* Question 7 */}
          <div id="age" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              What age should you start recorder lessons?
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Age Range</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Recommended?</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Under 7</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Usually too young</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Hand coordination and attention span still developing</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>7-8</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Possible</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Depends on individual child's maturity and interest</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>8-17</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Ideal</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Good coordination, focus, follows instructions well</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>18+</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Excellent</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Adults learn efficiently, never too late to start!</td>
                </tr>
              </tbody>
            </table>
            <div style={{ background: '#e7f3ff', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', margin: 0 }}>
                <strong>Bottom line:</strong> Age 8+ is ideal for children. Adults can start at any age -
                I have students in their 60s and 70s who are thriving!
              </p>
            </div>
          </div>

          {/* Question 8 */}
          <div id="online" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              Are online recorder lessons effective?
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
              <strong>Yes! Online recorder lessons are highly effective - often more so than in-person.</strong> Here's why:
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Advantage</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Why It Works</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Clear fingering view</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Camera angle shows fingers up close, clearer than in-person</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Session recording</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Review lessons anytime for perfect practice reference</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Scheduling flexibility</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>No commute, easier to fit into busy schedules</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Access to specialists</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Learn from expert teachers anywhere in the world</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Comfortable environment</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Learn from home, less performance anxiety</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Digital resources</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Easy sharing of sheet music, backing tracks, exercises</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              Many students actually <em>prefer</em> online lessons. The sound quality is excellent with modern microphones,
              and the visual clarity often surpasses in-person instruction.
            </p>
          </div>

          {/* Question 9 */}
          <div id="practice" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              How often should I practice recorder?
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Level</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Daily Practice</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Weekly Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Beginner</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>15-20 minutes</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>1.75-2.3 hours</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Intermediate</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>20-30 minutes</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>2.3-3.5 hours</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Advanced</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>30-60 minutes</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>3.5-7 hours</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Professional</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>1-2+ hours</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>7-14+ hours</td>
                </tr>
              </tbody>
            </table>
            <div style={{ background: '#d4edda', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem', border: '1px solid #28a745' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#155724', margin: 0 }}>
                <strong>Key Principle:</strong> Consistency beats duration. Daily 15-minute sessions are FAR more effective
                than one weekly 90-minute marathon. Your brain and muscle memory develop through regular, spaced repetition.
              </p>
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginTop: '1rem' }}>
              <strong>Practice tips:</strong>
            </p>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              <li>Same time each day builds habit</li>
              <li>Quality over quantity - focused practice beats mindless repetition</li>
              <li>Start slow, increase gradually</li>
              <li>Break practice into sections (technique, pieces, sight-reading)</li>
              <li>Take breaks if frustrated - come back fresh</li>
            </ul>
          </div>

          {/* Question 10 */}
          <div id="styles" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              What styles of music can you play on recorder?
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
              The recorder is surprisingly versatile! Here's what you can play:
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Music Style</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Baroque</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Handel sonatas, Bach partita, Telemann fantasias, Vivaldi concerti</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Renaissance</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Dance music, consort pieces, van Eyck divisions</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Folk & Traditional</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Irish jigs, Scottish reels, English folk songs, American traditional</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Jazz</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Standards, improvisation, bebop (with specialized instruction)</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Latin</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Bossa nova, samba, tango, son montuno</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Contemporary Classical</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>20th/21st century compositions, extended techniques</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>Pop Arrangements</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Movie themes, popular songs adapted for recorder</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}><strong>World Music</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Klezmer, flamenco, Celtic, Asian traditional</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              The recorder's baroque repertoire alone provides a lifetime of beautiful, challenging music.
              But modern players are expanding the instrument's range into jazz, contemporary classical, and popular music.
            </p>
          </div>

          {/* Additional Questions */}
          <div id="equipment" style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e9ecef' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              What equipment do I need for recorder lessons?
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Item</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Cost</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Required?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Recorder (soprano)</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>$20-100</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>✅ Required</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Music stand</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>$15-40</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Recommended</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Metronome app</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Free</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>Recommended</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>For online lessons: Computer/tablet with camera</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>N/A</td>
                  <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>✅ Required for online</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              <strong>Total startup cost:</strong> $40-150 for everything you need to begin.
            </p>
          </div>

          <div id="transfer" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '1rem' }}>
              Do recorder skills transfer to other instruments?
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '1rem' }}>
              <strong>Yes! Recorder builds fundamental musical skills that transfer beautifully to other instruments:</strong>
            </p>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              <li><strong>Music reading:</strong> Treble clef reading transfers directly to flute, violin, oboe</li>
              <li><strong>Breath control:</strong> Essential foundation for all wind instruments</li>
              <li><strong>Finger dexterity:</strong> Helps with woodwinds, piano, guitar</li>
              <li><strong>Ear training:</strong> Pitch recognition benefits all instruments</li>
              <li><strong>Music theory:</strong> Applies universally to any instrument</li>
              <li><strong>Rhythm skills:</strong> Transfers to all music-making</li>
            </ul>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', fontStyle: 'italic' }}>
              Many professional flutists, oboists, and clarinetists started on recorder. It's an excellent foundation instrument
              for children who may want to switch to band instruments later.
            </p>
          </div>

        </div>

        {/* CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
          padding: '3rem 2rem',
          borderRadius: '12px',
          textAlign: 'center',
          marginTop: '4rem'
        }}>
          <h2 style={{ fontSize: '2rem', marginTop: 0 }}>Ready to Start Your Recorder Journey?</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Get personalized instruction from professional teacher Tali Rubinstein.
            Book your first lesson today and start making music!
          </p>
          <Link
            href="/book-bundle"
            style={{
              display: 'inline-block',
              background: '#667eea',
              color: 'white',
              padding: '1.25rem 3rem',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '1.2rem',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s'
            }}
          >
            Book Your First Lesson
          </Link>
        </div>

      </Container>
    </>
  )
}

export default FAQ
