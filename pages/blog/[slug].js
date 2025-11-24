import * as React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { NextSeo } from 'next-seo'
import { Embed } from 'semantic-ui-react'
import Parser from 'rss-parser'
const glob = require('glob')

import BlogLayout from '../../components/BlogLayout'
import SocialShare from '../../components/SocialShare'
import styles from '../../styles/BlogPost.module.css'

export default function BlogTemplate({ frontmatter, markdownBody, siteTitle, isSubstack }) {
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

  const fullUrl = "https://talirecorderlessons.com" + (typeof window !== 'undefined' ? window.location.pathname : `/blog/${frontmatter.title}`)
  const imageUrl = frontmatter.hero_image?.startsWith('http')
    ? frontmatter.hero_image
    : `https://talirecorderlessons.com${frontmatter.hero_image}`

  return (
    <>
      <NextSeo
        title={`${frontmatter.title} | Tali Rubinstein`}
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
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: frontmatter.title,
            description: frontmatter.description || frontmatter.excerpt,
            image: imageUrl,
            datePublished: frontmatter.date,
            dateModified: frontmatter.date,
            author: {
              '@type': 'Person',
              name: frontmatter.author || 'Tali Rubinstein',
              url: 'https://talirecorderlessons.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Tali Rubinstein - Recorder Lessons',
              logo: {
                '@type': 'ImageObject',
                url: 'https://talirecorderlessons.com/img/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': fullUrl,
            },
            keywords: frontmatter.keywords || '',
            articleSection: frontmatter.category || 'Music',
          }),
        }}
      />

      <BlogLayout siteTitle={siteTitle}>
        <article className={styles.blogPost}>
          <div className={styles.blogPostHeader}>
            <a href="/blog" className={styles.backButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to articles
            </a>
            <div className={styles.blogPostMeta}>
              <time>{reformatDate(frontmatter.date)}</time>
            </div>
            <h1 className={styles.blogPostTitle}>{frontmatter.title}</h1>
          </div>

          <figure className={styles.blogPostHero}>
            {frontmatter.video_link ?
              <Embed
                  width="560"
                  height="315"
                  placeholder={frontmatter.video_image}
                  id={frontmatter.video_link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  source="youtube"
                /> :
              <img
                src={frontmatter.hero_image}
                alt={`blog_hero_${frontmatter.title}`}
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
        </article>
      </BlogLayout>
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params
  const config = await import(`../../data/config.json`)

  // Check if this is a Substack post
  if (slug.startsWith('substack-')) {
    try {
      const parser = new Parser({
        customFields: {
          item: ['content:encoded', 'content']
        }
      });
      const SUBSTACK_URL = process.env.SUBSTACK_RSS_URL || 'https://yoursubstack.substack.com/feed';
      const feed = await parser.parseURL(SUBSTACK_URL);

      // Find the matching post by slug
      const post = feed.items.find(item => {
        const itemSlug = 'substack-' + item.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        return itemSlug === slug;
      });

      if (!post) {
        return { notFound: true };
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
        },
      };
    } catch (error) {
      console.error('Error fetching Substack post:', error);
      return { notFound: true };
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
      },
    }
  } catch (error) {
    return { notFound: true };
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
    const parser = new Parser({
      customFields: {
        item: ['content:encoded', 'content']
      }
    });
    const SUBSTACK_URL = process.env.SUBSTACK_RSS_URL || 'https://yoursubstack.substack.com/feed';
    const feed = await parser.parseURL(SUBSTACK_URL);

    substackSlugs = feed.items.map(item => {
      return 'substack-' + item.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    });
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
    fallback: false, // Changed to false to avoid SSR issues on Netlify
  }
}
