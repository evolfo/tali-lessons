import React from "react";
import { NextSeo } from 'next-seo';
import { BreadcrumbSchema, VideoSchema } from '../components/StructuredData';
import {Container, Grid, GridColumn, GridRow, Header, Embed} from 'semantic-ui-react'

const tutorialVideos = [
  {
    name: "Meet Tali - Carnegie Hall Recorder Basics",
    description: "Meet recorder player Tali Rubinstein as she introduces her recorder arsenal in this Carnegie Hall education series.",
    thumbnail: "/img/tutorials/RB1edit.jpg",
    youtubeId: "I8cdUjH8V_M",
    uploadDate: "2020-04-01"
  },
  {
    name: "Recorder Posture, Breath, and Articulation",
    description: "Learn proper posture, breathing techniques, and articulation for recorder playing with Tali Rubinstein.",
    thumbnail: "/img/tutorials/RB2edit.jpg",
    youtubeId: "cE7lqAoCMfQ",
    uploadDate: "2020-04-01"
  },
  {
    name: "Playing B, A, and G on Recorder",
    description: "Learn to play the notes B, A, and G on the recorder with step-by-step instruction from Tali Rubinstein.",
    thumbnail: "/img/tutorials/RB3edit.jpg",
    youtubeId: "jbArad_r4B4",
    uploadDate: "2020-04-01"
  },
  {
    name: "Playing High C and D on Recorder",
    description: "Master the high C and D notes on the recorder with professional instruction from Tali Rubinstein.",
    thumbnail: "/img/tutorials/RB4edit.jpg",
    youtubeId: "7uho-etcCoI",
    uploadDate: "2020-04-01"
  },
  {
    name: "Playing C, D, E, and F on Recorder",
    description: "Learn to play C, D, E, and F on the recorder with Carnegie Hall's education series featuring Tali Rubinstein.",
    thumbnail: "/img/tutorials/RB5edit.jpg",
    youtubeId: "pRbAKAPOcos",
    uploadDate: "2020-04-01"
  },
  {
    name: "Playing the C-Major Scale on Recorder",
    description: "Complete your recorder basics by learning the full C-Major scale with Tali Rubinstein.",
    thumbnail: "/img/tutorials/RB6edit.jpg",
    youtubeId: "jCLX7N0m2rY",
    uploadDate: "2020-04-01"
  }
];

const Tutorials = () => {
    return (
      <>
        <NextSeo
          title="Free Recorder Tutorials | Carnegie Hall Education Series with Tali Rubinstein"
          description="Free recorder tutorials featuring Carnegie Hall's education series. Learn recorder basics, posture, breathing, articulation, and the C-major scale with Tali Rubinstein."
          canonical="https://www.talirecorderlessons.com/tutorials"
          openGraph={{
            url: 'https://www.talirecorderlessons.com/tutorials',
            title: 'Free Recorder Tutorials | Carnegie Hall Education Series',
            description: 'Learn recorder basics for free with Carnegie Hall education series. Professional instruction from Tali Rubinstein.',
            images: [
              {
                url: 'https://www.talirecorderlessons.com/img/tutorials/RB1edit.jpg',
                width: 1200,
                height: 630,
                alt: 'Tali Rubinstein Recorder Tutorial',
              },
            ],
            videos: tutorialVideos.map(v => ({
              url: `https://www.youtube.com/watch?v=${v.youtubeId}`,
              type: 'text/html',
            })),
          }}
        />
        <BreadcrumbSchema items={[
          { name: 'Home', url: '/' },
          { name: 'Tutorials', url: '/tutorials' }
        ]} />
        <VideoSchema videos={tutorialVideos} />
      <Container id="tutorials">
        <Header>Carnegie Hall Education Series: Recorder Basics</Header>
        <h3>
          Learn your recorder basics here with this free educational series
          produced by Carnegie Hall. First, get to meet Tali as she walks you
          through some of her recorder arsenal, next learn how to maintain good
          posture, breathing, and articulation, and finally learn how to play
          the C-major scale.
        </h3>
        <Grid padded="vertically">
          <GridRow>
            <GridColumn computer={8} mobile={16}>
              <h2>Meet Tali</h2>
              <div className="">
                <Embed
                  width="560"
                  height="315"
                  placeholder="/img/tutorials/RB1edit.jpg"
                  id="I8cdUjH8V_M"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  source="youtube"
                />
              </div>
            </GridColumn>
            <GridColumn computer={8} mobile={16}>
              <h2>Posture, Breath, and Articulation</h2>
              <div className="">
                <Embed
                  width="560"
                  height="315"
                  placeholder="/img/tutorials/RB2edit.jpg"
                  id="cE7lqAoCMfQ"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  source="youtube"
                />
              </div>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn computer={8} mobile={16}>
              <h2>Playing "B", "A", and "G"</h2>
              <div className="">
                <Embed
                  width="560"
                  height="315"
                  placeholder="/img/tutorials/RB3edit.jpg"
                  id="jbArad_r4B4"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  source="youtube"
                />
              </div>
            </GridColumn>
            <GridColumn computer={8} mobile={16}>
              <h2>Playing High "C" and "D"</h2>
              <div className="">
                <Embed
                  width="560"
                  height="315"
                  placeholder="/img/tutorials/RB4edit.jpg"
                  id="7uho-etcCoI"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  source="youtube"
                />
              </div>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn computer={8} mobile={16}>
              <h2>Playing "C", "D", "E", and "F"</h2>
              <div className="">
                <Embed
                  width="560"
                  height="315"
                  placeholder="/img/tutorials/RB5edit.jpg"
                  id="pRbAKAPOcos"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  source="youtube"
                />
              </div>
            </GridColumn>
            <GridColumn computer={8} mobile={16}>
              <h2>Playing the C-Major Scale</h2>
              <div className="">
                <Embed
                  width="560"
                  height="315"
                  placeholder="/img/tutorials/RB6edit.jpg"
                  id="jCLX7N0m2rY"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  source="youtube"
                />
              </div>
            </GridColumn>
          </GridRow>
        </Grid>
      </Container>
      </>
    );
}

export async function getStaticProps() {
  return { props: {} }
}

export default Tutorials