"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      style={{
        ...styles.nav,
        backgroundColor: scrolled ? "rgba(10, 10, 10, 0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.06)" : "none",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
    >
      {/* Logo */}
      <Link href="/" style={styles.navLogo}>
        <Image
          src="/logo-white.png"
          alt="Studio J Productions"
          width={84}
          height={34}
          style={{ objectFit: "contain", display: "block" }}
          priority
        />
      </Link>

      {/* Nav links */}
      <div style={styles.navLinks}>
        {["Services", "About", "Work", "Book"].map((link) => (
          <NavLink key={link} href={`/${link.toLowerCase()}`}>
            {link}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}

// ---------------------------------------------------------------------------
// NavLink
// ---------------------------------------------------------------------------

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const MotionLink = motion.create(Link);
  return (
    <MotionLink
      href={href}
      style={styles.navLink}
      whileHover={{ color: "#F8F6F2" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionLink>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 48px",
    transition: "background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
  },

  navLogo: {
    display: "block",
    textDecoration: "none",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },

  navLink: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: "rgba(248, 246, 242, 0.55)",
    textDecoration: "none",
    cursor: "pointer",
  },
};