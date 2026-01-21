import React from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { PersonSchema, ServiceSchema } from '../../components/StructuredData'
import styles from '../../styles/LessonPage.module.css'

const KidsRecorderLessons = () => {
  return (
    <>
      <NextSeo
        title="Recorder Lessons for Kids Online | Fun Music Education with Tali Rubinstein"
        description="Engaging online recorder lessons for children ages 8-17. Build musical skills, confidence, and creativity with professional instruction designed for young learners."
        canonical="https://talirecorderlessons.com/lessons/kids-recorder-lessons"
        openGraph={{
          url: 'https://talirecorderlessons.com/lessons/kids-recorder-lessons',
          title: 'Recorder Lessons for Kids | Online Music Education',
          description: 'Fun, effective recorder lessons for children. Professional instruction that keeps kids engaged and excited about making music.',
          images: [{
              url: 'https://talirecorderlessons.com/img/about1.jpg',
              width: 1200,
              height: 630,
              alt: 'Tali Rubinstein teaching recorder',
            }],
          type: 'website',
        }}
      />

      <PersonSchema />
      <ServiceSchema />

      <div className={styles.lessonPage}>
        <div className={`${styles.lessonHero} ${styles.kids}`}>
          <div className={styles.lessonHeroContent}>
            <h1>Recorder Lessons for Kids</h1>
            <p className={styles.lessonHeroSubtitle}>
              Fun, Engaging Music Education for Young Musicians (Ages 8-17)
            </p>
            <p className={styles.lessonHeroDescription}>
              Professional online lessons that make learning recorder exciting, rewarding, and educational
            </p>
            <Link href="/book-bundle" className={`${styles.ctaButton} ${styles.kids}`}>
              Book a Lesson
            </Link>
          </div>
        </div>

        <section className={styles.lessonContent}>
          <div className={styles.container}>
              <h2>Why Recorder for Kids?</h2>

              <p className={styles.leadText}>
                The recorder is the perfect first instrument for children. It's affordable, portable, and kids can make progress quickly—seeing results in weeks, not years. Plus, the skills they learn transfer to other instruments as they grow.
              </p>

              <div className={styles.benefitsGrid}>
                <div className={`${styles.benefitCard} ${styles.kids}`}>
                  <h3>🎵 Build Musical Foundation</h3>
                  <p>
                    Recorder teaches music reading, rhythm, pitch recognition, and listening skills—the building blocks for any instrument.
                  </p>
                </div>

                <div className={`${styles.benefitCard} ${styles.kids}`}>
                  <h3>✨ Quick Progress</h3>
                  <p>
                    Kids love seeing results fast! Most students play recognizable songs within their first few lessons, building confidence and motivation.
                  </p>
                </div>

                <div className={`${styles.benefitCard} ${styles.kids}`}>
                  <h3>🎯 Engaging Lessons</h3>
                  <p>
                    I keep lessons fun with games, favorite songs, and achievable goals. Kids stay excited about practicing and making music.
                  </p>
                </div>

                <div className={`${styles.benefitCard} ${styles.kids}`}>
                  <h3>💻 Online Convenience</h3>
                  <p>
                    No driving to lessons! Kids learn from the comfort of home, and parents can be present if they'd like. Perfect for busy families.
                  </p>
                </div>
              </div>

              <h2>What Kids Learn</h2>

              <div className={styles.curriculum}>
                <div className={`${styles.curriculumPhase} ${styles.kids}`}>
                  <h3>Musical Skills</h3>
                  <ul>
                    <li>How to read music notation (notes, rhythms, dynamics)</li>
                    <li>Understanding rhythm and timing</li>
                    <li>Ear training and pitch recognition</li>
                    <li>Music theory basics in a fun, accessible way</li>
                    <li>Expression and musicality</li>
                  </ul>
                </div>

                <div className={`${styles.curriculumPhase} ${styles.kids}`}>
                  <h3>Recorder Technique</h3>
                  <ul>
                    <li>Proper hand position and posture</li>
                    <li>Beautiful tone production</li>
                    <li>Tonguing and articulation</li>
                    <li>Breath control</li>
                    <li>Playing all the notes (low C to high notes)</li>
                    <li>Advanced techniques as they progress</li>
                  </ul>
                </div>

                <div className={`${styles.curriculumPhase} ${styles.kids}`}>
                  <h3>Performance Skills</h3>
                  <ul>
                    <li>Playing with confidence</li>
                    <li>Performing for family and friends</li>
                    <li>Working toward goals and celebrating achievements</li>
                    <li>Ensemble playing (if desired)</li>
                  </ul>
                </div>

                <div className={`${styles.curriculumPhase} ${styles.kids}`}>
                  <h3>Life Skills</h3>
                  <ul>
                    <li>Discipline and consistent practice habits</li>
                    <li>Goal-setting and achievement</li>
                    <li>Focus and concentration</li>
                    <li>Creative expression</li>
                    <li>Confidence building</li>
                  </ul>
                </div>
              </div>

              <h2>Songs Kids Love to Play</h2>

              <div className={styles.songCategories}>
                <div className={`${styles.songCategory} ${styles.kids}`}>
                  <h3>Pop & Movie Themes</h3>
                  <ul>
                    <li>Harry Potter Theme</li>
                    <li>Let It Go (Frozen)</li>
                    <li>Star Wars</li>
                    <li>Popular songs arranged for recorder</li>
                  </ul>
                </div>

                <div className={`${styles.songCategory} ${styles.kids}`}>
                  <h3>Folk & Traditional</h3>
                  <ul>
                    <li>Hot Cross Buns</li>
                    <li>Twinkle Twinkle</li>
                    <li>Ode to Joy</li>
                    <li>World folk songs</li>
                  </ul>
                </div>

                <div className={`${styles.songCategory} ${styles.kids}`}>
                  <h3>Classical Pieces</h3>
                  <ul>
                    <li>Easy baroque dances</li>
                    <li>Renaissance melodies</li>
                    <li>Simple classical arrangements</li>
                  </ul>
                </div>
              </div>

              <h2>Age-Appropriate Approach</h2>

              <div className={styles.ageGroups}>
                <div className={`${styles.ageCard} ${styles.kids}`}>
                  <h3>Ages 8-10</h3>
                  <p><strong>Focus:</strong> Fun, games, and building confidence</p>
                  <ul>
                    <li>Short, engaging lessons (30 minutes)</li>
                    <li>Simple songs with immediate success</li>
                    <li>Visual learning aids and games</li>
                    <li>Parent involvement encouraged</li>
                    <li>Lots of encouragement and celebration</li>
                  </ul>
                </div>

                <div className={`${styles.ageCard} ${styles.kids}`}>
                  <h3>Ages 11-13</h3>
                  <p><strong>Focus:</strong> Building skills and musicality</p>
                  <ul>
                    <li>30 or 60-minute lessons</li>
                    <li>More challenging repertoire</li>
                    <li>Music theory integration</li>
                    <li>Exploring different musical styles</li>
                    <li>Developing practice independence</li>
                  </ul>
                </div>

                <div className={`${styles.ageCard} ${styles.kids}`}>
                  <h3>Ages 14-17 (Teens)</h3>
                  <p><strong>Focus:</strong> Advanced technique and expression</p>
                  <ul>
                    <li>60-minute lessons recommended</li>
                    <li>Classical, jazz, or contemporary focus</li>
                    <li>Performance preparation</li>
                    <li>College audition prep (if applicable)</li>
                    <li>Treated as young musicians</li>
                  </ul>
                </div>
              </div>

              <h2>What Parents Say</h2>

              <blockquote className={`${styles.testimonial} ${styles.kids}`}>
                <p>
                  "My 9-year-old was struggling to stay interested in piano, but recorder has been perfect for her. Tali makes every lesson fun, and my daughter actually looks forward to practicing now!"
                </p>
                <cite>— Lisa M., Parent of 9-year-old student</cite>
              </blockquote>

              <blockquote className={`${styles.testimonial} ${styles.kids}`}>
                <p>
                  "The online format is amazing for our busy family schedule. No driving, and I can listen in from the other room. My son has learned so much in just 3 months—he's reading music and playing songs I recognize!"
                </p>
                <cite>— David K., Parent of 11-year-old student</cite>
              </blockquote>

              <blockquote className={`${styles.testimonial} ${styles.kids}`}>
                <p>
                  "Tali has a gift for working with teens. My 15-year-old daughter takes her seriously as a musician and has grown so much in confidence. She's even considering music for college now!"
                </p>
                <cite>— Jennifer R., Parent of 15-year-old student</cite>
              </blockquote>

              <h2>Getting Started</h2>

              <div className="getting-started">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Book a Lesson</h3>
                    <p>
                      Schedule a lesson to see if recorder lessons are a good fit for your child. No long-term commitment required.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Get a Recorder</h3>
                    <p>
                      Don't worry if you don't have one yet! I'll recommend an appropriate instrument based on your child's age and hand size. Quality student recorders start around $20-30.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Start Learning!</h3>
                    <p>
                      We'll meet online via Zoom. Your child will start making music right away. I provide all materials, practice guides, and ongoing support.
                    </p>
                  </div>
                </div>
              </div>

              <h2>Parents' FAQs</h2>

              <div className={styles.faq}>
                <div className={`${styles.faqItem} ${styles.kids}`}>
                  <h3>What age is best to start recorder?</h3>
                  <p>
                    I recommend starting at age 7 or older. At this age, kids have the hand coordination, attention span, and ability to follow instructions needed for successful lessons. That said, every child is different—if your 7-year-old is ready, we can try a lesson!
                  </p>
                </div>

                <div className={`${styles.faqItem} ${styles.kids}`}>
                  <h3>How long are lessons for kids?</h3>
                  <p>
                    For younger children (8-10), I recommend 30-minute lessons. Older kids and teens (11+) often benefit from 60-minute lessons. We can adjust as needed based on your child's attention span and goals.
                  </p>
                </div>

                <div className={`${styles.faqItem} ${styles.kids}`}>
                  <h3>Do I need to sit with my child during lessons?</h3>
                  <p>
                    For younger students (8-10), it's helpful if a parent is nearby, especially at first. Older students usually prefer independent lessons. I'll let you know what works best for your child's age and personality.
                  </p>
                </div>

                <div className={`${styles.faqItem} ${styles.kids}`}>
                  <h3>What equipment do we need?</h3>
                  <p>
                    You'll need: (1) A recorder (I'll recommend one), (2) A computer/tablet with camera and microphone, (3) A quiet space for lessons, (4) A music stand (optional but helpful). That's it!
                  </p>
                </div>

                <div className={`${styles.faqItem} ${styles.kids}`}>
                  <h3>How much practice is required?</h3>
                  <p>
                    I recommend 15-20 minutes daily for younger students, 20-30 minutes for older students and teens. Consistent short practice is better than one long session. I teach kids how to practice effectively.
                  </p>
                </div>

                <div className={`${styles.faqItem} ${styles.kids}`}>
                  <h3>Can recorder skills transfer to other instruments?</h3>
                  <p>
                    Absolutely! Recorder teaches music reading, rhythm, breath control, and musical expression—all of which transfer to other instruments. Many professional flutists, oboists, and clarinetists started on recorder.
                  </p>
                </div>
              </div>

              <div className={`${styles.ctaSection} ${styles.kids}`}>
                <h2>Give Your Child the Gift of Music</h2>
                <p>
                  Recorder lessons build confidence, creativity, and discipline while being genuinely fun. Book a lesson today and see how music can enrich your child's life.
                </p>
                <Link href="/book-bundle" className={`${styles.ctaButton} ${styles.ctaButtonLarge} ${styles.kids}`}>
                  Book a Lesson for Your Child
                </Link>
              </div>
            </div>
          </section>
        </div>
      </>
  )
}

export default KidsRecorderLessons
