import React, { useEffect, useState } from "react";
import {
  Menu,
  Segment,
  Image,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "semantic-ui-react";
import Link from "next/link";

import LessonButton from "../components/LessonButton";

const MainHeader = () => {
  const [activeItem, setActiveItem] = useState("home");

  const handleMenuItemClick = (e, { name }) => {
    if (name === "store") {
      window.location.href = "https://www.talirecorderlessons.com/book-bundle";
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
    this.setState({ activeItem: name });
  };

  const handleHeaderImgClick = (e) => {
    setActiveItem("home");
  };

  useEffect(() => {
    const len = document.location.href.split("/").length;
    const item = document.location.href.split("/")[len - 1];
    if (activeItem) {
      setActiveItem(item);
    } else {
      setActiveItem("home");
    }
  }, []);

  return (
    <Segment className="navbar" inverted>
      <Menu inverted pointing secondary>
        <div className="hide-header">
          <Link
            href="/"
            name="home"
            active={activeItem === "home"}
            onClick={handleMenuItemClick}
          >
            <a>Home</a>
          </Link>
          <Link
            href="/about"
            name="about"
            active={activeItem === "about"}
            onClick={handleMenuItemClick}
          >
            <a>About</a>
          </Link>
          <Link
            href="/tutorials"
            name="tutorials"
            active={activeItem === "tutorials"}
            onClick={handleMenuItemClick}
          >
            <a>Tutorials</a>
          </Link>
          <Link href="/">
            <Image
              alt="Tali's Logo"
              name="home"
              active={activeItem === "home"}
              onClick={handleHeaderImgClick}
              src="/img/talilogo.png"
              centered
            />
          </Link>
          <Link
            href="/blog"
            name="blog"
            active={activeItem === "blog"}
            onClick={handleMenuItemClick}
          >
            <a>Blog</a>
          </Link>
          <a href="/book-bundle" name="store" onClick={handleMenuItemClick}>
            Store
          </a>
          <Link
            href="/contact"
            name="contact"
            active={activeItem === "contact"}
            onClick={handleMenuItemClick}
          >
            <a>Contact</a>
          </Link>
          <a href="/book-bundle">
            <LessonButton />
          </a>
        </div>
        <Link aria-label="Homepage" href="/">
          <a>
            <Image
              className="header-burger"
              name="home"
              onClick={handleHeaderImgClick}
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
            <a href="/book-bundle">
              <DropdownItem text="Store" />
            </a>
            <Link href="/contact">
              <a>
                <DropdownItem text="Contact" />
              </a>
            </Link>
            <a href="/book-bundle">
              <DropdownItem className="timify-button" text="Book a Lesson" />
            </a>
          </DropdownMenu>
        </Dropdown>
      </Menu>
    </Segment>
  );
};

export default MainHeader;
