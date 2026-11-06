import * as React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import AccessibleEmbed from '../../components/AccessibleEmbed'
import Parser from 'rss-parser'
const glob = require('glob')

import BlogLayout from '../../components/BlogLayout'
import SocialShare from '../../components/SocialShare'
import LessonPaths from '../../components/LessonPaths'
import { BreadcrumbSchema, PERSON_ID, ORGANIZATION_ID } from '../../components/StructuredData'
import styles from '../../styles/BlogPost.module.css'
import { serializeJsonLd } from '../../lib/jsonld'
import { titleToSlug, findOlderPost, fetchArchiveIndex } from '../../lib/substack'

export default function BlogTemplate({ frontmatter, markdownBody, siteTitle, isSubstack, slug }) {
  const contentRef = React.useRef(null)

  // Remove first image from Substack content to avoid duplication with hero image
  // and remove image toggle buttons, social icons, and MailChimp elements
  React.useEffect(() => {
    if (isSubstack && contentRef.current) {
      const firstImg = contentRef.current.querySelector('img')
      if (firstImg) {
        // Remove the image and its parent container if it's a link or figure
        const parent = firstImg.closest('a, figure, .captioned-image-container')
        if (parent) {
          parent.remove()
        } else {
          firstImg.remove()
        }
      }

      // Remove all image toggle buttons
      const toggleButtons = contentRef.current.querySelectorAll('.image-link-expand, button[aria-label*="zoom"], button[aria-label*="expand"], .pencraft')
      toggleButtons.forEach(button => button.remove())

      // Remove social icons and small icon images
      const socialIcons = contentRef.current.querySelectorAll('.social-icons, [class*="social"], table[class*="social"], .image-link.image2, a.image2')
      socialIcons.forEach(el => el.remove())

      // Remove images with icon-related alt text
      const iconImages = contentRef.current.querySelectorAll('img')
      iconImages.forEach(img => {
        const alt = (img.getAttribute('alt') || '').toLowerCase()
        const width = parseInt(img.getAttribute('width') || '0')
        const height = parseInt(img.getAttribute('height') || '0')

        // Remove if it's a small icon (24x24 or similar) or has icon/logo in alt
        if (alt.includes('icon') ||
            alt === 'logo' ||
            (width > 0 && width <= 100 && height > 0 && height <= 100)) {
          const parent = img.closest('a, div, figure, picture')
          if (parent) {
            parent.remove()
          } else {
            img.remove()
          }
        }
      })

      // Remove MailChimp elements and text
      const mailchimpElements = contentRef.current.querySelectorAll('table, div, p, a')
      mailchimpElements.forEach(el => {
        const text = el.textContent || ''
        const html = el.innerHTML.toLowerCase()
        if (text.includes('mailchimp') ||
            text.includes('update your preferences') ||
            text.includes('unsubscribe from this list') ||
            text.includes('*|IF:REWARDS|*') ||
            text.includes('*|HTML:REWARDS|*') ||
            text.includes('*|END:IF|*') ||
            html.includes('mailchimp')) {
          el.remove()
        }
      })

      // Remove images with MailChimp in alt or title
      const mailchimpImages = contentRef.current.querySelectorAll('img')
      mailchimpImages.forEach(img => {
        const alt = (img.getAttribute('alt') || '').toLowerCase()
        const title = (img.getAttribute('title') || '').toLowerCase()
        const src = (img.getAttribute('src') || '').toLowerCase()
        if (alt.includes('mailchimp') ||
            title.includes('mailchimp') ||
            src.includes('mailchimp') ||
            alt.includes('email marketing')) {
          // Remove the image and its parent containers
          const parent = img.closest('div, figure, picture, a')
          if (parent) {
            parent.remove()
          } else {
            img.remove()
          }
        }
      })

      // Remove signature images (typically the last few images after content)
      const allImages = contentRef.current.querySelectorAll('img')
      const lastImages = Array.from(allImages).slice(-3) // Check last 3 images
      lastImages.forEach(img => {
        const src = img.getAttribute('src') || ''
        const parent = img.closest('div')
        // If image is very small (likely a signature/logo) or in specific divs
        if (parent && (parent.classList.contains('image2-inset') ||
            img.naturalHeight < 200 ||
            src.includes('substack-post-media'))) {
          // Only remove if it's at the end of content
          const rect = parent.getBoundingClientRect()
          if (rect.top > window.innerHeight * 0.7) {
            parent.remove()
          }
        }
      })
    }
  }, [isSubstack])

  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  /*
   ** Odd fix to get build to run
   ** It seems like on first go the props
   ** are undefined — could be a Next bug?
   */

  if (!frontmatter) return <></>

  // The real route slug comes from getStaticProps. (This used to be built from
  // the post TITLE, which does not match the actual URL, so every post's
  // canonical, og:url, breadcrumb and JSON-LD url pointed at a page that 404s.)
  const fullUrl = "https://www.talirecorderlessons.com/blog/" + slug
  const imageUrl = frontmatter.hero_image?.startsWith('http')
    ? frontmatter.hero_image
    : `https://www.talirecorderlessons.com${frontmatter.hero_image}`
  
  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = markdownBody?.split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <>
      {/* Additional meta tags for article */}
      <Head>
        <meta property="article:published_time" content={frontmatter.date} />
        <meta property="article:author" content={frontmatter.author || 'Tali Rubinstein'} />
        <meta property="article:section" content={frontmatter.category || 'Music'} />
        {frontmatter.keywords?.split(',').map((tag, i) => (
          <meta key={i} property="article:tag" content={tag.trim()} />
        ))}
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={frontmatter.author || 'Tali Rubinstein'} />
        <meta name="twitter:label2" content="Est. reading time" />
        <meta name="twitter:data2" content={`${readingTime} min read`} />
      </Head>

      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: frontmatter.title, url: `/blog/${slug}` }
      ]} />

      <NextSeo
        title={frontmatter.title}
        titleTemplate={frontmatter.title.length <= 37 ? '%s | Tali Recorder Lessons' : '%s'}
        description={frontmatter.description || frontmatter.excerpt}
        canonical={fullUrl}
        openGraph={{
          type: 'article',
          url: fullUrl,
          title: frontmatter.title,
          description: frontmatter.description || frontmatter.excerpt,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ],
          article: {
            publishedTime: frontmatter.date,
            authors: [frontmatter.author || 'Tali Rubinstein'],
            tags: frontmatter.keywords?.split(',').map(k => k.trim()) || [],
          },
          siteName: 'Tali Rubinstein - Recorder Lessons & Performances',
        }}
        twitter={{
          handle: '@talirecorder',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: frontmatter.keywords || 'recorder, music lessons, performance',
          },
          {
            name: 'author',
            content: frontmatter.author || 'Tali Rubinstein',
          },
        ]}
      />

      {/* JSON-LD Structured Data for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: frontmatter.title,
            description: frontmatter.description || frontmatter.excerpt,
            image: imageUrl,
            datePublished: frontmatter.date,
            dateModified: frontmatter.date,
            author: {
              '@id': PERSON_ID,
              '@type': 'Person',
              name: frontmatter.author || 'Tali Rubinstein',
              url: 'https://www.talirecorderlessons.com',
            },
            publisher: {
              '@id': ORGANIZATION_ID,
              '@type': 'Organization',
              name: 'Tali Rubinstein - Recorder Lessons',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.talirecorderlessons.com/img/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': fullUrl,
            },
            keywords: frontmatter.keywords || '',
            articleSection: frontmatter.category || 'Music',
            wordCount: wordCount,
            timeRequired: `PT${readingTime}M`,
          }),
        }}
      />

      <BlogLayout siteTitle={siteTitle}>
        <article className={styles.blogPost} itemScope itemType="https://schema.org/BlogPosting">
          <meta itemProp="datePublished" content={frontmatter.date} />
          <meta itemProp="author" content={frontmatter.author || 'Tali Rubinstein'} />
          <div className={styles.blogPostHeader}>
            <a href="/blog" className={styles.backButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to articles
            </a>
            <div className={styles.blogPostMeta}>
              <time dateTime={frontmatter.date}>{reformatDate(frontmatter.date)}</time>
              <span className={styles.readingTime}> · {readingTime} min read</span>
            </div>
            <h1 className={styles.blogPostTitle} itemProp="headline">{frontmatter.title}</h1>
          </div>

          <figure className={styles.blogPostHero}>
            {frontmatter.video_link ?
              <AccessibleEmbed
                  youtubeId={frontmatter.video_link}
                  placeholder={frontmatter.video_image}
                  title={frontmatter.title}
                  sizes="(max-width: 768px) 100vw, 800px"
                /> :
              <Image
                src={frontmatter.hero_image}
                alt={frontmatter.title}
                width={1200}
                height={630}
                priority
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            }
          </figure>

          <div className={styles.blogPostContent}>
            {isSubstack ? (
              <div ref={contentRef} className={styles.substackContent} dangerouslySetInnerHTML={{ __html: markdownBody }} />
            ) : (
              <ReactMarkdown>{markdownBody}</ReactMarkdown>
            )}
          </div>

          <SocialShare
            url={fullUrl}
            title={frontmatter.title}
            description={frontmatter.description || frontmatter.excerpt}
          />

          <LessonPaths />
        </article>
      </BlogLayout>
    </>
  )
}

// One shared, short-lived cache of the Substack feed per server instance, so a
// burst of requests (or bots probing made-up /blog/substack-... URLs) triggers
// at most one upstream fetch every few minutes.
let feedCache = { at: 0, feed: null }
async function fetchSubstackFeed() {
  if (feedCache.feed && Date.now() - feedCache.at < 5 * 60 * 1000) return feedCache.feed
  const parser = new Parser({
    customFields: { item: ['content:encoded', 'content'] },
    timeout: 10000,
  })
  const feed = await parser.parseURL(process.env.SUBSTACK_RSS_URL || 'https://talirecorder.substack.com/feed')
  feedCache = { at: Date.now(), feed }
  return feed
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params
  const config = await import(`../../data/config.json`)

  // Check if this is a Substack post
  if (slug.startsWith('substack-')) {
    try {
      const feed = await fetchSubstackFeed();

      // Find the matching post by slug
      let post = feed.items.find(item => titleToSlug(item.title) === slug);

      // Not in the ~20-post RSS window: look it up in Substack's archive.
      if (!post) {
        const older = await findOlderPost(slug);
        if (older) {
          post = {
            title: older.title,
            pubDate: older.pubDate,
            'content:encoded': older.content,
            enclosure: older.enclosureUrl ? { url: older.enclosureUrl } : undefined,
          };
        }
      }

      if (!post) {
        // Unknown slug (typo, bot probe, or a post that has aged out of the RSS window).
        // Short revalidate so a just-published post isn't stuck as a cached 404.
        return { notFound: true, revalidate: 120 };
      }

      // Extract and generate metadata for Substack post
      const fullContent = post['content:encoded'] || post.content || post.contentSnippet || '';
      const plainText = fullContent.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
      const description = plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '');
      const excerpt = plainText.slice(0, 200) + (plainText.length > 200 ? '...' : '');

      // Auto-generate keywords
      const titleWords = post.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const keywords = [
        ...new Set([
          ...titleWords.slice(0, 5),
          'recorder',
          'Tali Rubinstein',
          'music',
          'performance'
        ])
      ].join(', ');

      // Categorize based on title
      let category = 'Blog Post';
      const titleLower = post.title.toLowerCase();
      if (titleLower.includes('video') || titleLower.includes('watch')) {
        category = 'Music Video';
      } else if (titleLower.includes('album') || titleLower.includes('release') || titleLower.includes('single')) {
        category = 'Album Release';
      } else if (titleLower.includes('concert') || titleLower.includes('performance') || titleLower.includes('live')) {
        category = 'Concert';
      } else if (titleLower.includes('tutorial') || titleLower.includes('lesson') || titleLower.includes('how to')) {
        category = 'Tutorial';
      } else if (titleLower.includes('announce') || titleLower.includes('news')) {
        category = 'Announcement';
      }

      return {
        props: {
          siteTitle: config.title,
          frontmatter: {
            title: post.title,
            date: post.pubDate || post.isoDate,
            hero_image: post.enclosure?.url || '/img/blog-img/blog1.jpg',
            author: 'Tali Rubinstein',
            description: description,
            excerpt: excerpt,
            keywords: keywords,
            category: category,
          },
          markdownBody: fullContent,
          isSubstack: true,
          slug,
        },
      };
    } catch (error) {
      // Rethrow: a transient Substack outage must not be cached as a 404 (and during
      // ISR, a thrown error keeps serving the last good copy of the page).
      console.error('Error fetching Substack post:', error);
      throw error;
    }
  }

  // Handle local markdown posts
  try {
    const content = await import(`../../posts/${slug}.md`)
    let markdownContent = content.default || content;
    if (typeof markdownContent !== 'string' && markdownContent?.toString) {
      markdownContent = markdownContent.toString('utf-8');
    }
    const data = matter(markdownContent)

    return {
      props: {
        siteTitle: config.title,
        frontmatter: data.data,
        markdownBody: data.content,
        isSubstack: false,
        slug,
      },
    }
  } catch (error) {
    return { notFound: true, revalidate: 3600 };
  }
}

export async function getStaticPaths() {
  // Get all local .md files in the posts dir
  const blogs = glob.sync('posts/**/*.md')

  // Remove path and extension to leave filename only
  const blogSlugs = blogs.map(file =>
    file
      .split('/')[1]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim()
  )

  // Fetch Substack posts to generate paths
  let substackSlugs = [];
  try {
    const feed = await fetchSubstackFeed();

    substackSlugs = feed.items.map(item => titleToSlug(item.title));
    // Older posts that have dropped out of the RSS window.
    const archive = await fetchArchiveIndex();
    substackSlugs = [...new Set([...substackSlugs, ...archive.map(e => e.slug)])];
  } catch (error) {
    console.warn('Could not fetch Substack posts for paths:', error.message);
  }

  // Combine local and Substack slugs
  const allSlugs = [...blogSlugs, ...substackSlugs];

  // Create paths with `slug` param
  const paths = allSlugs.map(slug => ({
    params: { slug }
  }))

  return {
    paths,
    // 'blocking': a post published on Substack after the last deploy is rendered on
    // its first request instead of 404ing until the next deploy (the /blog list
    // already refreshes hourly and links to it). Pages stay cached afterwards.
    fallback: 'blocking',
  }
}
