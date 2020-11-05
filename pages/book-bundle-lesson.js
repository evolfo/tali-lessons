import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react'

class BookBundleLesson extends React.Component {
  state = {
    script: "",
  };

  componentDidMount = () => {
    const script = document.createElement("script");

    script.src = "https://www.appointletcdn.com/loader/loader.min.js";
    script.async = true;
    script.defer = true;

    this.setState({ script });

    document.body.appendChild(script);
  };

  render() {
    return (
      <Container id="book-bundle-lesson-container" className="bundle-container">
        <Header>Book a lesson!</Header>
        <Button
          data-appointlet-organization="tali-recorder-lessons"
          data-appointlet-service="376666"
          primary
        >
          30 Minutes
        </Button>
        <Button
          data-appointlet-organization="tali-recorder-lessons"
          data-appointlet-service="376670"
          primary
        >
          45 Minutes
        </Button>
        <Button
          data-appointlet-organization="tali-recorder-lessons"
          data-appointlet-service="370667"
          primary
        >
          60 Minutes
        </Button>
      </Container>
    );
  }
}

export default BookBundleLesson