import React from 'react'
import { Grid, GridColumn, Card, Image, GridRow } from "semantic-ui-react"
import Link from 'next/link'

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
      <Grid id="book-lesson">
        <GridRow columns={2}>
          <div className="booking-container">
            <GridColumn>
              <Card
                fluid={true}
                data-appointlet-organization="tali-recorder-lessons"
              >
                <Image src="/img/recorders.jpg" wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Book a Single Lesson</Card.Header>
                  <Card.Description>
                    Lessons can be 30, 45, or 60 minutes long.
                  </Card.Description>
                </Card.Content>
              </Card>
            </GridColumn>
            <GridColumn>
              <Link href="/book-bundle" onClick={this.handleBundleClick}>
                <Card fluid={true}>
                  <Image src="/img/recorders.jpg" wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>Purchase a Lesson Bundle</Card.Header>
                    <Card.Description>Get up to 12% off!</Card.Description>
                  </Card.Content>
                </Card>
              </Link>
            </GridColumn>
          </div>
        </GridRow>
      </Grid>
    );
  }
}

export default BookLesson