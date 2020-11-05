import React from 'react'
import { Menu, Segment, Image, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react'
import Link from 'next/link'

import LessonButton from '../components/LessonButton'

class MainHeader extends React.Component {

  state = { activeItem: "home" }

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    console.log(name)
  };

  handleHeaderImgClick = (e) => {
    this.setState({ activeItem: "home"})
  }

  componentDidMount() {
    const len = document.location.href.split('/').length
    const activeItem = document.location.href.split('/')[len - 1]
    if (activeItem) {
      this.setState({activeItem})
    } else {
      this.setState({activeItem: "home"})
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Segment className="navbar" inverted>
        <Menu inverted pointing secondary>
          <div className="hide-header">
            <Link 
              href="/" 
              name="home"
              active={activeItem === "home"}
              onClick={this.handleMenuItemClick}>
              <a>
                Home
              </a>
            </Link>
            <Link 
              href="/about"
              name="about"
              active={activeItem === "about"}
              onClick={this.handleMenuItemClick}
            >
              <a>
                About
              </a>
            </Link>
            <Link 
              href="/tutorials"
              name="tutorials"
              active={activeItem === "tutorials"}
              onClick={this.handleMenuItemClick}
            >
             <a>
              Tutorials
             </a>
            </Link>
            <Link href="/">
              <Image
                alt="Tali's Logo"
                name="home"
                active={activeItem === "home"}
                onClick={this.handleHeaderImgClick}
                src="/img/talilogo.png"
                centered
              />
            </Link>
            <Link 
              href="/blog"
              name="blog"
              active={activeItem === "blog"}
              onClick={this.handleMenuItemClick}
            >
              <a>
                Blog
              </a>
            </Link>
            <Link 
              href="/book-lesson"
              name="lessons"
              active={activeItem === "lessons"}
              onClick={this.handleMenuItemClick}
            >
              <a>
                Lessons
              </a>
            </Link>
            <Link 
              href="/contact"
              name="contact"
              active={activeItem === "contact"}
              onClick={this.handleMenuItemClick}
            >
              <a>
                Contact
              </a>
            </Link>
            <Link href="/book-lesson">
             <a>
              <LessonButton />
             </a>
            </Link>
          </div>
          <Link aria-label="Homepage" href="/">
            <a>
              <Image
                className="header-burger"
                name="home"
                onClick={this.handleHeaderImgClick}
                src="/img/talilogo.png"
                centered
                alt="header burger"
              />
            </a>
          </Link>
          <Dropdown
            aria-label="Header burger"
            alt="Header burger"
            className="header-burger"
            icon="bars"
          >
            <DropdownMenu>
              <Link href="/">
               <a>
                <DropdownItem text="Home" />
               </a>
              </Link>
              <Link href="/tutorials">
               <a>
                <DropdownItem text="Tutorials" />
               </a>
              </Link>
              <Link href="/about">
               <a>
                <DropdownItem text="About" />
               </a>
              </Link>
              <Link href="/blog">
               <a>
                <DropdownItem text="Blog" />
               </a>
              </Link>
              <Link href="/contact">
               <a>
                <DropdownItem text="Contact" />
               </a>
              </Link>
              <Link href="/book-lesson">
               <a>
                <DropdownItem className="timify-button" text="Book a Lesson" />
               </a>
              </Link>
            </DropdownMenu>
          </Dropdown>
        </Menu>
      </Segment>
    );
  }
};

export default MainHeader