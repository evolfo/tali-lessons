import React from "react";
import {
  Menu,
  Segment,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Label,
} from "semantic-ui-react";
import Link from "next/link";
import SvgIcon from "../components/SvgIcon";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useShoppingCart } from '../contexts/CartContext';
import { useCartModal } from "../contexts/CartModalContext";

import LessonButton from "../components/LessonButton";
// The cart modal is only needed once someone opens the bag, so load it on demand.
const ShoppingCart = dynamic(() => import("../components/ShoppingCart"), { ssr: false });

const MainHeader = () => {
  const { cartOpen, openCart, closeCart } = useCartModal();
  const { cartCount } = useShoppingCart();
  const { asPath } = useRouter();

  // "/about?x=1#y" -> "about"; "/" -> "home"
  const activeItem = asPath.split(/[?#]/)[0].split("/")[1] || "home";
  const cartLabel = cartCount > 0 ? `Open shopping bag, ${cartCount} items` : "Open shopping bag";

  return (
    <Segment as="header" className="navbar" inverted>
      <Menu inverted pointing secondary>
        <div className="hide-header">
          <Link
            href="/"
            className={activeItem === "home" ? "active" : ""}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={activeItem === "about" ? "active" : ""}
          >
            About
          </Link>
          <Link
            href="/tutorials"
            className={activeItem === "tutorials" ? "active" : ""}
          >
            Tutorials
          </Link>
          <Link href="/" aria-label="Tali Rubinstein - Home">
            <Image
              alt=""
              src="/img/talilogo.png"
              width={245}
              height={79}
              sizes="245px"
              loading="lazy"
              className="ui centered image"
            />
          </Link>
          <Link
            href="/blog"
            className={activeItem === "blog" ? "active" : ""}
          >
            Blog
          </Link>
          <Link href="/book-bundle" className={activeItem === "book-bundle" ? "active" : ""}>
            Store
          </Link>
          <Link
            href="/contact"
            className={activeItem === "contact" ? "active" : ""}
          >
            Contact
          </Link>
          <div className="header-buttons">
            <LessonButton />
            <Button className="cart-button" onClick={openCart} aria-label={cartLabel}>
              <SvgIcon name="shopping-bag" />
              {cartCount > 0 && <Label color="red" floating circular>{cartCount}</Label>}
            </Button>
          </div>
        </div>
        <Link aria-label="Tali Rubinstein - Home" href="/">
          <Image
            className="ui centered image header-burger"
            src="/img/talilogo.png"
            alt=""
            width={245}
            height={79}
            sizes="(max-width: 768px) 200px, 245px"
            priority
          />
        </Link>
        <Dropdown
          aria-label="Header burger"
          alt="Header burger"
          className="header-burger"
          icon={<SvgIcon name="bars" />}
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
        <Button className="cart-button-mobile" onClick={openCart} aria-label={cartLabel}>
          <SvgIcon name="shopping-bag" />
          {cartCount > 0 && <Label color="red" floating circular>{cartCount}</Label>}
        </Button>
      </Menu>
      {cartOpen && <ShoppingCart open={cartOpen} onClose={closeCart} />}
    </Segment>
  );
};

export default MainHeader;
