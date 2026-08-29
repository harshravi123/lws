"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";

export function Logo() {
  return <Link href="/" className="lws-logo" aria-label="Learn With Sumit home"><Image src="/images/learn-with-sumit.webp" alt="Learn With Sumit" width={220} height={150} priority /></Link>;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    fetch("/api/auth/session").then((response) => response.json()).then((session) => setIsAdmin(session.authenticated === true)).catch(() => undefined);
  }, []);

  return <header className="lws-header">
    <div className="header-contact-bar"><div className="header-contact-inner"><span>Online</span><a href="tel:08047137368">08047137368</a><a href="mailto:learnwithsumitsir@gmail.com">learnwithsumitsir@gmail.com</a></div></div>
    <AnnouncementBar />
    <div className="lws-header-inner">
      <Logo />
      <nav className={menuOpen ? "lws-nav is-open" : "lws-nav"} aria-label="Main navigation">
        <Link href="/courses" onClick={closeMenu}>Courses</Link>
        <Link href="/#experience" onClick={closeMenu}>Our approach</Link>
        <Link href="/#stories" onClick={closeMenu}>Results</Link>
        <Link href="/#about" onClick={closeMenu}>About LWS</Link>
        <Link href="/#contact" onClick={closeMenu}>Contact</Link>
        <Link href="/courses" className="nav-cta" onClick={closeMenu}>Join a batch <ArrowRight size={15} /></Link>
        {isAdmin && <Link href="/dashboard" className="admin-nav-link" onClick={closeMenu}>Dashboard <ArrowRight size={15} /></Link>}
      </nav>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
    </div>
  </header>;
}
