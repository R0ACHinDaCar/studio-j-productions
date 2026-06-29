"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Hero.tsx — Studio J Productions
// ---------------------------------------------------------------------------

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handle = () => setTimeout(() => setReady(true), 150);
    video.addEventListener("canplay", handle);
    if (video.readyState >= 3) handle();
    return () => video.removeEventListener("canplay", handle);
  }, []);

  // Reusable fade-up variant factory
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.85, ease: EASE, delay },
  });

  return (
    <section style={styles.section}>

      {/* ── Video ────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          ...styles.video,
          opacity: ready ? 1 : 0,
          transition: "opacity 1.4s ease",
        }}
      />

      {/* ── Overlays ─────────────────────────────────────────── */}
      <div style={styles.overlayDark} />
      <div style={styles.overlayVignette} />

      {/* ── Logo ─────────────────────────────────────────────── */}
      <motion.div
        style={styles.logoWrapper}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
      >
        <Image
          src="/logo-white.png"
          alt="Studio J Productions"
          width={120}
          height={48}
          style={styles.logo}
          priority
        />
      </motion.div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div style={styles.content}>

        <motion.h1 style={styles.headline} {...fadeUp(0.25)}>
          Your Story.
          <br />
          <span style={styles.headlineItalic}>Elevated.</span>
        </motion.h1>

        <motion.p style={styles.subheadline} {...fadeUp(0.42)}>
          Premium cinematic films for businesses, brands,
          <br />
          creators, and unforgettable moments.
        </motion.p>

        <motion.div {...fadeUp(0.58)}>
          <HeroButton href="/booking">Start Your Project</HeroButton>
        </motion.div>

      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        style={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
      >
        <span style={styles.scrollLabel}>Scroll</span>
        <div style={styles.scrollLine}>
          <div style={styles.scrollLineFill} />
        </div>
      </motion.div>

    </section>
  );
}

// ---------------------------------------------------------------------------
// HeroButton
// ---------------------------------------------------------------------------

function HeroButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      style={styles.button}
      whileHover={{ backgroundColor: "#F8F6F2", color: "#111111" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.a>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    width: "100%",
    height: "100dvh",
    minHeight: "600px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a0a0a",
  },

  video: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },

  overlayDark: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.52)",
    zIndex: 1,
  },

  overlayVignette: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at center, transparent 30%, rgba(14, 10, 6, 0.6) 100%)",
    zIndex: 2,
  },

  logoWrapper: {
    position: "absolute",
    top: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20,
  },

  logo: {
    objectFit: "contain",
    display: "block",
    // Drop any baked-in shadow/border from the PNG by keeping it small and clean
    filter: "drop-shadow(0 0 0 transparent)",
  },

  content: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    padding: "0 24px",
    maxWidth: "860px",
    // Push content down slightly so it doesn't crowd the logo
    marginTop: "80px",
  },

  headline: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(52px, 8vw, 112px)",
    fontWeight: 400,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    color: "#F8F6F2",
    margin: "0 0 28px",
  },

  headlineItalic: {
    fontStyle: "italic",
    color: "rgba(248, 246, 242, 0.85)",
  },

  subheadline: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "clamp(15px, 1.8vw, 19px)",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "rgba(248, 246, 242, 0.65)",
    margin: "0 0 48px",
  },

  button: {
    display: "inline-block",
    padding: "16px 40px",
    border: "1px solid rgba(248, 246, 242, 0.6)",
    borderRadius: "2px",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    color: "#F8F6F2",
    backgroundColor: "transparent",
    cursor: "pointer",
  },

  scrollIndicator: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "10px",
  },

  scrollLabel: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "10px",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(248, 246, 242, 0.4)",
  },

  scrollLine: {
    width: "1px",
    height: "48px",
    backgroundColor: "rgba(248, 246, 242, 0.15)",
    overflow: "hidden",
  },

  scrollLineFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(248, 246, 242, 0.6)",
    animation: "scrollDrop 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
  },
};
