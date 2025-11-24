import React from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import styles from '../styles/NotFound.module.css'

const Custom404 = () => {
  return (
    <>
      <NextSeo
        title="Page Not Found | Tali Recorder Lessons"
        description="The page you're looking for doesn't exist. Browse our recorder lessons, sheet music, and blog."
        noindex={true}
      />

      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundContent}>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.errorMessage}>Page Not Found</h2>
          <p className={styles.errorDescription}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className={styles.linksContainer}>
            <Link href="/" className={styles.primaryLink}>
              Go to Homepage
            </Link>

            <div className={styles.helpfulLinks}>
              <h3>You might be interested in:</h3>
              <ul>
                <li>
                  <Link href="/#lessons">Online Recorder Lessons</Link>
                </li>
                <li>
                  <Link href="/#sheet-music">Sheet Music</Link>
                </li>
                <li>
                  <Link href="/blog">Blog & Articles</Link>
                </li>
                <li>
                  <Link href="/#contact">Contact Tali</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Custom404
