"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";



const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#D6C08D"; // warm gold — the one accent color

interface Service {
  slug: string;
  title: string;
  description: string;
  video: string;
  subItems: string[];
}

const services: Service[] = [
  {
    slug: "events",
    title: "Events",
    description: "Capturing the energy of live moments as they happen, without ever getting in the way.",
    video: "/hero.mp4",
    subItems: ["Corporate", "Private Celebrations", "Conferences", "Live Performances"],
  },
  {
    slug: "promotional-content",
    title: "Promotional Content",
    description: "Helping brands create cinematic stories built for the platforms your audience already lives on.",
    video: "/hero.mp4",
    subItems: ["Brand Films", "Social Media", "Product Showcases", "Launch Campaigns"],
  },
  {
    slug: "photography",
    title: "Photography",
    description: "Still frames with the same cinematic eye as our films — for brands, products, and portraits.",
    video: "/hero.mp4",
    subItems: ["Commercial", "Portraits", "Products", "Behind the Scenes"],
  },
  {
    slug: "sports",
    title: "Sports",
    description: "High-energy coverage that puts you courtside, trackside, or on the field.",
    video: "/hero.mp4",
    subItems: ["Highlight Reels", "Game Coverage", "Athlete Profiles", "Team Films"],
  },
];

export default function Services({ preview = false }: { preview?: boolean }) {
  const list = preview ? services.slice(0, 3) : services;

  
  return (
    <section data-nav-theme="dark" style={styles.section}>
      {/* Section header */}
      <motion.div
        style={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p style={styles.eyebrow}>What We Do</p>
        <h2 style={styles.heading}>
          Everything you need to tell<br />
          <em style={{ fontStyle: "italic", color: "rgba(248,246,242,0.7)" }}>your story.</em>
        </h2>
      </motion.div>

      {/* Service panels */}
      <div style={styles.panels}>
        {list.map((service, i) => (
          <ServicePanel key={service.slug} service={service} index={i} />
        ))}
      </div>

      {/* View all link — preview only */}
      {preview && (
        <motion.div
          style={styles.viewAllWrapper}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <Link href="/services" style={styles.viewAll}>
            View All Services →
          </Link>
        </motion.div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// ServicePanel
// ---------------------------------------------------------------------------

function ServicePanel({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Start video when panel comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.2 }
    );
    if (panelRef.current) observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={panelRef}
      style={styles.panel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.1 }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        src={service.video}
        muted
        loop
        playsInline
        style={{
          ...styles.video,
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Base dark overlay */}
      <div style={{
        ...styles.overlayBase,
        opacity: hovered ? 0.55 : 0.72,
        transition: "opacity 0.8s ease",
      }} />

      {/* Gradient overlay — darker at edges */}
      <div style={styles.overlayGradient} />

      {/* Subtle border */}
      <div style={styles.panelBorder} />

      {/* Content */}
      <div style={styles.panelContent}>

        {/* Index number — top left */}
        <motion.span
          style={{
            ...styles.indexNumber,
            opacity: hovered ? 0 : 0.25,
          }}
          transition={{ duration: 0.4 }}
        >
          0{index + 1}
        </motion.span>

        {/* Sub items — always visible, fade slightly on hover */}
        <motion.div
          style={styles.subItems}
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.35 }}
        >
          {service.subItems.map((item) => (
            <span key={item} style={styles.subItem}>{item}</span>
          ))}
        </motion.div>

        {/* Main content — bottom */}
        <div style={styles.mainContent}>
          {/* Title — always visible */}
          <motion.h3
            style={{
              ...styles.title,
              fontSize: hovered ? "clamp(48px, 5vw, 72px)" : "clamp(32px, 3.5vw, 48px)",
              letterSpacing: hovered ? "-0.02em" : "0.02em",
              transition: "font-size 0.6s cubic-bezier(0.22,1,0.36,1), letter-spacing 0.6s ease",
            }}
          >
            {service.title}
          </motion.h3>

          {/* Description — slides up on hover */}
          <motion.p
            style={styles.description}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 16,
            }}
            transition={{ duration: 0.5, ease: EASE, delay: hovered ? 0.1 : 0 }}
          >
            {service.description}
          </motion.p>

          {/* Learn More — slides up on hover */}
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 12,
            }}
            transition={{ duration: 0.5, ease: EASE, delay: hovered ? 0.18 : 0 }}
          >
            <Link href={`/services/${service.slug}`} style={styles.learnMore}>
              <span>Learn More</span>
              <span style={{ color: ACCENT }}> →</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: "#0a0a0a",
    padding: "140px 0 0",
  },

  header: {
    maxWidth: "1100px",
    margin: "0 auto 80px",
    padding: "0 48px",
  },

  eyebrow: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(248,246,242,0.45)",
    margin: "0 0 20px",
  },

  heading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(36px, 4.5vw, 60px)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    color: "#F8F6F2",
    margin: 0,
    lineHeight: 1.15,
  },

  panels: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "3px",
  },

  panel: {
    position: "relative",
    width: "100%",
    height: "clamp(280px, 35vw, 480px)",
    overflow: "hidden",
    
    cursor: "pointer",
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

  overlayBase: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#000000",
  },

  overlayGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
  },

  panelBorder: {
    position: "absolute",
    inset: 0,
    border: "1px solid rgba(255,255,255,0.05)",
    pointerEvents: "none" as const,
  },

  panelContent: {
    position: "absolute",
    inset: 0,
    padding: "40px 56px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
  },

  indexNumber: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.15em",
    color: "#F8F6F2",
    transition: "opacity 0.4s ease",
  },

  subItems: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px 24px",
    position: "absolute" as const,
    top: "40px",
    right: "56px",
  },

  subItem: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "rgba(248,246,242,0.35)",
  },

  mainContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
    marginTop: "auto",
  },

  title: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    
    fontWeight: 400,
    color: "#F8F6F2",
    margin: 0,
    lineHeight: 1.0,
  },

  description: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.65,
    color: "rgba(248,246,242,0.7)",
    maxWidth: "480px",
    margin: 0,
  },

  learnMore: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#F8F6F2",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },

  viewAllWrapper: {
    textAlign: "center" as const,
    padding: "64px 48px",
  },

  viewAll: {
    
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#F8F6F2",
    textDecoration: "none",
  },


};