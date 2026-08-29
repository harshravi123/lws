"use client";

import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
} from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">

      <div className="header-inner">

        <a href="/" className="logo" aria-label="Learn With Sumit home">
          <img
            className="logo-image"
            src="/images/learn-with-sumit.webp"
            alt="Learn With Sumit"
          />
        </a>

        <nav
          className={`main-nav ${open ? "mobile-open" : ""}`}
          aria-label="Primary navigation"
        >

          <a href="#home" onClick={() => setOpen(false)}>Home</a>

          <div className="nav-dropdown">
            <button type="button" aria-haspopup="true">
              Courses
              <ChevronDown size={15} />
            </button>

            <div className="dropdown-menu">
              <a href="#courses">NDA</a>
              <a href="#courses">NDA Foundation</a>
              <a href="#courses">CDS</a>
              <a href="#courses">AFCAT</a>
              <a href="#courses">SSB</a>
            </div>
          </div>

          <div className="nav-dropdown">
            <button type="button" aria-haspopup="true">
              Student Zone
              <ChevronDown size={15} />
            </button>

            <div className="dropdown-menu">
              <a href="#testimonials">Testimonials</a>
              <a href="#results">Results</a>
              <a href="#blogs">Blogs</a>
              <a href="#resources">Resources</a>
            </div>
          </div>

          <a href="#about" onClick={() => setOpen(false)}>About Us</a>

          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>

        </nav>

        <a
          href="https://pages.razorpay.com/OnlineRegistration2024"
          className="header-register"
          onClick={() => setOpen(false)}
        >
          Register Now
        </a>

        <a
          href="tel:08047137368"
          className="header-phone"
          aria-label="Call Learn With Sumit"
        >
          <Phone size={18} />
          <span>
            <small>Talk to us</small>
            <strong>Call now</strong>
          </span>
        </a>

        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

    </header>
  );
}