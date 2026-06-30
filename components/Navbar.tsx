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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const probeY = 30;
      const probeX = window.innerWidth / 2;

      // The navbar itself sits at this exact point (it's position:
      // fixed, top:0), so elementFromPoint would just find the nav's
      // own DOM and never see what's actually behind it. Temporarily
      // disable pointer-events on the nav so the probe sees through it.
      const navEl = document.getElementById("site-navbar");
      if (navEl) navEl.style.pointerEvents = "none";

      const stack = document.elementFromPoint(probeX, probeY);

      if (navEl) navEl.style.pointerEvents = "";

      let el: Element | null = stack;
      let theme: string | null = null;
      while (el && !theme) {
        theme = el.getAttribute("data-nav-theme");
        el = el.parentElement;
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

  const showLightBar = isDark;

  return (
    <motion.nav
      id="site-navbar"
      style={{
        ...styles.nav,
        backgroundColor: showLightBar
          ? "rgba(248, 246, 242, 0.75)"
          : "transparent",
        backdropFilter: showLightBar ? "blur(8px)" : "none",
        WebkitBackdropFilter: showLightBar ? "blur(8px)" : "none",
        boxShadow: showLightBar ? "0 1px 0 rgba(17,17,17,0.08)" : "none",
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