import React, {useState} from 'react'
import {Grid, GridColumn, GridRow, Container} from 'semantic-ui-react'
import { NextSeo } from 'next-seo';
import { BreadcrumbSchema } from '../components/StructuredData';
 
class Contact extends React.Component {

    render() {
        return (
          <>
            <NextSeo
              title="Contact Tali Rubinstein | Book Online Recorder Lessons"
              description="Get in touch with Tali Rubinstein to book online recorder lessons, ask questions about lessons, or inquire about sheet music and collaborations."
              canonical="https://www.talirecorderlessons.com/contact"
              openGraph={{
                url: 'https://www.talirecorderlessons.com/contact',
                title: 'Contact Tali Rubinstein | Book Online Recorder Lessons',
                description: 'Contact Tali to book lessons or ask questions about online recorder instruction.',
              }}
            />
            <BreadcrumbSchema items={[
              { name: 'Home', url: '/' },
              { name: 'Contact', url: '/contact' }
            ]} />
            <Container id="contact-wrapper">
              <Grid>
                <GridRow>
                  <GridColumn mobile={20} tablet={12} computer={12}>
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

export async function getStaticProps() {
  return { props: {} }
}

export default Contact