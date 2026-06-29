"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Hero.tsx — Studio J Productions
//
// Structure:
//   • Fullscreen video background (hero.mp4 from /public)
//   • Layered overlays: dark base + subtle warm vignette
//   • Animated headline, subheadline, CTA, scroll indicator
//   • No Framer Motion dependency — pure CSS + lightweight JS
//     (swap to Framer Motion later with zero structural changes)
// ---------------------------------------------------------------------------

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  // Fade in content shortly after video is ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setLoaded(true);
      // Small delay so the first frame has painted before we animate
      setTimeout(() => setVisible(true), 100);
    };

    video.addEventListener("canplay", handleCanPlay);

    // If video is already cached and ready
    if (video.readyState >= 3) handleCanPlay();

    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);

  return (
    <section style={styles.section}>
      {/* ── Video background ─────────────────────────────────── */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          ...styles.video,
          opacity: loaded ? 1 : 0,
        }}
      />

      {/* ── Overlays ─────────────────────────────────────────── */}
      {/* Base dark layer */}
      <div style={styles.overlayDark} />
      {/* Warm cream vignette — pulls the palette toward #F8F6F2 */}
      <div style={styles.overlayVignette} />

      {/* ── Content ──────────────────────────────────────────── */}
      <div style={styles.content}>
        {/* Eyebrow label */}
        <p
          style={{
            ...styles.eyebrow,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          Cinematic Media Production
        </p>

        {/* Headline — split so each word can be styled independently later */}
        <h1
          style={{
            ...styles.headline,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0.15s",
          }}
        >
          Your Story.
          <br />
          <span style={styles.headlineItalic}>Elevated.</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            ...styles.subheadline,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "0.3s",
          }}
        >
          Premium cinematic films for businesses, brands,
          <br />
          creators, and unforgettable moments.
        </p>

        {/* CTA */}
        <div
          style={{
            ...styles.ctaWrapper,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "0.45s",
          }}
        >
          <HeroButton href="/booking">Start Your Project</HeroButton>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div
        style={{
          ...styles.scrollIndicator,
          opacity: visible ? 1 : 0,
          transitionDelay: "0.9s",
        }}
      >
        <span style={styles.scrollLabel}>Scroll</span>
        <div style={styles.scrollLine}>
          <div style={styles.scrollLineFill} />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// HeroButton — inline so this file is self-contained.
// Replace with your shared Button.tsx import once that's wired up.
// ---------------------------------------------------------------------------

function HeroButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        ...styles.button,
        backgroundColor: hovered ? "#F8F6F2" : "transparent",
        color: hovered ? "#111111" : "#F8F6F2",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Styles — plain object approach keeps this zero-dependency.
// All transitions live here so they're easy to find and swap to Framer Motion.
// ---------------------------------------------------------------------------

const TRANSITION = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    width: "100%",
    height: "100dvh",          // dynamic viewport height — handles mobile chrome bars
    minHeight: "600px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a0a0a", // shows while video loads
  },

  video: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    transition: "opacity 1.2s ease",
  },

  // Darkens the video enough to read text cleanly
  overlayDark: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.52)",
    zIndex: 1,
  },

  // Warm vignette — heavier at edges, transparent in centre
  // This ties the dark hero to the cream palette elsewhere on the page
  overlayVignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at center, transparent 30%, rgba(14, 10, 6, 0.55) 100%)",
    zIndex: 2,
  },

  content: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    padding: "0 24px",
    maxWidth: "860px",
  },

  eyebrow: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "clamp(10px, 1.2vw, 13px)",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(248, 246, 242, 0.55)",
    marginBottom: "28px",
    transition: TRANSITION,
  },

  headline: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(52px, 8vw, 112px)",
    fontWeight: 400,             // let the serif do the work — no bold needed
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    color: "#F8F6F2",
    margin: "0 0 28px",
    transition: TRANSITION,
  },

  // "Elevated." in italic — the one typographic risk
  // Italic serif on a dark cinematic frame feels editorial, not decorative
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
    transition: TRANSITION,
  },

  ctaWrapper: {
    transition: TRANSITION,
  },

  button: {
    display: "inline-block",
    padding: "16px 40px",
    border: "1px solid rgba(248, 246, 242, 0.6)",
    borderRadius: "2px",         // almost sharp — not pill, not square. intentional.
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    transition: "background-color 0.3s ease, color 0.3s ease",
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
    transition: "opacity 0.8s ease 0.9s",
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

  // The fill animates downward via CSS keyframes injected in globals.css
  scrollLineFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(248, 246, 242, 0.6)",
    animation: "scrollDrop 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
  },
};
