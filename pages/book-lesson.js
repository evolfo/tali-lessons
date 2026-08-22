import React from 'react'
import { Grid, GridColumn, Card, GridRow } from "semantic-ui-react"
import NextImage from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { ServiceSchema, BreadcrumbSchema } from '../components/StructuredData'

// This is a class to use ComponentDidMount for a loading of a script for the booking embed
class BookLesson extends React.Component {
  handleBundleClick = () => {
    window.location.href = "https://www.talirecorderlessons.com/book-bundle"
    setTimeout(() => {
      window.location.reload();
    }, 200)
  }

  render() {
    return (
      <>
      <NextSeo
        title="Book an Online Recorder Lesson | Tali Rubinstein"
        description="Book a single 45 or 60 minute online recorder lesson with Tali Rubinstein, or save up to 10% with a lesson bundle. Instant online booking, all skill levels welcome."
        canonical="https://www.talirecorderlessons.com/book-lesson"
        openGraph={{
          url: 'https://www.talirecorderlessons.com/book-lesson',
          title: 'Book an Online Recorder Lesson | Tali Rubinstein',
          description: 'Book a single online recorder lesson or save with a discounted lesson bundle. Personalized instruction for all skill levels.',
          images: [
            {
              url: 'https://www.talirecorderlessons.com/img/recorders.jpg',
              width: 1200,
              height: 630,
              alt: 'Book an online recorder lesson with Tali Rubinstein',
            },
          ],
        }}
      />
      <ServiceSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Book a Lesson', url: '/book-lesson' }
      ]} />
      <Grid id="book-lesson">
        <GridRow columns={2}>
          <div className="booking-container">
            <GridColumn>
              <Card
                fluid={true}
                data-appointlet-organization="tali-recorder-lessons"
              >
                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <NextImage 
                    src="/img/recorders.jpg" 
                    alt="Book a single recorder lesson with Tali Rubinstein"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <Card.Content>
                  <Card.Header>Book a Single Lesson</Card.Header>
                  <Card.Description>
                    Lessons can be 45 or 60 minutes long.
                  </Card.Description>
                </Card.Content>
              </Card>
            </GridColumn>
            <GridColumn>
              <Link href="/book-bundle" onClick={this.handleBundleClick} style={{ display: 'block' }}>
                <Card fluid={true}>
                  <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <NextImage 
                      src="/img/recorders.jpg" 
                      alt="Purchase discounted recorder lesson bundles"
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <Card.Content>
                    <Card.Header>Purchase a Lesson Bundle</Card.Header>
                    <Card.Description>Get up to 10% off!</Card.Description>
                  </Card.Content>
                </Card>
              </Link>
            </GridColumn>
          </div>
        </GridRow>
      </Grid>
      </>
    );
  }
}

export async function getStaticProps() {
  return { props: {} }
}

export default BookLesson