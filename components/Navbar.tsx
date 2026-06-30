"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionLink = motion.create(Link);

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the dark-mode switch near the end of the hero's full-height
      // section, not immediately on scroll — keeps white logo/text legible
      // against the dark hero for as long as it's actually on screen.
      const threshold = window.innerHeight * 0.85;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The homepage has a dark, full-bleed hero behind the nav, so the
  // logo and links should start light and only react to scroll there.
  // Every other page (portal, services, etc.) has a light background
  // from the very top, so the nav should always render in "dark mode."
  const isHomepage = pathname === "/";
  const isDark = isHomepage ? scrolled : true;

  return (
    <motion.nav
      style={{
        ...styles.nav,
        backgroundColor: isHomepage
          ? scrolled
            ? "rgba(10, 10, 10, 0.7)"
            : "transparent"
          : "rgba(248, 246, 242, 0.85)",
        backdropFilter: isHomepage && !scrolled ? "none" : "blur(12px)",
        WebkitBackdropFilter: isHomepage && !scrolled ? "none" : "blur(12px)",
        boxShadow: !isHomepage
          ? "0 1px 0 rgba(17,17,17,0.08)"
          : scrolled
          ? "0 1px 0 rgba(255,255,255,0.06)"
          : "none",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
    >
      {/* Logo — swaps based on background */}
      <Link href="/" style={styles.navLogo}>
        <Image
          src={isDark ? "/logo-black.png" : "/logo-white.png"}
          alt="Studio J Productions"
          width={84}
          height={34}
          style={{ objectFit: "contain", display: "block" }}
          priority
        />
      </Link>

      {/* Nav links */}
      <div style={styles.navLinks}>
        {[
          { label: "Services", href: "/services" },
          { label: "About", href: "/about" },
          { label: "Work", href: "/work" },
          { label: "Book", href: "/book" },
          { label: "Portal", href: "/portal" },
        ].map((link) => (
          <NavLink key={link.label} href={link.href} dark={isDark}>
            {link.label}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}

// ---------------------------------------------------------------------------
// NavLink
// ---------------------------------------------------------------------------

function NavLink({
  href,
  children,
  dark,
}: {
  href: string;
  children: React.ReactNode;
  dark: boolean;
}) {
  return (
    <MotionLink
      href={href}
      style={{
        ...styles.navLink,
        color: dark ? "rgba(17, 17, 17, 0.6)" : "rgba(248, 246, 242, 0.55)",
      }}
      whileHover={{ color: dark ? "#111111" : "#F8F6F2" }}
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
    textDecoration: "none",
    cursor: "pointer",
  },
};