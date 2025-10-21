import React from 'react'
import { Grid, GridColumn, Image, Header, Container } from "semantic-ui-react";

const About = () => {
    return (
      <div id="about-wrapper">
        <Grid centered id="about">
          <GridColumn
            stretched
            className="about-img"
            tablet={16}
            computer={6}
          >
            {/* <Image 
              src="/img/about1.jpg"
              alt="lol"
            /> */}
          </GridColumn>
          <GridColumn
            stretched
            tablet={12}
            computer={7}
            className="about-text"
          >
            <p>
              Like most kids, Tali began playing the recorder in 2nd grade.
              Unlike most, she never stopped.
            </p>
            <p>
              Tali was professionally trained in classical baroque and
              renaissance music from a young age, studying in prestigious music
              schools in Israel (Thelma Yellin High School of the Arts, Rimon
              School of Music). The first ever recorder player to attend Berklee
              College of Music in Boston, Tali received a full scholarship and
              completed her B.Mus with honors. Winning numerous awards and
              honors (recently: composing and recording for a Latin Grammy
              winning album, and being mentioned on Barack Obama’s Favorite
              Songs of 2018), Tali has established herself worldwide in jazz,
              pop and R&B music, exploring and challenging the boundaries of
              this ancient baroque instrument.
            </p>
            <p>
              While obtaining a successful career as a performing artist, Tali
              has made it a priority to educate the next generation of recorder
              players, teaching private lessons and workshops all over the
              world, for all levels of recorder players. While in Israel, Tali
              taught for two years at the Neve Sharet Conservatory in Tel Aviv,
              and since moving to the US she’s been teaching privately in NYC
              for over five years.
            </p>
            <p>
              Tali has given workshops in the US (Carnegie Hall), Germany
              (Frankfurt University of Music and Performing Arts), Israel
              (Israel International Recorder Festival), The Philippines (UP
              College of Music, Philippine Women’s University, University of
              Santo Tomas and New Era University), Taiwan (Tsing Hua
              University), Uruguay (Jazz a la Calle festival) and Spain (Colegio
              Decroly).
            </p>
            <p>
              To learn more about Tali, visit{" "}
              <a href="https://www.talirubinstein.com">
                www.talirubinstein.com
              </a>
              .
            </p>
          </GridColumn>
          <GridColumn
            stretched
            className="about-img"
            tablet={16}
            computer={4}
          ></GridColumn>
        </Grid>
        <div className="about-vid-wrapper">
          <Container className="about-vid">
            <Header>Tali with her Band</Header>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/lMFN3UKNBh8"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Tali with her band."
              />
            </div>
          </Container>
        </div>
      </div>
    );
}

export default About