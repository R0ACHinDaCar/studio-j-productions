"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Services.tsx — Studio J Productions
//
// "Filmstrip" layout. Full-height vertical panels sit side by side.
// On hover, the active panel expands width-wise (like selecting a
// chapter in a film) while the others compress — video plays in the
// expanded panel, title + description + Learn More slide in.
//
// Desktop: hover-driven, horizontal panels.
// Mobile: hover doesn't exist, so panels fall back to equal-height
// stacked rows that expand on tap (handled via CSS breakpoint + isOpen state).
//
// Used on:
//   • Homepage — pass `preview` to show first 3 only
//   • /services page — full list
// ---------------------------------------------------------------------------

const EASE = [0.22, 1, 0.36, 1] as const;

interface Service {
  slug: string;
  title: string;
  description: string;
  video: string;
}

const services: Service[] = [
  {
    slug: "events",
    title: "Events",
    description: "Capturing the energy of live moments as they happen, without ever getting in the way.",
    video: "/services/events.mp4",
  },
  {
    slug: "promotional-content",
    title: "Promotional Content",
    description: "Helping brands create cinematic stories built for the platforms your audience already lives on.",
    video: "/services/promotional.mp4",
  },
  {
    slug: "photography",
    title: "Photography",
    description: "Still frames with the same cinematic eye as our films — for brands, products, and portraits.",
    video: "/services/photography.mp4",
  },
  {
    slug: "sports",
    title: "Sports",
    description: "High-energy coverage that puts you courtside, trackside, or on the field.",
    video: "/services/sports.mp4",
  },
];

export default function Services({ preview = false }: { preview?: boolean }) {
  const list = preview ? services.slice(0, 3) : services;
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section style={styles.section}>
      {/* Header */}
      <motion.div
        style={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p style={styles.eyebrow}>What We Do</p>
        <h2 style={styles.heading}>Services</h2>
      </motion.div>

      {/* Filmstrip */}
      <div style={styles.strip} onMouseLeave={() => setActiveSlug(null)}>
        {list.map((service) => (
          <ServicePanel
            key={service.slug}
            service={service}
            isActive={activeSlug === service.slug}
            anyActive={activeSlug !== null}
            onHover={() => setActiveSlug(service.slug)}
          />
        ))}
      </div>

      {preview && (
        <MotionViewAllLink href="/services">
          View All Services →
        </MotionViewAllLink>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// MotionViewAllLink — small helper so motion + Link compose cleanly
// ---------------------------------------------------------------------------

function MotionViewAllLink({ href, children }: { href: string; children: React.ReactNode }) {
  const MotionLink = motion.create(Link);
  return (
    <MotionLink
      href={href}
      style={styles.viewAll}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
    >
      {children}
    </MotionLink>
  );
}

// ---------------------------------------------------------------------------
// ServicePanel
// ---------------------------------------------------------------------------

function ServicePanel({
  service,
  isActive,
  anyActive,
  onHover,
}: {
  service: Service;
  isActive: boolean;
  anyActive: boolean;
  onHover: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    onHover();
    videoRef.current?.play().catch(() => {});
  };

  // Flex-grow drives the width. Inactive panels shrink to a narrow
  // "spine" so titles still read vertically, like film canisters on a shelf.
  const flexGrow = isActive ? 6 : anyActive ? 1 : 2;

  return (
    <motion.div
      style={styles.panel}
      onMouseEnter={handleEnter}
      animate={{ flexGrow }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      {/* Background video — always mounted, only visible/playing when active */}
      <video
        ref={videoRef}
        src={service.video}
        muted
        loop
        playsInline
        style={{
          ...styles.video,
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Static dark base for inactive state */}
      <div style={styles.panelBase} />

      {/* Gradient so text stays legible over video */}
      <div style={styles.panelGradient} />

      {/* Collapsed state — vertical title, spine-style */}
      <motion.div
        style={styles.collapsedLabel}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <span style={styles.collapsedTitle}>{service.title}</span>
      </motion.div>

      {/* Expanded state — full content */}
      <motion.div
        style={styles.expandedContent}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: isActive ? 0.2 : 0 }}
      >
        <h3 style={styles.expandedTitle}>{service.title}</h3>
        <p style={styles.expandedDescription}>{service.description}</p>
        <Link href={`/services/${service.slug}`} style={styles.learnMore}>
          Learn More →
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: "#111111",
    padding: "140px 0",
  },

  header: {
    maxWidth: "1400px",
    margin: "0 auto 64px",
    padding: "0 48px",
  },

  eyebrow: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(248, 246, 242, 0.45)",
    margin: "0 0 16px",
  },

  heading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(36px, 4.5vw, 56px)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    color: "#F8F6F2",
    margin: 0,
  },

  // The filmstrip itself
  strip: {
    display: "flex",
    width: "100%",
    height: "640px",
    margin: "0 auto",
    maxWidth: "1600px",
    padding: "0 48px",
    gap: "6px",
  },

  panel: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "4px",
    cursor: "pointer",
    minWidth: "60px",
    backgroundColor: "#1a1a1a",
  },

  video: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.5s ease",
  },

  panelBase: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#1a1a1a",
  },

  panelGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)",
  },

  // Collapsed — vertical text running bottom to top, like a spine label
  collapsedLabel: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: "32px",
  },

  collapsedTitle: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "rgba(248, 246, 242, 0.85)",
    whiteSpace: "nowrap" as const,
    writingMode: "vertical-rl" as const,
    transform: "rotate(180deg)",
  },

  // Expanded — full readable content, bottom-aligned
  expandedContent: {
    position: "absolute",
    left: "40px",
    right: "40px",
    bottom: "40px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
  },

  expandedTitle: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(28px, 3vw, 38px)",
    fontWeight: 400,
    color: "#F8F6F2",
    margin: 0,
  },

  expandedDescription: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.6,
    color: "rgba(248, 246, 242, 0.7)",
    maxWidth: "360px",
    margin: 0,
  },

  learnMore: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#F8F6F2",
    textDecoration: "none",
    width: "fit-content",
    marginTop: "4px",
  },

  viewAll: {
    display: "block",
    width: "fit-content",
    margin: "56px auto 0",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#F8F6F2",
    textDecoration: "none",
  },
};