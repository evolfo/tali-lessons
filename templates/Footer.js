import React from 'react'
import { Segment, List, Icon, Header } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment textAlign="center" id="footer" inverted>
      <List horizontal>
        <List.Item>
          <List.Content>
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/talirubinsteinrecorder/"
            >
              <Icon circular name="facebook" size="big" />
            </a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <a aria-label="Twitter" href="https://twitter.com/TaliRubinstein">
              <Icon circular name="twitter" size="big" />
            </a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/talirubinstein/"
            >
              <Icon circular name="instagram" size="big" />
            </a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <a
              aria-label="YouTube"
              href="https://www.youtube.com/user/TaliRubin"
            >
              <Icon circular name="youtube" size="big" />
            </a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <a aria-label="Website" href="https://www.talirubinstein.com">
              <Icon circular name="globe" size="big" />
            </a>
          </List.Content>
        </List.Item>
      </List>
      <Header>Copyright © 2020 Tali Rubinstein</Header>
    </Segment>
  );
}

export default Footer