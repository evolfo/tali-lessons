import React from 'react';
import { NextSeo } from 'next-seo';
import { Button, Container, Header } from 'semantic-ui-react'
import { ServiceSchema, BreadcrumbSchema } from '../components/StructuredData';

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
      <>
        <NextSeo
          title="Book a Recorder Lesson | Tali Rubinstein"
          description="Schedule your online recorder lesson with Tali Rubinstein. Choose from 45 or 60 minute sessions. Expert instruction for all skill levels."
          canonical="https://www.talirecorderlessons.com/book-bundle-lesson"
          openGraph={{
            url: 'https://www.talirecorderlessons.com/book-bundle-lesson',
            title: 'Book a Recorder Lesson',
            description: 'Schedule your online recorder lesson with Tali Rubinstein. Choose from 45 or 60 minute sessions.',
            images: [
              {
                url: 'https://www.talirecorderlessons.com/img/background1.jpg',
                width: 1200,
                height: 630,
                alt: 'Book a Recorder Lesson with Tali Rubinstein',
              },
            ],
          }}
        />
        <ServiceSchema />
        <BreadcrumbSchema items={[
          { name: 'Home', url: '/' },
          { name: 'Book Lessons', url: '/book-bundle' },
          { name: 'Schedule Lesson', url: '/book-bundle-lesson' }
        ]} />
        <Container id="book-bundle-lesson-container" className="bundle-container">
        <Header>Book a lesson!</Header>
        {/* <Button
          data-appointlet-organization="tali-recorder-lessons"
          data-appointlet-service="376666"
          primary
        >
          30 Minutes
        </Button> */}
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
      </>
    );
  }
}

export async function getStaticProps() {
  return { props: {} }
}

export default BookBundleLesson