import React from "react";
import BlogLayout from "../components/BlogLayout";
import BlogList from "../components/BlogList";
import matter from "gray-matter";
import Parser from 'rss-parser';

const Blog = (props) => {
  return (
    <BlogLayout
      pathname="/"
      siteTitle={props.title}
      siteDescription={props.description}
    >
      <section>
        <BlogList allBlogs={props.allBlogs} />
      </section>
    </BlogLayout>
  );
};

export default Blog;

export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`);

  // Get local markdown posts
  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");
      const value = values[index];
      // Parse yaml metadata & markdownbody in document
      let content = value.default || value;
      if (typeof content !== 'string' && content?.toString) {
        content = content.toString('utf-8');
      }
      const document = matter(content);
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
        source: 'local', // Mark as local post
      };
    });
    return data;
  })(require.context("../posts", true, /\.md$/));

  // Fetch Substack posts via RSS
  let substackPosts = [];
  try {
    const parser = new Parser({
      customFields: {
        item: ['content:encoded', 'content']
      }
    });
    const SUBSTACK_URL = process.env.SUBSTACK_RSS_URL || 'https://yoursubstack.substack.com/feed';
    const feed = await parser.parseURL(SUBSTACK_URL);

    substackPosts = feed.items.map((item) => {
      // Create a URL-safe slug from the title
      const slug = 'substack-' + item.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
        .trim();

      // Extract description from content
      const fullContent = item['content:encoded'] || item.content || item.contentSnippet || '';
      const plainText = fullContent.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
      const description = plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '');
      const excerpt = plainText.slice(0, 200) + (plainText.length > 200 ? '...' : '');

      // Auto-generate keywords based on title and content
      const titleWords = item.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const keywords = [
        ...new Set([
          ...titleWords.slice(0, 5),
          'recorder',
          'Tali Rubinstein',
          'music',
          'performance'
        ])
      ].join(', ');

      // Categorize based on title content
      let category = 'Blog Post';
      const titleLower = item.title.toLowerCase();
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
        frontmatter: {
          title: item.title,
          date: item.pubDate || item.isoDate,
          hero_image: item.enclosure?.url || '/img/blog-img/blog1.jpg', // Fallback image
          author: 'Tali Rubinstein',
          description: description,
          excerpt: excerpt,
          keywords: keywords,
          category: category,
        },
        // Use full HTML content, fallback to content or contentSnippet
        markdownBody: fullContent,
        slug: slug,
        source: 'substack', // Mark as Substack post
        externalLink: item.link, // Keep original URL for reference
      };
    });
  } catch (error) {
    console.warn('Could not fetch Substack posts:', error.message);
    // Continue without Substack posts if fetch fails
  }

  // Combine local and Substack posts
  const allBlogs = [...posts, ...substackPosts];

  return {
    props: {
      allBlogs,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    },
    revalidate: 3600, // Revalidate every hour to fetch new Substack posts
  };
}
