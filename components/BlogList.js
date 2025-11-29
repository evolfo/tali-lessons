import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

const BlogList = ({ allBlogs }) => {
  const [displayedPosts, setDisplayedPosts] = useState([])
  const [page, setPage] = useState(1)
  const POSTS_PER_PAGE = 9

  function truncateSummary(content) {
    // Strip HTML tags and get plain text
    const plainText = content.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ')
    return plainText.slice(0, 140).trimEnd() + "..."
  }

  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  function sortAllBlogsByDate() {
    return allBlogs.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  }

  const sortedBlogs = sortAllBlogsByDate()

  useEffect(() => {
    setDisplayedPosts(sortedBlogs.slice(0, POSTS_PER_PAGE * page))
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        if (displayedPosts.length < sortedBlogs.length) {
          setPage(prev => prev + 1)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayedPosts, sortedBlogs])

  return (
    <>
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Exploring the art of recorder playing, music education, and performance</p>
      </div>

      <div className="blog-grid">
        {displayedPosts.length > 0 &&
          displayedPosts.map((post) => {
            const card = (
              <div className="blog-card">
                <div className="blog-card__image">
                  <Image
                    src={post.frontmatter.hero_image}
                    alt={post.frontmatter.title}
                    width={400}
                    height={250}
                    loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                  />
                </div>
                <div className="blog-card__content">
                  <div className="blog-card__meta">
                    <time>{reformatDate(post.frontmatter.date)}</time>
                  </div>
                  <h2 className="blog-card__title">{post.frontmatter.title}</h2>
                  <div className="blog-card__excerpt">
                    <ReactMarkdown
                      components={{
                        a: ({ children }) => <span>{children}</span>,
                        p: ({ children }) => <span>{children}</span>,
                      }}
                    >
                      {truncateSummary(post.markdownBody)}
                    </ReactMarkdown>
                  </div>
                  <div className="blog-card__footer">
                    <span className="read-more">
                      Read article
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            )

            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card-link">
                {card}
              </Link>
            )
          })}
      </div>

      {displayedPosts.length < sortedBlogs.length && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading more articles...</p>
        </div>
      )}

      <style jsx>{`
        .blog-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem;
          padding: 3rem 1rem 0;
        }

        .blog-header h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1a1a1a;
          letter-spacing: -0.02em;
        }

        .blog-header p {
          font-size: 1.25rem;
          color: #666;
          line-height: 1.6;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
          margin-bottom: 4rem;
        }

        .blog-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
          height: 100%;
        }

        .blog-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid #f0f0f0;
        }

        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
          border-color: #e0e0e0;
        }


        .blog-card__image {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .blog-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .blog-card:hover .blog-card__image img {
          transform: scale(1.05);
        }

        .external-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #667eea;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .blog-card__content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-card__meta {
          margin-bottom: 0.75rem;
        }

        .blog-card__meta time {
          font-size: 0.875rem;
          color: #667eea;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .blog-card__title {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.75rem;
          color: #1a1a1a;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card__excerpt {
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
          font-size: 0.9375rem;
        }

        .blog-card__footer {
          margin-top: auto;
        }

        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #667eea;
          font-weight: 600;
          font-size: 0.9375rem;
          transition: gap 0.3s ease;
        }

        .blog-card:hover .read-more {
          gap: 0.75rem;
        }

        .read-more svg {
          transition: transform 0.3s ease;
        }

        .blog-card:hover .read-more svg {
          transform: translateX(4px);
        }

        .loading-indicator {
          text-align: center;
          padding: 3rem 0;
          color: #666;
        }

        .spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto 1rem;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 767px) {
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 0 1rem;
          }

          .blog-header {
            padding: 2rem 1rem 0;
            margin-bottom: 2rem;
          }

          .blog-card__content {
            padding: 1.25rem;
          }
        }
      `}</style>
    </>
  )
}

export default BlogList