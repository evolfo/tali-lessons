import React from 'react';
import Head from 'next/head';

export const PersonSchema = () => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Tali Rubinstein',
          jobTitle: 'Professional Recorder Player, Composer & Music Educator',
          url: 'https://www.talirecorderlessons.com',
          image: 'https://www.talirecorderlessons.com/img/about1.jpg',
          sameAs: [
            'https://instagram.com/TaliRubinstein',
            'https://www.youtube.com/@talirecorder',
          ],
          description: 'World-renowned recorder player and educator offering online recorder lessons to students of all ages and skill levels.',
          knowsAbout: [
            'Recorder Performance',
            'Music Education',
            'Baroque Music',
            'Jazz',
            'Jazz Music',
            'Online Music Teaching',
            'Online Recorder Teaching',
            'Online Recorder Lessons',
            'Recorder Technique',
          ],
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Berklee College of Music',
          },
        }),
      }}
    />
  </Head>
);

export const MusicSchoolSchema = () => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          '@id': 'https://www.talirecorderlessons.com/#organization',
          name: 'Tali Recorder Lessons',
          alternateName: 'Online Recorder Lessons with Tali Rubinstein',
          url: 'https://www.talirecorderlessons.com',
          logo: 'https://www.talirecorderlessons.com/img/logo.png',
          description: 'Professional online recorder lessons for all ages and skill levels, taught by world-renowned recorder player Tali Rubinstein.',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'US',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'info@talirecorder.com',
            availableLanguage: ['en'],
          },
          offers: {
            '@type': 'Offer',
            category: 'Music Lessons',
            itemOffered: {
              '@type': 'EducationalOccupationalProgram',
              name: 'Recorder Lessons',
              description: 'Professional online recorder instruction',
              educationalProgramMode: 'Online',
              timeToComplete: 'PT60M',
            },
          },
        }),
      }}
    />
  </Head>
);

export const FAQSchema = () => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How do online recorder lessons work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Online recorder lessons are conducted via video call (Zoom or similar platforms). Students can learn from anywhere with an internet connection. Lessons are typically 45-60 minutes and include personalized instruction, technique coaching, and repertoire development.',
              },
            },
            {
              '@type': 'Question',
              name: 'What skill levels do you teach?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Tali teaches all skill levels, from complete beginners to advanced players. Whether you\'re just starting out or preparing for professional performances, lessons are tailored to your individual needs and goals.',
              },
            },
            {
              '@type': 'Question',
              name: 'What do I need for online recorder lessons?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'You need: (1) A recorder in good working condition, (2) A device with camera and microphone (computer, tablet, or smartphone), (3) Stable internet connection, (4) A quiet space for lessons, (5) A music stand and any assigned sheet music.',
              },
            },
            {
              '@type': 'Question',
              name: 'How much do recorder lessons cost?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Individual 60-minute lessons are $105. Lesson packages are available: 5 lessons for $498.75 (5% off), 10 lessons for $976.50 (7% off), and 20 lessons for $1,890 (10% off). 45-minute lessons are also available at $95 per lesson.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I purchase sheet music from Tali Rubinstein?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! Original compositions and arrangements by Tali Rubinstein are available for purchase as digital sheet music PDFs, including works like "Hot Cross Buns & Variations", "The Swimming Pool Song", and "Tico Tico no Fubá".',
              },
            },
            {
              '@type': 'Question',
              name: 'Who is Tali Rubinstein?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Tali Rubinstein is a world-renowned professional recorder player and music educator with years of performance and teaching experience. She specializes in both Baroque repertoire and contemporary recorder music, and has performed internationally.',
              },
            },
          ],
        }),
      }}
    />
  </Head>
);

export const ServiceSchema = () => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Online Music Lessons',
          provider: {
            '@type': 'Person',
            name: 'Tali Rubinstein',
          },
          areaServed: {
            '@type': 'Place',
            name: 'Worldwide',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Recorder Lessons',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: '60 Minute Recorder Lesson',
                  description: 'One-on-one online recorder instruction',
                },
                price: '105.00',
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: '5 x 60 Minute Lessons Package',
                  description: 'Package of 5 recorder lessons (5% discount)',
                },
                price: '498.75',
                priceCurrency: 'USD',
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: '45 Minute Recorder Lesson',
                  description: 'One-on-one online recorder instruction',
                },
                price: '95.00',
                priceCurrency: 'USD',
              },
            ],
          },
        }),
      }}
    />
  </Head>
);

export const BreadcrumbSchema = ({ items }) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://www.talirecorderlessons.com${item.url}`,
          })),
        }),
      }}
    />
  </Head>
);

export const ProductSchema = ({ product }) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.image ? `https://www.talirecorderlessons.com${product.image}` : undefined,
          offers: {
            '@type': 'Offer',
            price: (product.price / 100).toFixed(2),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Person',
              name: 'Tali Rubinstein',
            },
          },
          brand: {
            '@type': 'Brand',
            name: 'Tali Recorder Lessons',
          },
        }),
      }}
    />
  </Head>
);

export const WebPageSchema = ({ title, description, url }) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description: description,
          url: `https://www.talirecorderlessons.com${url}`,
          isPartOf: {
            '@type': 'WebSite',
            name: 'Tali Recorder Lessons',
            url: 'https://www.talirecorderlessons.com',
          },
        }),
      }}
    />
  </Head>
);

export const BlogPostSchema = ({ title, description, datePublished, image, url, author = 'Tali Rubinstein' }) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description: description,
          image: image ? (image.startsWith('http') ? image : `https://www.talirecorderlessons.com${image}`) : undefined,
          datePublished: datePublished,
          dateModified: datePublished,
          url: `https://www.talirecorderlessons.com${url}`,
          author: {
            '@type': 'Person',
            name: author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Tali Recorder Lessons',
            url: 'https://www.talirecorderlessons.com',
          },
        }),
      }}
    />
  </Head>
);

export const VideoSchema = ({ videos }) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: videos.map((video, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'VideoObject',
              name: video.name,
              description: video.description,
              thumbnailUrl: video.thumbnail.startsWith('http') 
                ? video.thumbnail 
                : `https://www.talirecorderlessons.com${video.thumbnail}`,
              uploadDate: video.uploadDate || '2020-01-01',
              contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
              embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
              publisher: {
                '@type': 'Person',
                name: 'Tali Rubinstein',
              },
            },
          })),
        }),
      }}
    />
  </Head>
);

export const SingleVideoSchema = ({ name, description, thumbnail, youtubeId, uploadDate }) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: name,
          description: description,
          thumbnailUrl: thumbnail.startsWith('http') 
            ? thumbnail 
            : `https://www.talirecorderlessons.com${thumbnail}`,
          uploadDate: uploadDate || '2020-01-01',
          contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
          embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
          publisher: {
            '@type': 'Person',
            name: 'Tali Rubinstein',
          },
        }),
      }}
    />
  </Head>
);

export default {
  PersonSchema,
  MusicSchoolSchema,
  FAQSchema,
  ServiceSchema,
  BreadcrumbSchema,
  ProductSchema,
  WebPageSchema,
  BlogPostSchema,
  VideoSchema,
  SingleVideoSchema,
};
