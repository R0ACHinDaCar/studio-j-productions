"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);

const EASE = [0.22, 1, 0.36, 1] as const;
const MOBILE_BREAKPOINT = 768;

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
  const [isMobile, setIsMobile] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section data-nav-theme="dark" style={styles.section}>
      {/* Header */}
      <motion.div
        style={{
          ...styles.header,
          padding: isMobile ? "0 24px" : "0 48px",
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p style={styles.eyebrow}>What We Do</p>
        <h2 style={styles.heading}>Services</h2>
      </motion.div>

      {/* Desktop: filmstrip */}
      {!isMobile && (
        <div style={styles.strip} onMouseLeave={() => setActiveSlug(null)}>
          {list.map((service) => (
            <DesktopPanel
              key={service.slug}
              service={service}
              isActive={activeSlug === service.slug}
              anyActive={activeSlug !== null}
              onHover={() => setActiveSlug(service.slug)}
            />
          ))}
        </div>
      )}

      {/* Mobile: accordion */}
      {isMobile && (
        <div style={styles.accordion}>
          {list.map((service, i) => (
            <MobileRow
              key={service.slug}
              service={service}
              index={i}
              isOpen={openSlug === service.slug}
              onToggle={() =>
                setOpenSlug(openSlug === service.slug ? null : service.slug)
              }
            />
          ))}
        </div>
      )}

      {preview && (
        <div style={{ textAlign: "center", padding: isMobile ? "40px 24px 0" : "56px 48px 0" }}>
          <MotionLink
            href="/services"
            style={styles.viewAll}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            View All Services →
          </MotionLink>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Desktop Panel — unchanged filmstrip behavior
// ---------------------------------------------------------------------------

function DesktopPanel({
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

  
  const flexGrow = isActive ? 6 : anyActive ? 1 : 2;

  return (
    <motion.div
      style={styles.panel}
      onMouseEnter={handleEnter}
      animate={{ flexGrow }}
      transition={{ duration: 0.65, ease: EASE }}
    >
   
      <video
        ref={videoRef}
        src={service.video}
        muted
        loop
        playsInline
        style={{ ...styles.video, opacity: isActive ? 1 : 0 }}
      />
      
      <div style={styles.panelBase} />
      
      <div style={styles.panelGradient} />

      
      <motion.div
        style={styles.collapsedLabel}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <span style={styles.collapsedTitle}>{service.title}</span>
      </motion.div>

     
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
// Mobile Row — tap-to-expand accordion
// ---------------------------------------------------------------------------

function MobileRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      style={styles.mobileRow}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
    >
      {/* Tap header */}
      <button onClick={onToggle} style={styles.mobileRowHeader}>
        <span style={styles.mobileRowTitle}>{service.title}</span>
        <motion.span
          style={styles.mobileRowIcon}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          +
        </motion.span>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={styles.mobileRowContent}>
              <p style={styles.mobileRowDescription}>{service.description}</p>
              <Link href={`/services/${service.slug}`} style={styles.mobileLearnMore}>
                Learn More →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div style={styles.mobileDivider} />
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

  // ── Desktop filmstrip
  strip: {
    display: "flex",
    width: "100%",
    height: "640px",
   
    maxWidth: "1600px",
    margin: "0 auto",
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
    display: "inline-block",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#F8F6F2",
    textDecoration: "none",
  },

  // ── Mobile accordion
  accordion: {
    padding: "0 24px",
  },

  mobileRow: {
    position: "relative",
  },

  mobileRowHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 0",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left" as const,
  },

  mobileRowTitle: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(22px, 5vw, 30px)",
    fontWeight: 400,
    color: "#F8F6F2",
    letterSpacing: "-0.01em",
  },

  mobileRowIcon: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "24px",
    fontWeight: 300,
    color: "rgba(248, 246, 242, 0.6)",
    lineHeight: 1,
    flexShrink: 0,
  },

  mobileRowContent: {
    paddingBottom: "24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },

  mobileRowDescription: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "rgba(248, 246, 242, 0.65)",
    margin: 0,
  },

  mobileLearnMore: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#F8F6F2",
    textDecoration: "none",
    width: "fit-content",
  },

  mobileDivider: {
    height: "1px",
    backgroundColor: "rgba(248, 246, 242, 0.1)",
  },
};