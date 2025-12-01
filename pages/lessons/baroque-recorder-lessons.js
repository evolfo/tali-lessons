import React from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { PersonSchema, ServiceSchema } from '../../components/StructuredData'
import styles from '../../styles/LessonPage.module.css'

const BaroqueRecorderLessons = () => {
  return (
    <>
      <NextSeo
        title="Baroque Recorder Lessons Online | Authentic Period Style with Tali Rubinstein"
        description="Master baroque recorder repertoire, ornamentation, and historically informed performance. Learn Handel, Telemann, Bach, and Vivaldi with expert online instruction."
        canonical="https://talirecorderlessons.com/lessons/baroque-recorder-lessons"
        openGraph={{
          url: 'https://talirecorderlessons.com/lessons/baroque-recorder-lessons',
          title: 'Baroque Recorder Lessons | Period Performance Expertise',
          description: 'Learn authentic baroque performance practice. Master ornamentation, articulation, and the great baroque repertoire for recorder.',
          images: [{
              url: 'https://talirecorderlessons.com/img/about1.jpg',
              width: 1200,
              height: 630,
              alt: 'Tali Rubinstein baroque recorder',
            }],
          type: 'website',
        }}
      />

      <PersonSchema />
      <ServiceSchema />

      <div className={styles.lessonPage}>
        <div className={`${styles.lessonHero} ${styles.baroque}`}>
          <div className={styles.lessonHeroContent}>
            <h1>Baroque Recorder Lessons</h1>
            <p className={styles.lessonHeroSubtitle}>
              Master the Golden Age of Recorder Music
            </p>
            <p className={styles.lessonHeroDescription}>
              Learn authentic baroque performance practice, ornamentation, and the magnificent repertoire of the 17th and 18th centuries
            </p>
            <Link href="/book-bundle" className={`${styles.ctaButton} ${styles.baroque}`}>
              Begin Your Baroque Journey
            </Link>
          </div>
        </div>

        <section className={styles.lessonContent}>
          <div className={styles.container}>
              <h2>The Recorder's Golden Era</h2>

              <p className={styles.leadText}>
                The baroque period was the recorder's heyday—when composers like Handel, Telemann, Bach, and Vivaldi wrote magnificent concerti, sonatas, and chamber works specifically for the instrument. Learn to play this incredible repertoire with historically informed technique and expressive interpretation.
              </p>

              <div className={styles.benefitsGrid}>
                <div className={`${styles.benefitCard} ${styles.baroque}`}>
                  <h3>🎼 Authentic Ornamentation</h3>
                  <p>
                    Master French, Italian, and German ornamentation styles. Learn trills, mordents, appoggiaturas, and diminutions in their proper historical context.
                  </p>
                </div>

                <div className={`${styles.benefitCard} ${styles.baroque}`}>
                  <h3>📖 Period Articulation</h3>
                  <p>
                    Discover baroque tonguing syllables, inequality, and rhetorical phrasing that brings this music to life with authentic expressiveness.
                  </p>
                </div>

                <div className={`${styles.benefitCard} ${styles.baroque}`}>
                  <h3>🎵 Great Repertoire</h3>
                  <p>
                    Work through the masterpieces: Handel sonatas, Telemann fantasias, Bach partita, Vivaldi concerti, and chamber music.
                  </p>
                </div>

                <div className={`${styles.benefitCard} ${styles.baroque}`}>
                  <h3>🏛️ Historical Context</h3>
                  <p>
                    Understand the theory of affects, rhetoric in music, and the cultural context that shaped baroque performance practice.
                  </p>
                </div>
              </div>

              <h2>What You'll Learn</h2>

              <div className={styles.curriculum}>
                <div className={`${styles.curriculumSection} ${styles.baroque}`}>
                  <h3>Baroque Technique</h3>
                  <ul>
                    <li>Period-appropriate fingerings and alternate fingerings for expressiveness</li>
                    <li>Baroque tonguing syllables and articulation patterns</li>
                    <li>Notes inégales (inequality) and swing feel</li>
                    <li>Vibrato usage in baroque style</li>
                    <li>Breath management for long baroque phrases</li>
                    <li>Dynamic shaping and terraced dynamics</li>
                  </ul>
                </div>

                <div className={`${styles.curriculumSection} ${styles.baroque}`}>
                  <h3>Ornamentation Mastery</h3>
                  <ul>
                    <li>French ornament tables (Hotteterre, Freillon-Poncein)</li>
                    <li>Italian diminutions and divisions (Dalla Casa, Rognoni)</li>
                    <li>German graces (C.P.E. Bach, Quantz)</li>
                    <li>Improvised ornamentation and embellishment</li>
                    <li>Cadential formulas and clausulae</li>
                    <li>Style-appropriate ornamentation choices</li>
                  </ul>
                </div>

                <div className={`${styles.curriculumSection} ${styles.baroque}`}>
                  <h3>Repertoire Study</h3>
                  <ul>
                    <li>Handel Sonatas (Op. 1 collection)</li>
                    <li>Telemann Fantasias and Sonatas</li>
                    <li>Bach Partita in A minor BWV 1013</li>
                    <li>Vivaldi Concerti (RV 441, RV 443, etc.)</li>
                    <li>Van Eyck Der Fluyten Lust-hof</li>
                    <li>English, French, and Italian chamber music</li>
                  </ul>
                </div>

                <div className={`${styles.curriculumSection} ${styles.baroque}`}>
                  <h3>Performance Practice</h3>
                  <ul>
                    <li>Continuo realization and figured bass understanding</li>
                    <li>Ensemble playing and consort skills</li>
                    <li>Affect theory and rhetoric in performance</li>
                    <li>Tempo choices and tempo relationships</li>
                    <li>Dance forms and their characteristics</li>
                    <li>Preparing period-style performances</li>
                  </ul>
                </div>
              </div>

              <h2>Repertoire Levels</h2>

              <div className={styles.repertoireLevels}>
                <div className={`${styles.levelCard} ${styles.baroque}`}>
                  <h3>Intermediate Baroque</h3>
                  <p><strong>Ready to start if you can:</strong> Play scales fluently, read music comfortably, handle basic ornaments</p>
                  <ul>
                    <li>Simple Handel movements</li>
                    <li>Telemann easy sonatas</li>
                    <li>English and French dances</li>
                    <li>Simple van Eyck pieces</li>
                  </ul>
                </div>

                <div className={`${styles.levelCard} ${styles.baroque}`}>
                  <h3>Advanced Baroque</h3>
                  <p><strong>Ready to start if you can:</strong> Handle complex fingerings, execute ornaments, play advanced repertoire</p>
                  <ul>
                    <li>Complete Handel sonatas</li>
                    <li>Telemann Fantasias</li>
                    <li>Bach Partita</li>
                    <li>Vivaldi Concerti with orchestra</li>
                  </ul>
                </div>
              </div>

              <h2>Why Learn Baroque Recorder?</h2>

              <div className={styles.whyBaroque}>
                <p>
                  The baroque era produced the greatest recorder repertoire ever written. These works showcase the instrument's expressive capabilities, technical demands, and musical sophistication. Whether you're interested in historically informed performance or simply love beautiful music, the baroque repertoire offers endless rewards.
                </p>
                <p>
                  Unlike many instruments whose "old music" feels dated, the recorder's baroque repertoire remains vital and moving. A well-played Handel sonata or Vivaldi concerto still captivates modern audiences with its emotional depth and virtuosic brilliance.
                </p>
              </div>

              <h2>Student Testimonials</h2>

              <blockquote className={`${styles.testimonial} ${styles.baroque}`}>
                <p>
                  "Tali's knowledge of baroque ornamentation transformed how I approach this music. She explains not just what ornaments to use, but why—the historical context makes everything click."
                </p>
                <cite>— Margaret L., Early Music Enthusiast</cite>
              </blockquote>

              <blockquote className={`${styles.testimonial} ${styles.baroque}`}>
                <p>
                  "I've been playing recorder for years but always struggled with making baroque music expressive. Tali taught me about affects, rhetoric, and articulation. Now my playing has real character and feeling."
                </p>
                <cite>— Thomas K., Amateur Musician</cite>
              </blockquote>

              <div className={`${styles.ctaSection} ${styles.baroque}`}>
                <h2>Ready to Master Baroque Recorder?</h2>
                <p>
                  Whether you're preparing for early music ensemble work, building your solo repertoire, or simply love baroque music, these lessons will deepen your understanding and elevate your performance.
                </p>
              <Link href="/book-bundle" className={`${styles.ctaButton} ${styles.ctaButtonLarge} ${styles.baroque}`}>
                  Book Your Baroque Lesson
                </Link>
              </div>
            </div>
          </section>
        </div>
      </>
    )
  }

export default BaroqueRecorderLessons
