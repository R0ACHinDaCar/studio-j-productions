"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionLink = motion.create(Link);

const EASE = [0.22, 1, 0.36, 1] as const;
const MOBILE_BREAKPOINT = 768;

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Start a Project", href: "/book" },
  { label: "Portal", href: "/portal" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Detect section theme
  useEffect(() => {
    const checkBackground = () => {
      const navEl = document.getElementById("site-navbar");
      if (navEl) navEl.style.pointerEvents = "none";
      const el = document.elementFromPoint(window.innerWidth / 2, 30);
      if (navEl) navEl.style.pointerEvents = "";

      let node: Element | null = el;
      let theme: string | null = null;
      while (node && !theme) {
        theme = node.getAttribute("data-nav-theme");
        node = node.parentElement;
      }
      setIsDark(theme === "dark");
    };

    checkBackground();
    window.addEventListener("scroll", checkBackground, { passive: true });
    window.addEventListener("resize", checkBackground);
    return () => {
      window.removeEventListener("scroll", checkBackground);
      window.removeEventListener("resize", checkBackground);
    };
  }, [pathname]);

  const linkColor = isDark ? "rgba(248,246,242,0.9)" : "rgba(17,17,17,0.55)";
  const linkHover = isDark ? "#F8F6F2" : "#111111";
  const barColor = isDark ? "#F8F6F2" : "#111111";

  return (
    <>
      <motion.nav
        id="site-navbar"
        style={{
          ...styles.nav,
          backgroundColor: isDark
            ? "rgba(10,10,10,0.6)"
            : "rgba(248,246,242,0.82)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: isDark
            ? "0 1px 0 rgba(255,255,255,0.06)"
            : "0 1px 0 rgba(17,17,17,0.07)",
          padding: isMobile ? "12px 24px" : "12px 48px",
        }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      >
        {/* Logo */}
        <Link href="/" style={styles.navLogo}>
          <Image
            src={isDark ? "/logo-white.png" : "/logo-black.png"}
            alt="Studio J Productions"
            width={isMobile ? 72 : 88}
            height={isMobile ? 30 : 36}
            style={{ objectFit: "contain", display: "block" }}
            priority
          />
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <div style={styles.desktopLinks}>
            {NAV_LINKS.map((link) => (
              <MotionLink
                key={link.label}
                href={link.href}
                style={{
                  ...styles.navLink,
                  color: pathname === link.href ? linkHover : linkColor,
                  fontWeight: pathname === link.href ? 600 : 500,
                  textShadow: isDark ? "0 1px 8px rgba(0,0,0,0.5)" : "none",
                }}
                whileHover={{ color: linkHover }}
                transition={{ duration: 0.18 }}
              >
                {link.label}
              </MotionLink>
            ))}
          </div>
        )}

        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            style={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              style={{ ...styles.hamburgerBar, backgroundColor: barColor }}
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              style={{ ...styles.hamburgerBar, backgroundColor: barColor }}
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              style={{ ...styles.hamburgerBar, backgroundColor: barColor }}
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        )}
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            style={styles.mobileMenu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: EASE, delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  style={{
                    ...styles.mobileLink,
                    fontWeight: pathname === link.href ? 600 : 400,
                    color: pathname === link.href
                      ? "#111111"
                      : "rgba(17,17,17,0.6)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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
    transition: "background-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease",
  },

  navLogo: {
    display: "block",
    textDecoration: "none",
    flexShrink: 0,
  },

  desktopLinks: {
    display: "flex",
    alignItems: "center",
    gap: "36px",
  },

  navLink: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    letterSpacing: "0.04em",
    textDecoration: "none",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  },

  hamburger: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
  },

  hamburgerBar: {
    display: "block",
    width: "22px",
    height: "1.5px",
  },

  mobileMenu: {
    position: "fixed",
    top: "54px",
    left: 0,
    right: 0,
    zIndex: 99,
    backgroundColor: "rgba(248,246,242,0.97)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(17,17,17,0.08)",
    paddingBottom: "16px",
  },

  mobileLink: {
    display: "block",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "17px",
    letterSpacing: "0.02em",
    textDecoration: "none",
    padding: "14px 24px",
  },
};