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
            <>
              <Link key={post.slug} href={{ pathname: `/blog/${post.slug}` }}>
                <a>
                  <li>
                    <div className="hero_image">
                      <img
                        src={post.frontmatter.hero_image}
                        alt={post.frontmatter.hero_image}
                      />
                    </div>
                    <div className="blog__info">
                      <h2>{post.frontmatter.title}</h2>
                      <h3> {reformatDate(post.frontmatter.date)}</h3>
                      <p>
                        <ReactMarkdown
                          source={truncateSummary(post.markdownBody)}
                        />
                      </p>
                      <button>Click to read more</button>
                    </div>
                  </li>
                </a>
              </Link>
            </>
          ))}
      </ul>
    </>
  )
}

export default BlogList