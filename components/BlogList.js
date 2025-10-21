import React from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

const BlogList = ({ allBlogs }) => {
  function truncateSummary(content) {
    return content.slice(0, 170).trimEnd() + "..."
  }

  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  function sortAllBlogsByDate() {
    return allBlogs.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  }

  return (
    <>
      <ul className="list">
        {allBlogs.length > 0 &&
          sortAllBlogsByDate().map(post => (
            <li key={post.slug}>
              <Link href={{ pathname: `/blog/${post.slug}` }} style={{ display: 'flex' }}>
                <span className="hero_image">
                  <img
                    src={post.frontmatter.hero_image}
                    alt={post.frontmatter.hero_image}
                  />
                </span>
                <span className="blog__info">
                  <h2>{post.frontmatter.title}</h2>
                  <h3> {reformatDate(post.frontmatter.date)}</h3>
                  <div>
                    <ReactMarkdown>
                      {truncateSummary(post.markdownBody)}
                    </ReactMarkdown>
                  </div>
                  <button>Click to read more</button>
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </>
  )
}

export default BlogList