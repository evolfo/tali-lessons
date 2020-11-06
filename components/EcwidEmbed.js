import React from "react";
import { Grid, GridRow, Header, Container } from "semantic-ui-react";

function EcwidEmbed(props) {
  return (
    <>
      <Container id="lesson-bundles" className="bundle-container">
        <Header>Lesson Bundles and Sheet Music</Header>
        <p>Get 5% off 5 lessons, 10% off 10 lessons, or 20% off 20 lessons by choosing one of the options below.<br />
        (The prices listed are for 5-lesson bundles, click on a box for more options)</p>
        <Grid id="my-store-36360190">
          <GridRow columns={2}>
            <div className="booking-iframe-container">
              <iframe
                src="https://store36360190.company.site/"
                width="100%"
                height="100%"
                scrolling="no"
              />
            </div>
          </GridRow>
        </Grid>
      </Container>
    </>
  );
}

export default EcwidEmbed;
