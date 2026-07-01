"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionLink = motion.create(Link);

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Start a Project", href: "/book" },
  { label: "Portal", href: "/portal" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

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

  return (
    <motion.nav
      id="site-navbar"
      style={{
        ...styles.nav,
        backgroundColor: isDark
          ? "transparent"
          : "rgba(248, 246, 242, 0.82)",
        backdropFilter: isDark ? "none" : "blur(10px)",
        WebkitBackdropFilter: isDark ? "none" : "blur(10px)",
        boxShadow: isDark ? "none" : "0 1px 0 rgba(17,17,17,0.07)",
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
          width={88}
          height={36}
          style={{ objectFit: "contain", display: "block" }}
          priority
        />
      </Link>

      {/* Links */}
      <div style={styles.navLinks}>
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.label}
            href={link.href}
            dark={isDark}
            active={pathname === link.href}
          >
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
  active,
}: {
  href: string;
  children: React.ReactNode;
  dark: boolean;
  active: boolean;
}) {
  const baseColor = dark
    ? "rgba(248, 246, 242, 0.9)"
    : "rgba(17, 17, 17, 0.55)";
  const hoverColor = dark ? "#F8F6F2" : "#111111";
  const activeColor = dark ? "#F8F6F2" : "#111111";

  return (
    <MotionLink
      href={href}
      style={{
        ...styles.navLink,
        color: active ? activeColor : baseColor,
        fontWeight: active ? 600 : 500,
        textShadow: dark ? "0 1px 8px rgba(0,0,0,0.5)" : "none",
      }}
      whileHover={{ color: hoverColor }}
      transition={{ duration: 0.18 }}
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
    padding: "12px 48px",
    transition:
      "background-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease",
  },

  navLogo: {
    display: "block",
    textDecoration: "none",
    flexShrink: 0,
  },

  navLinks: {
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
};