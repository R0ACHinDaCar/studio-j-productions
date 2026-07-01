"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);


const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handle = () => setTimeout(() => setReady(true), 150);
    video.addEventListener("canplay", handle);
    if (video.readyState >= 3) handle();
    return () => video.removeEventListener("canplay", handle);
  }, []);

  // Tracks scroll progress through the hero section specifically —
  // 0 when the hero's top hits the top of viewport, 1 when its
  // bottom does. We only care about the back half of that range,
  // so the fade builds in as you approach the end of the hero.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const fadeOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const fadeHeight = useTransform(scrollYProgress, [0.55, 1], ["90px", "320px"]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section ref={sectionRef} data-nav-theme="dark" style={styles.section}>

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
      {/* Base dark — increased from 0.52 to 0.68 */}
      <div style={styles.overlayDark} />
      {/* Top-to-bottom gradient — darker top, bright centre, darker bottom */}
      <div style={styles.overlayGradient} />
      {/* Radial vignette — pulls edges in */}
      <div style={styles.overlayVignette} />
      <motion.div
        style={{
          ...styles.overlayBottomFade,
          opacity: fadeOpacity,
          height: fadeHeight,
        }}
      />

      {/* ── Hero content ─────────────────────────────────────── */}
      <div style={styles.content}>

        {/* Headline — "YOUR STORY." big and bold */}
        <motion.p style={styles.headlineTop} {...fadeUp(0.25)}>
          Your Story
        </motion.p>

        {/* "Elevated." — even larger, italic, slightly dimmer */}
        <motion.p style={styles.headlineBottom} {...fadeUp(0.35)}>
          <em>Elevated.</em>
        </motion.p>

        {/* Subheadline — larger, narrower, more breathing room */}
        <motion.p style={styles.subheadline} {...fadeUp(0.5)}>
          Premium cinematic films that help businesses,
          <br />
          brands, and people leave an impression.
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(0.65)}>
          <HeroButton href="/book">Start Your Project</HeroButton>
        </motion.div>

      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        style={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1.3 }}
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
  // motion() wraps Link so we keep the hover animation while using
  // Next.js client-side routing instead of a plain <a> tag
  return (
    <MotionLink
      href={href}
      style={styles.button}
      whileHover={{ backgroundColor: "#F8F6F2", color: "#111111" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </MotionLink>
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
    minHeight: "640px",
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

  // Darker base — was 0.52, now 0.68
  overlayDark: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.68)",
    zIndex: 1,
  },

  // Top darker → centre clear → bottom darker
  // Guides the eye to the centre where the headline lives
  overlayGradient: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.5) 100%)",
    zIndex: 2,
  },

  // Edge vignette
  overlayVignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
    zIndex: 3,
  },

  // Final bottom fade — bridges the hero straight into the cream
  // background of the next section. Height and opacity are driven
  // by scroll progress (see fadeHeight/fadeOpacity above), so it
  // builds in as the hero scrolls out rather than sitting static.
  overlayBottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to bottom, transparent 0%, #F8F6F2 100%)",
    zIndex: 4,
    pointerEvents: "none" as const,
  },

  // ── Navbar
  // ── Content
  content: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    padding: "0 24px",
    maxWidth: "900px",
    // Push down to clear the navbar
    marginTop: "60px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "0px",
    paddingBottom: "100px",
  },

  // "Your Story." — large, bold, serif
  headlineTop: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(56px, 9vw, 120px)",
    fontWeight: 700,
    lineHeight: 1.0,
    letterSpacing: "-0.03em",
    color: "#F8F6F2",
    margin: "0 0 8px",
  },

  // "Elevated." — even larger, italic, slightly translucent
  headlineBottom: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(64px, 10.5vw, 140px)",
    fontWeight: 400,
    fontStyle: "italic",
    lineHeight: 1.0,
    letterSpacing: "-0.03em",
    color: "rgba(248, 246, 242, 0.8)",
    margin: "0 0 52px",
  },

  // Larger, narrower, more air
  subheadline: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "clamp(16px, 2vw, 22px)",
    fontWeight: 300,
    lineHeight: 1.8,
    color: "rgba(248, 246, 242, 0.6)",
    margin: "0 0 44px",
    maxWidth: "480px",
  },

  button: {
    display: "inline-block",
    padding: "18px 48px",
    border: "1px solid rgba(248, 246, 242, 0.5)",
    borderRadius: "2px",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    color: "#F8F6F2",
    backgroundColor: "transparent",
    cursor: "pointer",
  },

  // ── Scroll
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
    color: "rgba(248, 246, 242, 0.35)",
  },

  scrollLine: {
    width: "1px",
    height: "48px",
    backgroundColor: "rgba(248, 246, 242, 0.12)",
    overflow: "hidden",
  },

  scrollLineFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(248, 246, 242, 0.55)",
    animation: "scrollDrop 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
  },
};