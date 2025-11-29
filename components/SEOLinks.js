import React from 'react';
import Link from 'next/link';

/**
 * Internal links for SEO - adds contextual links to related pages
 */
export const RelatedLinks = ({ currentPage }) => {
  const allLinks = [
    { href: '/book-bundle', label: 'Book Recorder Lessons', description: 'Individual and package lessons available' },
    { href: '/tutorials', label: 'Free Tutorials', description: 'Carnegie Hall education series' },
    { href: '/about', label: 'About Tali', description: 'Learn about Tali Rubinstein' },
    { href: '/blog', label: 'Blog', description: 'Articles and updates' },
    { href: '/contact', label: 'Contact', description: 'Get in touch' },
  ];

  const filteredLinks = allLinks.filter(link => link.href !== currentPage);

  return (
    <nav aria-label="Related pages" style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Explore More</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {filteredLinks.map(link => (
          <li key={link.href}>
            <Link href={link.href} style={{ textDecoration: 'none', color: '#1a73e8' }}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * Quick links for footer SEO
 */
export const FooterSEOLinks = () => (
  <nav aria-label="Site navigation">
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <li><Link href="/">Home - Online Recorder Lessons</Link></li>
      <li><Link href="/about">About Tali Rubinstein - Recorder Teacher</Link></li>
      <li><Link href="/book-bundle">Book Recorder Lessons Online</Link></li>
      <li><Link href="/tutorials">Free Recorder Tutorials - Carnegie Hall Series</Link></li>
      <li><Link href="/blog">Recorder Blog - Tips & News</Link></li>
      <li><Link href="/contact">Contact for Recorder Lessons</Link></li>
    </ul>
  </nav>
);

export default { RelatedLinks, FooterSEOLinks };
