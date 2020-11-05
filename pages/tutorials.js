import React from "react";

import {Container, Grid, GridColumn, GridRow, Header, Embed} from 'semantic-ui-react'

const Tutorials = () => {
    return (
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
    );
}

export default Tutorials