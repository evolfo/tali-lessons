import React from "react"
import { NextSeo } from 'next-seo';
import loadable from '@loadable/component'
import { ServiceSchema, BreadcrumbSchema } from '../components/StructuredData';

const StoreContent = loadable(() => import('../components/StoreContent'));

// This class is for the Ecwid bundles
class BookBundle extends React.Component {
  render() {
    return (
      <>
        <NextSeo
          title="Book Online Recorder Lessons & Sheet Music | Tali Rubinstein"
          description="Book online recorder lessons with Tali Rubinstein. Individual lessons and discounted packages available. Also browse original sheet music compositions."
          canonical="https://talirecorderlessons.com/book-bundle"
          openGraph={{
            url: 'https://talirecorderlessons.com/book-bundle',
            title: 'Book Online Recorder Lessons & Sheet Music',
            description: 'Individual lessons starting at $95. Package discounts up to 10% off. Original sheet music by Tali Rubinstein.',
            images: [
              {
                url: 'https://talirecorderlessons.com/img/background1.jpg',
                width: 1200,
                height: 630,
                alt: 'Book Recorder Lessons with Tali Rubinstein',
              },
            ],
          }}
        />
        <ServiceSchema />
        <BreadcrumbSchema items={[
          { name: 'Home', url: '/' },
          { name: 'Book Lessons & Sheet Music', url: '/book-bundle' }
        ]} />
        <StoreContent />
      </>
    );
  }
}

export default BookBundle;