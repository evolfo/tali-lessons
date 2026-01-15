import React from 'react'
import { Segment, List, Icon } from "semantic-ui-react";
import Link from 'next/link';

const Footer = () => {
  return (
    <Segment textAlign="center" id="footer" inverted>
      <div className="footer-columns">
        <div className="footer-column">
          <h4>Lessons</h4>
          <Link href="/lessons/beginner-recorder-lessons">Beginner</Link>
          <Link href="/lessons/advanced-recorder-lessons">Advanced</Link>
          <Link href="/lessons/baroque-recorder-lessons">Baroque</Link>
          <Link href="/lessons/kids-recorder-lessons">Kids</Link>
        </div>
        <div className="footer-column">
          <h4>Resources</h4>
          <Link href="/tutorials">Tutorials</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="footer-column">
          <h4>Book</h4>
          <Link href="/book-bundle">Lessons & Sheet Music</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-column">
          <h4>Connect</h4>
          <List horizontal className="social-icons">
            <List.Item>
              <a aria-label="Facebook" href="https://www.facebook.com/talirubinsteinrecorder/" target="_blank" rel="noopener noreferrer">
                <Icon circular name="facebook" />
              </a>
            </List.Item>
            <List.Item>
              <a aria-label="Instagram" href="https://www.instagram.com/talirubinstein/" target="_blank" rel="noopener noreferrer">
                <Icon circular name="instagram" />
              </a>
            </List.Item>
            <List.Item>
              <a aria-label="YouTube" href="https://www.youtube.com/user/TaliRubin" target="_blank" rel="noopener noreferrer">
                <Icon circular name="youtube" />
              </a>
            </List.Item>
            <List.Item>
              <a aria-label="Twitter" href="https://twitter.com/TaliRubinstein" target="_blank" rel="noopener noreferrer">
                <Icon circular name="twitter" />
              </a>
            </List.Item>
            <List.Item>
              <a aria-label="Website" href="https://talirecorderlessons.com" target="_blank" rel="noopener noreferrer">
                <Icon circular name="globe" />
              </a>
            </List.Item>
          </List>
        </div>
      </div>
      <p className="footer-copyright">© {new Date().getFullYear()} Tali Rubinstein</p>
    </Segment>
  );
}

export default Footer
