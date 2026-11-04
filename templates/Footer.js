import React from 'react'
import { Segment, List } from "semantic-ui-react";
import SvgIcon from "../components/SvgIcon";
import Link from 'next/link';

const Footer = () => {
  return (
    <Segment as="footer" textAlign="center" id="footer" inverted>
      <div className="footer-columns">
        <div className="footer-column">
          <p className="footer-heading">Lessons</p>
          <Link href="/lessons/beginner-recorder-lessons">Beginner</Link>
          <Link href="/lessons/advanced-recorder-lessons">Advanced</Link>
          <Link href="/lessons/baroque-recorder-lessons">Baroque</Link>
          <Link href="/lessons/kids-recorder-lessons">Kids</Link>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Resources</p>
          <Link href="/tutorials">Tutorials</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Book</p>
          <Link href="/book-bundle">Lessons & Sheet Music</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Connect</p>
          <List horizontal className="social-icons">
            <List.Item>
              <a aria-label="Facebook" href="https://www.facebook.com/talirubinsteinrecorder/" target="_blank" rel="noopener noreferrer">
                <SvgIcon circular name="facebook" />
              </a>
            </List.Item>
            <List.Item>
              <a aria-label="Instagram" href="https://www.instagram.com/talirubinstein/" target="_blank" rel="noopener noreferrer">
                <SvgIcon circular name="instagram" />
              </a>
            </List.Item>
            <List.Item>
              <a aria-label="YouTube" href="https://www.youtube.com/user/TaliRubin" target="_blank" rel="noopener noreferrer">
                <SvgIcon circular name="youtube" />
              </a>
            </List.Item>
            <List.Item>
              <a aria-label="Twitter" href="https://twitter.com/TaliRubinstein" target="_blank" rel="noopener noreferrer">
                <SvgIcon circular name="twitter" />
              </a>
            </List.Item>
            <List.Item>
              <a aria-label="Website" href="https://talirecorderlessons.com" target="_blank" rel="noopener noreferrer">
                <SvgIcon circular name="globe" />
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
