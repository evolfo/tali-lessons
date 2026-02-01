import React from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { PersonSchema, ServiceSchema } from '../../components/StructuredData'
import styles from '../../styles/LessonPage.module.css'

const BeginnerRecorderLessons = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the recorder a good instrument for beginners?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! The recorder is an excellent instrument for beginners. It\'s affordable, portable, and allows you to start making music quickly. You can learn basic melodies within your first few lessons.'
        }
      },
      {
        '@type': 'Question',
        name: 'What recorder should I buy as a beginner?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I recommend starting with a quality soprano (descant) recorder in plastic or wood. Brands like Yamaha, Aulos, and Mollenhauer offer excellent beginner instruments. I\'ll provide specific recommendations based on your budget during our first lesson.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does it take to learn recorder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most students can play simple melodies within 2-3 weeks and full songs within 2-3 months. However, mastering advanced techniques and baroque repertoire takes 1-2 years of consistent practice. Everyone progresses at their own pace.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need to read music for beginner recorder lessons?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No! I teach music reading as part of the lessons. We\'ll start with finger charts and simple notation, gradually building your music reading skills alongside your playing technique.'
        }
      }
    ]
  }

  return (
    <>
      <NextSeo
        title="Beginner Recorder Lessons Online | Learn Recorder from Scratch with Tali Rubinstein"
        description="Start your recorder journey with professional online lessons. Perfect for adult beginners and kids. Learn proper technique, music reading, and play beautiful melodies within weeks."
        canonical="https://www.talirecorderlessons.com/lessons/beginner-recorder-lessons"
        openGraph={{
          url: 'https://www.talirecorderlessons.com/lessons/beginner-recorder-lessons',
          title: 'Beginner Recorder Lessons Online | Professional Instruction',
          description: 'Learn recorder from a Berklee graduate. Online lessons for complete beginners. Start playing melodies in weeks, not months.',
          images: [
            {
              url: 'https://www.talirecorderlessons.com/img/about1.jpg',
              width: 1200,
              height: 630,
              alt: 'Tali Rubinstein teaching recorder',
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

      <div className={styles.lessonPage}>
        <div className={`${styles.lessonHero} ${styles.beginner}`}>
          <div className={styles.lessonHeroContent}>
            <h1>Beginner Recorder Lessons</h1>
            <p className={styles.lessonHeroSubtitle}>
              Start Your Musical Journey with Professional Online Instruction
            </p>
            <p className={styles.lessonHeroDescription}>
              Learn recorder from scratch with personalized lessons designed for complete beginners.
              No musical experience required.
            </p>
            <Link href="/book-bundle" className={`${styles.ctaButton} ${styles.beginner}`}>
              Book Your First Lesson
            </Link>
          </div>
        </div>

        <section className={styles.lessonContent}>
          <div className={styles.container}>
            <h2>Why Choose Beginner Recorder Lessons with Tali?</h2>

            <div className={styles.benefitsGrid}>
              <div className={`${styles.benefitCard} ${styles.beginner}`}>
                <h3>🎵 Professional Foundation</h3>
                <p>
                  Learn proper technique from the start. As a Berklee College of Music graduate
                  and professional performer, I teach you the right way to hold, breathe, and
                  articulate—avoiding bad habits that hold beginners back.
                </p>
              </div>

              <div className={`${styles.benefitCard} ${styles.beginner}`}>
                <h3>📚 Structured Curriculum</h3>
                <p>
                  My beginner program follows a proven progression: from your first notes to
                  complete melodies. Each lesson builds on the previous one, ensuring steady
                  progress without overwhelming you.
                </p>
              </div>

              <div className={`${styles.benefitCard} ${styles.beginner}`}>
                <h3>🎯 Personalized Approach</h3>
                <p>
                  Every student learns differently. I adapt my teaching style to your learning
                  pace, musical interests, and goals. Want to play folk songs? Baroque music?
                  We'll get there together.
                </p>
              </div>

              <div className={`${styles.benefitCard} ${styles.beginner}`}>
                <h3>💻 Online Convenience</h3>
                <p>
                  Learn from home with high-quality video lessons. See fingerings up close,
                  get instant feedback, and record sessions for practice. No commute required.
                </p>
              </div>
            </div>

            <h2>What You'll Learn in Beginner Lessons</h2>

            <div className={styles.curriculum}>
              <div className={`${styles.curriculumPhase} ${styles.beginner}`}>
                <h3>Phase 1: Foundation (Weeks 1-4)</h3>
                <ul>
                  <li><strong>Proper posture and hand position</strong> - Set yourself up for success</li>
                  <li><strong>Breath control and tone production</strong> - Create a beautiful sound</li>
                  <li><strong>First notes (B, A, G)</strong> - Start making music immediately</li>
                  <li><strong>Tonguing technique</strong> - Clean, articulate playing</li>
                  <li><strong>Reading simple notation</strong> - Understand what you're playing</li>
                  <li><strong>Your first melodies</strong> - Hot Cross Buns, Mary Had a Little Lamb, and more</li>
                </ul>
              </div>

              <div className={`${styles.curriculumPhase} ${styles.beginner}`}>
                <h3>Phase 2: Expansion (Weeks 5-8)</h3>
                <ul>
                  <li><strong>Extended range (Low C to High D)</strong> - More notes, more songs</li>
                  <li><strong>Rhythm reading</strong> - Quarter notes, half notes, whole notes</li>
                  <li><strong>Dynamics and expression</strong> - Play with feeling</li>
                  <li><strong>Folk and traditional songs</strong> - Build your repertoire</li>
                  <li><strong>Music theory basics</strong> - Understand what makes music work</li>
                </ul>
              </div>

              <div className={`${styles.curriculumPhase} ${styles.beginner}`}>
                <h3>Phase 3: Musicianship (Weeks 9-12)</h3>
                <ul>
                  <li><strong>Chromatic notes (sharps and flats)</strong> - Play in any key</li>
                  <li><strong>Phrasing and musicality</strong> - Sound like a musician, not just a note-reader</li>
                  <li><strong>Intermediate repertoire</strong> - Renaissance and Baroque pieces</li>
                  <li><strong>Performance skills</strong> - Play with confidence</li>
                  <li><strong>Practice techniques</strong> - How to practice effectively on your own</li>
                </ul>
              </div>
            </div>

            <h2>Who Are These Lessons For?</h2>

            <div className={styles.targetAudiences}>
              <div className={`${styles.audienceCard} ${styles.beginner}`}>
                <h3>Adult Beginners</h3>
                <p>
                  Never too late to start! Many of my students are adults discovering music for
                  the first time or returning after years away. The recorder is perfect for adult
                  learners—quick progress and beautiful repertoire.
                </p>
              </div>

              <div className={`${styles.audienceCard} ${styles.beginner}`}>
                <h3>Kids & Teens (Ages 8+)</h3>
                <p>
                  Young students love the recorder because they can make progress quickly. I keep
                  lessons fun and engaging while building solid technique that transfers to other
                  instruments.
                </p>
              </div>

              <div className={`${styles.audienceCard} ${styles.beginner}`}>
                <h3>Musicians Switching Instruments</h3>
                <p>
                  Already play another instrument? The recorder offers a unique sound and rich
                  early music repertoire. I'll help you transfer your musical knowledge while
                  learning recorder-specific techniques.
                </p>
              </div>

              <div className={`${styles.audienceCard} ${styles.beginner}`}>
                <h3>Music Teachers</h3>
                <p>
                  Want to incorporate recorder into your teaching? I can show you effective
                  techniques for teaching groups or individuals, plus resources for classroom use.
                </p>
              </div>
            </div>

            <h2>What Students Say</h2>

            <blockquote className={`${styles.testimonial} ${styles.beginner}`}>
              <p>
                "I'm 52 and always wanted to learn an instrument. Tali made it so easy and fun!
                Within a month I was playing songs I recognized. Her patience and clear explanations
                are perfect for adult beginners."
              </p>
              <cite>— Sarah M., Adult Beginner</cite>
            </blockquote>

            <blockquote className={`${styles.testimonial} ${styles.beginner}`}>
              <p>
                "My 10-year-old daughter loves her lessons with Tali. She's learned so much about
                music theory and technique, not just recorder. Tali knows how to keep kids engaged
                and excited about practicing."
              </p>
              <cite>— James K., Parent</cite>
            </blockquote>

            <h2>Getting Started</h2>

            <div className={styles.gettingStarted}>
              <div className={styles.step}>
                <div className={`${styles.stepNumber} ${styles.beginner}`}>1</div>
                <div className={styles.stepContent}>
                  <h3>Book Your First Lesson</h3>
                  <p>
                    Choose a 30 or 60-minute lesson at a time that works for you. We'll discuss
                    your goals and I'll assess your starting point.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={`${styles.stepNumber} ${styles.beginner}`}>2</div>
                <div className={styles.stepContent}>
                  <h3>Get Your Recorder</h3>
                  <p>
                    Don't have a recorder yet? No problem! I'll recommend the perfect instrument
                    for your budget and goals. You can find quality beginner recorders for $20-60.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={`${styles.stepNumber} ${styles.beginner}`}>3</div>
                <div className={styles.stepContent}>
                  <h3>Start Learning</h3>
                  <p>
                    We'll meet via Zoom and dive right in. By the end of your first lesson,
                    you'll be playing your first notes. I'll provide practice materials and
                    exercises to work on between lessons.
                  </p>
                </div>
              </div>
            </div>

            <h2>Frequently Asked Questions</h2>

            <div className={styles.faq}>
              <div className={`${styles.faqItem} ${styles.beginner}`}>
                <h3>Is the recorder a good instrument for beginners?</h3>
                <p>
                  Absolutely! The recorder is one of the best instruments for beginners. It's
                  affordable, portable, and allows you to start making music quickly. Unlike
                  many instruments that take months before you can play recognizable tunes,
                  recorder students often play simple melodies in their first few lessons.
                </p>
              </div>

              <div className={`${styles.faqItem} ${styles.beginner}`}>
                <h3>What recorder should I buy as a beginner?</h3>
                <p>
                  I recommend starting with a quality soprano (descant) recorder. For beginners,
                  a plastic Yamaha YRS-23 or Aulos 203 are excellent choices ($20-30). If you
                  want to invest in a wooden recorder, the Mollenhauer Student line ($60-100)
                  offers beautiful tone. I'll provide specific recommendations based on your
                  budget during our first lesson.
                </p>
              </div>

              <div className={`${styles.faqItem} ${styles.beginner}`}>
                <h3>How long does it take to learn recorder?</h3>
                <p>
                  You can play simple melodies within 2-3 weeks of starting lessons. Most students
                  can play full folk songs and easy classical pieces within 2-3 months. However,
                  mastering advanced techniques and baroque repertoire takes 1-2 years of consistent
                  practice. The recorder has depth that can last a lifetime!
                </p>
              </div>

              <div className={`${styles.faqItem} ${styles.beginner}`}>
                <h3>Do I need to read music?</h3>
                <p>
                  No! I teach music reading as part of the lessons. We'll start with finger charts
                  and very simple notation, gradually building your music reading skills alongside
                  your playing technique. By the end of the beginner phase, you'll be comfortable
                  reading standard music notation.
                </p>
              </div>

              <div className={`${styles.faqItem} ${styles.beginner}`}>
                <h3>How often should I practice?</h3>
                <p>
                  I recommend 15-20 minutes daily for beginners. Consistency matters more than
                  duration—daily short sessions are better than one long weekly session. I'll
                  teach you effective practice techniques so your practice time is productive.
                </p>
              </div>

              <div className={`${styles.faqItem} ${styles.beginner}`}>
                <h3>Can I learn recorder online?</h3>
                <p>
                  Yes! Online lessons are highly effective for recorder. The camera angle lets
                  you see fingerings clearly, and I can demonstrate techniques up close. Many
                  students actually prefer online lessons for the convenience and ability to
                  record sessions for later review.
                </p>
              </div>
            </div>

            <div className={`${styles.ctaSection} ${styles.beginner}`}>
              <h2>Ready to Start Your Recorder Journey?</h2>
              <p>
                Book your first beginner lesson today and discover how fun and rewarding the
                recorder can be. No experience necessary—just enthusiasm and a willingness to learn.
              </p>
              <Link href="/book-bundle" className={`${styles.ctaButton} ${styles.ctaButtonLarge} ${styles.beginner}`}>
                Book Your First Lesson Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export async function getStaticProps() {
  return { props: {} }
}

export default BeginnerRecorderLessons
