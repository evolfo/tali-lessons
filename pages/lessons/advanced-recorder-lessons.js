import React from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { PersonSchema, ServiceSchema } from '../../components/StructuredData'
import styles from '../../styles/LessonPage.module.css'

const AdvancedRecorderLessons = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes advanced recorder playing different from intermediate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Advanced recorder playing involves mastering extended techniques, virtuosic passages, complex ornamentation, and professional-level interpretation. You\'ll work on consort playing, improvisation, and repertoire from Renaissance divisions to contemporary music.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you teach jazz and contemporary recorder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! As a Berklee graduate with extensive jazz and contemporary experience, I specialize in teaching jazz improvisation, Latin styles, and modern techniques on recorder. This includes electric recorder, extended techniques, and genre-crossing approaches.'
        }
      }
    ]
  }

  return (
    <>
      <NextSeo
        title="Advanced Recorder Lessons Online | Master-Level Instruction with Tali Rubinstein"
        description="Elevate your recorder playing to professional levels. Learn virtuosic technique, jazz improvisation, baroque ornamentation, and contemporary styles from a Berklee graduate and performing artist."
        canonical="https://www.talirecorderlessons.com/lessons/advanced-recorder-lessons"
        openGraph={{
          url: 'https://www.talirecorderlessons.com/lessons/advanced-recorder-lessons',
          title: 'Advanced Recorder Lessons | Professional Instruction',
          description: 'Master-level recorder instruction in baroque, jazz, and contemporary styles. Learn from a professional performer and Berklee College graduate.',
          images: [
            {
              url: 'https://www.talirecorderlessons.com/img/about1.jpg',
              width: 1200,
              height: 630,
              alt: 'Tali Rubinstein performing',
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
        <div className={`${styles.lessonHero} ${styles.advanced}`}>
          <div className={styles.lessonHeroContent}>
            <h1>Advanced Recorder Lessons</h1>
            <p className={styles.lessonHeroSubtitle}>
              Master-Level Instruction for Serious Musicians
            </p>
            <p className={styles.lessonHeroDescription}>
              Push your boundaries with virtuosic technique, advanced repertoire, and professional performance skills
            </p>
            <Link href="/book-bundle" className={`${styles.ctaButton} ${styles.advanced}`}>
              Schedule Advanced Coaching
            </Link>
          </div>
        </div>

        <section className={styles.lessonContent}>
          <div className={styles.container}>
              <h2>Take Your Playing to the Next Level</h2>

              <p className={styles.leadText}>
                You've mastered the basics. You can play baroque sonatas, navigate complex fingerings,
                and understand ornamentation. Now it's time to refine your artistry, expand your
                technique, and explore new musical territories.
              </p>

              <div className={styles.benefitsGrid}>
                <div className={`${styles.benefitCard} ${styles.advanced}`}>
                  <h3>🎼 Professional Repertoire</h3>
                  <p>
                    Master demanding works from Bach to contemporary composers. We'll work on
                    virtuosic passages, complex ornamentation, and performance-ready interpretation.
                  </p>
                </div>

                <div className={`${styles.benefitCard} ${styles.advanced}`}>
                  <h3>🎺 Jazz & Improvisation</h3>
                  <p>
                    Unique specialty: Learn jazz improvisation on recorder. As a Berklee graduate,
                    I'll teach you jazz theory, Latin styles, and how to improvise with confidence.
                  </p>
                </div>

                <div className={`${styles.benefitCard} ${styles.advanced}`}>
                  <h3>🔧 Extended Techniques</h3>
                  <p>
                    Explore contemporary techniques: multiphonics, flutter tonguing, glissandi,
                    circular breathing. Electric recorder, effects pedals, and modern approaches.
                  </p>
                </div>

                <div className={`${styles.benefitCard} ${styles.advanced}`}>
                  <h3>🎯 Performance Coaching</h3>
                  <p>
                    Prepare for auditions, recitals, or recordings. Get feedback from a professional
                    performer who understands what it takes to succeed on stage.
                  </p>
                </div>
              </div>

              <h2>Advanced Curriculum</h2>

              <div className={styles.curriculum}>
                <div className={`${styles.curriculumSection} ${styles.advanced}`}>
                  <h3>Virtuosic Technique</h3>
                  <ul>
                    <li>Advanced articulation patterns and double/triple tonguing</li>
                    <li>Rapid passagework and virtuosic divisions</li>
                    <li>Extended range techniques (high register control)</li>
                    <li>Complex rhythm execution and syncopation</li>
                    <li>Breath management for long phrases and sustained notes</li>
                    <li>Microtonality and pitch bending</li>
                  </ul>
                </div>

                <div className={`${styles.curriculumSection} ${styles.advanced}`}>
                  <h3>Baroque Mastery</h3>
                  <ul>
                    <li>French, Italian, and German ornamentation styles</li>
                    <li>Diminution and division practice</li>
                    <li>Rhetorical interpretation and affect theory</li>
                    <li>Consort playing and ensemble skills</li>
                    <li>Period-appropriate fingerings and articulation</li>
                    <li>Major concerti and sonata repertoire</li>
                  </ul>
                </div>

                <div className={`${styles.curriculumSection} ${styles.advanced}`}>
                  <h3>Jazz & Contemporary</h3>
                  <ul>
                    <li>Jazz theory: scales, modes, chord progressions</li>
                    <li>Improvisation techniques and language</li>
                    <li>Latin styles: bossa nova, samba, son montuno</li>
                    <li>Electric recorder and effects</li>
                    <li>Loop pedals and live performance setups</li>
                    <li>Contemporary music reading and interpretation</li>
                  </ul>
                </div>

                <div className={`${styles.curriculumSection} ${styles.advanced}`}>
                  <h3>Professional Development</h3>
                  <ul>
                    <li>Audition preparation and performance psychology</li>
                    <li>Recording techniques and studio skills</li>
                    <li>Program building and recital planning</li>
                    <li>Career development for recorder players</li>
                    <li>Teaching methodology (if interested in pedagogy)</li>
                    <li>Marketing yourself as a performer</li>
                  </ul>
                </div>
              </div>

              <h2>Advanced Repertoire We'll Explore</h2>

              <div className={styles.repertoireSection}>
                <div className={`${styles.repertoireCategory} ${styles.advanced}`}>
                  <h3>Baroque & Renaissance</h3>
                  <ul>
                    <li>Telemann Fantasias</li>
                    <li>Bach Partita in A minor</li>
                    <li>Handel Sonatas</li>
                    <li>Van Eyck Der Fluyten Lust-hof divisions</li>
                    <li>Vivaldi Concerti</li>
                    <li>French and Italian virtuosic sonatas</li>
                  </ul>
                </div>

                <div className={`${styles.repertoireCategory} ${styles.advanced}`}>
                  <h3>20th & 21st Century</h3>
                  <ul>
                    <li>Berio Gesti</li>
                    <li>Makoto Shinohara Fragmente</li>
                    <li>Hans-Martin Linde compositions</li>
                    <li>Contemporary composers' works</li>
                    <li>Jazz standards adapted for recorder</li>
                    <li>Original compositions and arrangements</li>
                  </ul>
                </div>
              </div>

              <h2>Who Are Advanced Lessons For?</h2>

              <div className={styles.targetAudiences}>
                <div className={`${styles.audienceCard} ${styles.advanced}`}>
                  <h3>Conservatory Students</h3>
                  <p>
                    Preparing for exams, juries, or graduate programs? I provide focused coaching
                    on technique, repertoire, and performance skills to help you excel.
                  </p>
                </div>

                <div className={`${styles.audienceCard} ${styles.advanced}`}>
                  <h3>Professional Musicians</h3>
                  <p>
                    Already performing but want to expand your skills? Learn jazz improvisation,
                    explore new repertoire, or refine your baroque ornamentation.
                  </p>
                </div>

                <div className={`${styles.audienceCard} ${styles.advanced}`}>
                  <h3>Intermediate Players Ready to Advance</h3>
                  <p>
                    You've been playing for a while and want to take the leap to advanced playing.
                    I'll help you develop the technique and musicianship to tackle professional repertoire.
                  </p>
                </div>

                <div className={`${styles.audienceCard} ${styles.advanced}`}>
                  <h3>Multi-Instrumentalists</h3>
                  <p>
                    Coming from jazz sax, flute, or other instruments? I'll help you transfer your
                    improvisational skills and musical knowledge to recorder.
                  </p>
                </div>
              </div>

              <h2>What Makes My Advanced Teaching Unique</h2>

              <div className={styles.uniqueApproach}>
                <div className={`${styles.approachItem} ${styles.advanced}`}>
                  <h3>Genre-Crossing Expertise</h3>
                  <p>
                    Unlike most recorder teachers who specialize only in baroque, I bring expertise
                    in jazz, Latin, flamenco, and contemporary music. This gives you a truly unique
                    skill set and opens doors to performance opportunities others miss.
                  </p>
                </div>

                <div className={`${styles.approachItem} ${styles.advanced}`}>
                  <h3>Professional Performance Experience</h3>
                  <p>
                    I perform regularly in professional settings—concerts, recordings, collaborations.
                    My teaching comes from real-world experience, not just academic knowledge.
                  </p>
                </div>

                <div className={`${styles.approachItem} ${styles.advanced}`}>
                  <h3>Berklee Jazz Training</h3>
                  <p>
                    Berklee College of Music gave me world-class training in improvisation, harmony,
                    and contemporary techniques. I'm one of the few recorder teachers who can teach
                    jazz authentically.
                  </p>
                </div>

                <div className={`${styles.approachItem} ${styles.advanced}`}>
                  <h3>Innovative Techniques</h3>
                  <p>
                    Electric recorder, loop pedals, extended techniques—I'm pushing the boundaries
                    of what's possible on recorder. Learn techniques you won't find anywhere else.
                  </p>
                </div>
              </div>

              <h2>Student Success Stories</h2>

              <blockquote className={`${styles.testimonial} ${styles.advanced}`}>
                <p>
                  "Tali's jazz improvisation lessons transformed my playing. I came from a classical
                  background and now I'm gigging with jazz ensembles. Her approach to teaching
                  improvisation is clear, practical, and incredibly fun."
                </p>
                <cite>— David R., Professional Musician</cite>
              </blockquote>

              <blockquote className={`${styles.testimonial} ${styles.advanced}`}>
                <p>
                  "As a conservatory student, I needed help preparing my jury repertoire. Tali's
                  insights on baroque ornamentation and phrasing took my playing to a new level.
                  I received top marks and gained so much confidence."
                </p>
                <cite>— Emma S., Conservatory Student</cite>
              </blockquote>

              <div className={`${styles.ctaSection} ${styles.advanced}`}>
                <h2>Ready to Advance Your Playing?</h2>
                <p>
                  Advanced lessons are tailored to your specific goals—whether that's mastering
                  a difficult concerto, learning to improvise, or preparing for a professional audition.
                  Let's discuss what you want to achieve and create a plan to get you there.
                </p>
                <Link href="/book-bundle" className={`${styles.ctaButton} ${styles.ctaButtonLarge} ${styles.advanced}`}>
                  Book an Advanced Lesson
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

export default AdvancedRecorderLessons
