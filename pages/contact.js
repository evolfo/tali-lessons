import React, {useState} from 'react'
import {Grid, GridColumn, GridRow, Container} from 'semantic-ui-react'
 
class Contact extends React.Component {

    render() {
        return (
          <>
            <Container id="contact-wrapper">
              <Grid>
                <GridRow>
                  <GridColumn mobile={16} tablet={11} computer={10}>
                    <div className="responsive-iframe">
                      <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLScxhYHXfEXjIkT0uO3VhZcGjNhOtQBUgvT_x0Pg-L4L2zk_2A/viewform?embedded=true"
                        frameBorder="0"
                        marginHeight="0"
                        scrolling="no"
                        marginWidth="0"
                      >
                        Loading…
                      </iframe>
                    </div>
                  </GridColumn>
                </GridRow>
              </Grid>
            </Container>
          </>
        );
    }
}

export default Contact