import React, { useEffect, useState } from "react";
import {
  Menu,
  Segment,
  Image,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Label,
} from "semantic-ui-react";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { useCartModal } from "../contexts/CartModalContext";

import LessonButton from "../components/LessonButton";
import ShoppingCart from "../components/ShoppingCart";

const MainHeader = () => {
  const [activeItem, setActiveItem] = useState("home");
  const { cartOpen, openCart, closeCart } = useCartModal();
  const { cartCount } = useShoppingCart();

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
            onClick={handleMenuItemClick}
            className={activeItem === "home" ? "active" : ""}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={handleMenuItemClick}
            className={activeItem === "about" ? "active" : ""}
          >
            About
          </Link>
          <Link
            href="/tutorials"
            onClick={handleMenuItemClick}
            className={activeItem === "tutorials" ? "active" : ""}
          >
            Tutorials
          </Link>
          <Link href="/">
            <Image
              alt="Tali's Logo"
              onClick={handleHeaderImgClick}
              src="/img/talilogo.png"
              centered
            />
          </Link>
          <Link
            href="/blog"
            onClick={handleMenuItemClick}
            className={activeItem === "blog" ? "active" : ""}
          >
            Blog
          </Link>
          <a href="/book-bundle" onClick={handleMenuItemClick}>
            Store
          </a>
          <Link
            href="/contact"
            onClick={handleMenuItemClick}
            className={activeItem === "contact" ? "active" : ""}
          >
            Contact
          </Link>
          <div className="header-buttons">
            <a href="/book-bundle">
              <LessonButton />
            </a>
            <Button className="cart-button" onClick={openCart}>
              <Icon name="shopping bag" />
              {cartCount > 0 && <Label color="red" floating circular>{cartCount}</Label>}
            </Button>
          </div>
        </div>
        <Link aria-label="Homepage" href="/">
          <Image
            className="header-burger"
            onClick={handleHeaderImgClick}
            src="/img/talilogo.png"
            centered
            alt="header burger"
          />
        </Link>
        <Dropdown
          aria-label="Header burger"
          alt="Header burger"
          className="header-burger"
          icon="bars"
        >
          <DropdownMenu>
            <Link href="/">
              <DropdownItem text="Home" />
            </Link>
            <Link href="/tutorials">
              <DropdownItem text="Tutorials" />
            </Link>
            <Link href="/about">
              <DropdownItem text="About" />
            </Link>
            <Link href="/blog">
              <DropdownItem text="Blog" />
            </Link>
            <a href="/book-bundle">
              <DropdownItem text="Store" />
            </a>
            <Link href="/contact">
              <DropdownItem text="Contact" />
            </Link>
            <a href="/book-bundle">
              <DropdownItem className="timify-button" text="Book a Lesson" />
            </a>
          </DropdownMenu>
        </Dropdown>
        <Button className="cart-button-mobile" onClick={openCart}>
          <Icon name="shopping bag" />
          {cartCount > 0 && <Label color="red" floating circular>{cartCount}</Label>}
        </Button>
      </Menu>
      <ShoppingCart open={cartOpen} onClose={closeCart} />
    </Segment>
  );
};

export default MainHeader;
