"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);


const EASE = [0.22, 1, 0.36, 1] as const;

interface Project {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  video: string;
}

// ── Placeholder data — replace with real projects ───────────────────────
const projects: Project[] = [
  {
    slug: "placeholder-one",
    title: "Project Title One",
    category: "Commercial",
    thumbnail: "/projects/placeholder-1.JPG",
    video: "/projects/placeholder-1.mp4",
  },
  {
    slug: "placeholder-two",
    title: "Project Title Two",
    category: "Wedding",
    thumbnail: "/projects/placeholder-2.JPG",
    video: "/projects/placeholder-2.mp4",
  },
  {
    slug: "placeholder-three",
    title: "Project Title Three",
    category: "Sports",
    thumbnail: "/projects/placeholder-3.JPG",
    video: "/projects/placeholder-3.mp4",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  // Same approach as Hero's bottom fade — builds in only during the
  // back half of this section's scroll range, easing the cream
  // background into the black Services filmstrip below.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const fadeOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const fadeHeight = useTransform(scrollYProgress, [0.55, 1], ["100px", "420px"]);

  return (
    <section ref={sectionRef} data-nav-theme="light" style={styles.section}>
      {/* Section header */}
      <motion.div
        style={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p style={styles.eyebrow}>Selected Work</p>
        <h2 style={styles.heading}>Featured Projects</h2>
      </motion.div>

      {/* Project grid */}
      <div style={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/* Bottom fade — bridges this section's cream background into
          the black Services filmstrip below, builds in on scroll. */}
      <motion.div
        style={{
          ...styles.bottomFade,
          opacity: fadeOpacity,
          height: fadeHeight,
        }}
      />
    </section>
  );
}

// ---------------------------------------------------------------------------
// ProjectCard
// ---------------------------------------------------------------------------

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {
      // Autoplay can be blocked before user interaction — safe to ignore
    });
  };

  const handleLeave = () => {
    setHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <MotionLink
      href={`/work/${project.slug}`}
      style={styles.card}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.12 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Media — thumbnail + video cross-fade, both inside a lifting wrapper */}
      <motion.div
        style={styles.mediaWrapper}
        animate={{
          y: hovered ? -8 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Static thumbnail */}
        <img
          src={project.thumbnail}
          alt={project.title}
          style={{
            ...styles.media,
            opacity: hovered ? 0 : 1,
          }}
        />

        {/* Video preview — fades in on hover */}
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          style={{
            ...styles.media,
            position: "absolute",
            inset: 0,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Subtle dark gradient so the label is always legible */}
        <div style={styles.mediaOverlay} />

        {/* Card label */}
        <div style={styles.cardLabel}>
          <p style={styles.cardCategory}>{project.category}</p>
          <h3 style={styles.cardTitle}>{project.title}</h3>
        </div>
      </motion.div>
    </MotionLink>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    backgroundColor: "#F8F6F2",
    padding: "180px 48px 280px",
    overflow: "hidden",
  },

  // Fades from transparent into solid black, anchored to the bottom
  // edge — bridges into the Services filmstrip section below.
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to bottom, transparent 0%, #111111 100%)",
    pointerEvents: "none" as const,
  },

  header: {
    maxWidth: "1400px",
    margin: "0 auto 28px",
  },

  eyebrow: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(17, 17, 17, 0.45)",
    margin: "0 0 16px",
  },

  heading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(36px, 4.5vw, 56px)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    color: "#111111",
    margin: 0,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "32px",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  card: {
    display: "block",
    textDecoration: "none",
    cursor: "pointer",
  },

  mediaWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: "4 / 5",
    borderRadius: "4px",
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },

  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.45s ease",
  },

  mediaOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)",
    pointerEvents: "none",
  },

  cardLabel: {
    position: "absolute",
    left: "24px",
    right: "24px",
    bottom: "24px",
  },

  cardCategory: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "rgba(248, 246, 242, 0.7)",
    margin: "0 0 6px",
  },

  cardTitle: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "22px",
    fontWeight: 400,
    color: "#F8F6F2",
    margin: 0,
  },
};