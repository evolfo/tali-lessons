import React from "react";
import { Grid, GridColumn, Header } from "semantic-ui-react";
import Head from "next/head";
import Carousel from "semantic-ui-carousel-react";
import elements from "../utilities/carousel-elements";
import LessonButton from "../components/LessonButton";
import AccessibleEmbed from "../components/AccessibleEmbed";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      {/* Video Schema for homepage videos */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Tali Rubinstein Performance Videos',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@type': 'VideoObject',
                    name: 'Tali Rubinstein on Nickelodeon - Recorder Performance',
                    description: 'Watch Tali Rubinstein perform recorder on Nickelodeon, showcasing her unique style and incredible technique.',
                    thumbnailUrl: 'https://www.talirecorderlessons.com/img/placeholder-nick.jpg',
                    contentUrl: 'https://www.youtube.com/watch?v=AUeUZdfiuJ0',
                    embedUrl: 'https://www.youtube.com/embed/AUeUZdfiuJ0',
                    uploadDate: '2019-01-01',
                    publisher: {
                      '@type': 'Person',
                      name: 'Tali Rubinstein',
                    },
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@type': 'VideoObject',
                    name: 'Tali Rubinstein ULAB Performance - Recorder',
                    description: 'Tali Rubinstein performs at ULAB, demonstrating recorder versatility in modern music.',
                    thumbnailUrl: 'https://www.talirecorderlessons.com/img/placeholder-ulab.jpg',
                    contentUrl: 'https://www.youtube.com/watch?v=6YTo9RjX6j8',
                    embedUrl: 'https://www.youtube.com/embed/6YTo9RjX6j8',
                    uploadDate: '2019-01-01',
                    publisher: {
                      '@type': 'Person',
                      name: 'Tali Rubinstein',
                    },
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <Grid id="main-background">
        <GridColumn className="tablet-display-none" computer={8}></GridColumn>
        <GridColumn tablet={16} computer={8} className="main-about-text">
          <Header as="h1" className="centered-text">
            Learn Recorder with&nbsp;Tali!
          </Header>
          <p className="centered-text">
            Ever wondered – “Can I actually play that on a&nbsp;recorder?”
          </p>
          <p className="centered-text">
            The answer is – yes. California based Award-winning recorder player
            Tali Rubinstein will teach you&nbsp;how.
          </p>
          <Link href="/book-bundle" aria-label="Book online recorder lessons with Tali Rubinstein">
            <LessonButton />
          </Link>
        </GridColumn>
      </Grid>
      <Grid id="tutorial-videos">
        <Header as="h2" className="main-about-text video-header">
          See Tali in Action
        </Header>
        <GridColumn tablet={16} computer={8}>
          <div className="">
            <AccessibleEmbed
              youtubeId="AUeUZdfiuJ0"
              placeholder="/img/placeholder-nick.jpg"
              title="Tali Rubinstein performing recorder on Nickelodeon"
            />
          </div>
        </GridColumn>
        <GridColumn tablet={16} computer={8}>
          <div className="">
            <AccessibleEmbed
              youtubeId="6YTo9RjX6j8"
              placeholder="/img/placeholder-ulab.jpg"
              title="Tali Rubinstein ULAB recorder performance"
            />
          </div>
        </GridColumn>
      </Grid>
      <Grid centered id="testimonials">
        <div className="testimonial-background-color">
          <Header as="h2" className="main-about-text testimonials-header">
            Testimonials
          </Header>
          <GridColumn className="testimonials-text" computer={12} tablet={16}>
            <Carousel
              elements={elements}
              duration={9000}
              animation="bounce"
              showNextPrev={false}
              showIndicators={true}
            />
          </GridColumn>
        </div>
      </Grid>
    </>
  );
};

export default HomePage;
