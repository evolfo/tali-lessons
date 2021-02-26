import React from 'react'
import BlogLayout from '../components/BlogLayout'
import BlogList from '../components/BlogList'
import matter from 'gray-matter'

const Blog = props => {
    console.log(props.allBlogs)
    console.log(props.allBlogs.reverse())
    return (
        <BlogLayout
            pathname="/"
            siteTitle={props.title}
            siteDescription={props.description}
            >
            <section>
                <BlogList allBlogs={props.allBlogs.reverse()} />
            </section>
        </BlogLayout>
    )
}

export default Blog

export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`)
  //get posts & context from folder
  const posts = (context => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })
    return data
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      allBlogs: posts,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    },
  }
}