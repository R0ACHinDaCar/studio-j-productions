"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Hero.tsx — Studio J Productions
// Updated: Framer Motion animations, white logo, eyebrow removed
// ---------------------------------------------------------------------------

// Shared easing used across all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const;

// Each content element staggers in from below
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      setTimeout(() => setContentReady(true), 200);
    };

    video.addEventListener("canplay", handleCanPlay);
    if (video.readyState >= 3) handleCanPlay();

    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);

  return (
    <section style={styles.section}>

      {/* ── Video ──────────────────────────────────────────────── */}
      <motion.video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={styles.video}
        animate={{ opacity: videoLoaded ? 1 : 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      {/* ── Overlays ───────────────────────────────────────────── */}
      <div style={styles.overlayDark} />
      <div style={styles.overlayVignette} />

      {/* ── Logo — top center, fades in first ──────────────────── */}
      <AnimatePresence>
        {contentReady && (
          <motion.div
            style={styles.logoWrapper}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
          >
            <Image
              src="/logo-white.png"
              alt="Studio J Productions"
              width={160}
              height={60}
              style={styles.logo}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main content ───────────────────────────────────────── */}
      <div style={styles.content}>

        {/* Headline */}
        <AnimatePresence>
          {contentReady && (
            <motion.h1 style={styles.headline} {...fadeUp(0.2)}>
              Your Story.
              <br />
              <span style={styles.headlineItalic}>Elevated.</span>
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Subheadline */}
        <AnimatePresence>
          {contentReady && (
            <motion.p style={styles.subheadline} {...fadeUp(0.38)}>
              Premium cinematic films for businesses, brands,
              <br />
              creators, and unforgettable moments.
            </motion.p>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {contentReady && (
            <motion.div {...fadeUp(0.54)}>
              <HeroButton href="/booking">Start Your Project</HeroButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────── */}
      <AnimatePresence>
        {contentReady && (
          <motion.div
            style={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.1 }}
          >
            <span style={styles.scrollLabel}>Scroll</span>
            <div style={styles.scrollLine}>
              <div style={styles.scrollLineFill} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// ---------------------------------------------------------------------------
// HeroButton
// ---------------------------------------------------------------------------

function HeroButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      style={styles.button}
      whileHover={{
        backgroundColor: "#F8F6F2",
        color: "#111111",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
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
    background:
      "radial-gradient(ellipse at center, transparent 30%, rgba(14, 10, 6, 0.6) 100%)",
    zIndex: 2,
  },

  // Logo sits at the top of the hero, centered, above the headline
  logoWrapper: {
    position: "absolute",
    top: "44px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20,
  },

  logo: {
    objectFit: "contain",
    display: "block",
  },

  content: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    padding: "0 24px",
    maxWidth: "860px",
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
