import * as React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { NextSeo } from 'next-seo';
import {Embed} from 'semantic-ui-react'
const glob = require('glob')

import BlogLayout from '../../components/BlogLayout'

export default function BlogTemplate({ frontmatter, markdownBody, siteTitle }) {
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

  const getWindow = () => {
    if (typeof window !== 'undefined') {
      return window
    }
  }

  return (
    <>
      <NextSeo 
        title={frontmatter.title}
        description={frontmatter.description}
        canonical={"https://talirecorderlessons.com" + getWindow()?.location.pathname}
      />
      <BlogLayout siteTitle={siteTitle}>
        <article className="blog">
          <a href="/blog" className="back-button"> &lt;Back</a>
          <figure className="blog__hero">
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
          <div className="blog__info">
            <h1>{frontmatter.title}</h1>
            <h3>{reformatDate(frontmatter.date)}</h3>
          </div>
          <div className="blog__body">
            <ReactMarkdown>{markdownBody}</ReactMarkdown>
          </div>
        </article>
      </BlogLayout>
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params
  const content = await import(`../../posts/${slug}.md`)
  const config = await import(`../../data/config.json`)
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
    },
  }
}

export async function getStaticPaths() {
  //get all .md files in the posts dir
  const blogs = glob.sync('posts/**/*.md')

  //remove path and extension to leave filename only
  const blogSlugs = blogs.map(file =>
    file
      .split('/')[1]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim()
  )

  // create paths with `slug` param
  const paths = blogSlugs.map(slug => `/blog/${slug}`)
  return {
    paths,
    fallback: false,
  }
}
