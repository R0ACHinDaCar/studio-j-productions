import Link from "next/link";



const GEAR = [
  { category: "Cinema Camera", items: ["Sony FX30"] },
  { category: "Photo Camera", items: ["Sony A7 III"] },
  { category: "Drone", items: ["DJI Mini 4 Pro"] },
  { category: "Action Camera", items: ["GoPro Hero 12"] },
  { category: "Stabilization", items: ["DJI RS3 Gimbal", "DJI RS3 Mini"] },
  { category: "Support", items: ["Studio Lighting", "Wireless Microphones", "On-set Monitors"] },
];

export default function AboutPage() {
  return (
    <main data-nav-theme="light" style={styles.main}>
      <style>{`
        @media (max-width: 768px) {
          .about-story-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-photo-wrapper {
            position: static !important;
          }
          .about-photo {
            aspect-ratio: 4 / 3 !important;
          }
          .about-hero-section {
            padding: 160px 24px 80px !important;
          }
          .about-story-section {
            padding: 72px 24px !important;
          }
          .about-philosophy-section {
            padding: 72px 24px !important;
          }
          .about-gear-section {
            padding: 72px 24px !important;
          }
          .about-cta-section {
            padding: 72px 24px !important;
          }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="about-hero-section" style={styles.heroSection}>
        <div style={styles.heroInner}>
          <p style={styles.eyebrow}>About</p>
          <h1 style={styles.heroHeading}>
            Every frame is a<br />
            <em style={styles.heroItalic}>chance to say something.</em>
          </h1>
        </div>
      </section>

      {/* ── Story + Photo ─────────────────────────────────────── */}
      <section className="about-story-section" style={styles.storySection}>
        <div className="about-story-grid" style={styles.storyGrid}>

          {/* Photo */}
          <div className="about-photo-wrapper" style={styles.photoWrapper}>
            <img
              src="/about/jake.jpg"
              alt="Jake — Studio J Productions"
              style={styles.photo}
            />
            <div style={styles.photoCaption}>
              <span style={styles.photoCaptionName}>Jake Smith</span>
              <span style={styles.photoCaptionRole}>Founder & Director</span>
            </div>
          </div>

          {/* Story text */}
          <div style={styles.storyText}>
            <p style={styles.storyEyebrow}>The Story</p>
            <h2 style={styles.storyHeading}>Built on a belief that every story deserves to be told well.</h2>

            <div style={styles.storyBody}>
              {[
                "It started at 17 with a simple but persistent belief: stories matter, and the way you tell them matters even more. I'd always been drawn to narrative — the way a well-crafted moment can make someone feel understood, inspired, or seen. When I discovered film production, I found the medium I'd been looking for. Not just a camera, but a language.",
                "What began as curiosity quickly became obsession. Every project taught me something new — about light, about pacing, about what it means to truly listen to a subject before you point a lens at them. The more stories I told, the more I cared about telling them right.",
                "One moment that's stayed with me: the summer before starting college, I was hired to produce a film for a university department. They needed someone who could tell their story — they had no idea I was about to become one of their own students. A few months later, I walked onto that same campus as a freshman. That project wasn't just a job. It was a reminder that stories have a way of coming full circle.",
                "Studio J Productions exists because I believe every brand, every athlete, every business, and every moment deserves the same level of craft and intention that I'd want for my own story. When you work with Studio J, you work directly with me — from the first conversation to the final frame.",
              ].map((para, i) => (
                <p key={i} style={{
                  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  fontSize: "16px",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "rgba(17,17,17,0.7)",
                  margin: 0,
                }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────────────────────── */}
      <section className="about-philosophy-section" style={styles.philosophySection}>
        <div style={styles.philosophyInner}>
          <p style={styles.eyebrowDark}>How We Work</p>
          <h2 style={styles.philosophyHeading}>
            Founder-led means<br />you get the best work, every time.
          </h2>
          <p style={styles.philosophyText}>
            Every project at Studio J is handled personally. No hand-offs, no miscommunication, no watered-down vision. When you bring me in, you get someone who's genuinely invested in the outcome — because my name is on it.
          </p>

          <div style={styles.pillars}>
            {[
              {
                title: "Story First",
                body: "Before touching the camera, I take the time to understand what we're really trying to say. The best visuals in the world fall flat without a clear narrative.",
              },
              {
                title: "Craft Over Speed",
                body: "I'd rather deliver something you're proud to share than something you needed yesterday. Quality takes intention, and intention takes time.",
              },
              {
                title: "Personal Investment",
                body: "Every client gets my full attention. This isn't a volume business. It's a craft — and I treat it that way.",
              },
            ].map((p) => (
              <div key={p.title} style={styles.pillar}>
                <h3 style={styles.pillarTitle}>{p.title}</h3>
                <p style={styles.pillarBody}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gear ─────────────────────────────────────────────── */}
      <section className="about-gear-section" style={styles.gearSection}>
        <div style={styles.gearInner}>
          <p style={styles.eyebrow}>The Kit</p>
          <h2 style={styles.gearHeading}>Built for any production.</h2>
          <p style={styles.gearSubtext}>
            The right equipment makes all the difference. Here's what's in the kit.
          </p>

          <div style={styles.gearGrid}>
            {GEAR.map((item) => (
              <div key={item.category} style={styles.gearItem}>
                <p style={styles.gearCategory}>{item.category}</p>
                {item.items.map((g) => (
                  <p key={g} style={styles.gearName}>{g}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="about-cta-section" style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <p style={styles.eyebrowDark}>Ready?</p>
          <h2 style={styles.ctaHeading}>
            Let's tell your story.
          </h2>
          <p style={styles.ctaText}>
            Every great project starts with a conversation. Tell me what you're working on.
          </p>
          <Link href="/book" style={styles.ctaButton}>
            Start a Project →
          </Link>
        </div>
      </section>

    </main>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  main: {
    backgroundColor: "#F8F6F2",
  },

  // ── Hero
  heroSection: {
    backgroundColor: "#111111",
    padding: "200px 48px 140px",
  },

  heroInner: {
    maxWidth: "1000px",
    margin: "0 auto",
  },

  eyebrow: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(248,246,242,0.45)",
    margin: "0 0 24px",
  },

  eyebrowDark: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(17,17,17,0.45)",
    margin: "0 0 24px",
  },

  heroHeading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(40px, 6vw, 80px)",
    fontWeight: 400,
    color: "#F8F6F2",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    margin: 0,
  },

  heroItalic: {
    fontStyle: "italic",
    color: "rgba(248,246,242,0.7)",
  },

  // ── Story
  storySection: {
    padding: "120px 48px",
    backgroundColor: "#F8F6F2",
  },

  storyGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: "80px",
    alignItems: "start",
  },

  photoWrapper: {
    position: "sticky" as const,
    top: "100px",
  },

  photo: {
    width: "100%",
    aspectRatio: "3 / 4",
    objectFit: "cover",
    borderRadius: "4px",
    display: "block",
    backgroundColor: "#1a1a1a",
  },

  photoCaption: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
    marginTop: "16px",
  },

  photoCaptionName: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "18px",
    fontWeight: 400,
    color: "#111111",
  },

  photoCaptionRole: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "rgba(17,17,17,0.45)",
  },

  storyText: {
    paddingTop: "8px",
  },

  storyEyebrow: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(17,17,17,0.45)",
    margin: "0 0 24px",
  },

  storyHeading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(28px, 3vw, 40px)",
    fontWeight: 400,
    color: "#111111",
    letterSpacing: "-0.01em",
    lineHeight: 1.25,
    margin: "0 0 40px",
  },

  storyBody: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },

  // story paragraphs use inline style in JSX

  // ── Philosophy
  philosophySection: {
    backgroundColor: "#111111",
    padding: "120px 48px",
  },

  philosophyInner: {
    maxWidth: "1000px",
    margin: "0 auto",
  },

  philosophyHeading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(30px, 4vw, 52px)",
    fontWeight: 400,
    color: "#F8F6F2",
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
    margin: "0 0 24px",
  },

  philosophyText: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "17px",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "rgba(248,246,242,0.6)",
    maxWidth: "640px",
    margin: "0 0 72px",
  },

  pillars: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "48px",
  },

  pillar: {
    borderTop: "1px solid rgba(248,246,242,0.1)",
    paddingTop: "28px",
  },

  pillarTitle: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "22px",
    fontWeight: 400,
    color: "#F8F6F2",
    margin: "0 0 12px",
  },

  pillarBody: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "rgba(248,246,242,0.55)",
    margin: 0,
  },

  // ── Gear
  gearSection: {
    backgroundColor: "#F8F6F2",
    padding: "120px 48px",
    borderBottom: "1px solid rgba(17,17,17,0.08)",
  },

  gearInner: {
    maxWidth: "1000px",
    margin: "0 auto",
  },

  gearHeading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(28px, 3.5vw, 44px)",
    fontWeight: 400,
    color: "#111111",
    letterSpacing: "-0.01em",
    margin: "0 0 16px",
  },

  gearSubtext: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.6,
    color: "rgba(17,17,17,0.55)",
    margin: "0 0 64px",
  },

  gearGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "0",
    borderTop: "1px solid rgba(17,17,17,0.1)",
  },

  gearItem: {
    padding: "28px 32px 28px 0",
    borderBottom: "1px solid rgba(17,17,17,0.1)",
  },

  gearCategory: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "rgba(17,17,17,0.4)",
    margin: "0 0 8px",
  },

  gearName: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "17px",
    fontWeight: 400,
    color: "#111111",
    margin: "0 0 4px",
  },

  // ── CTA
  ctaSection: {
    backgroundColor: "#F8F6F2",
    padding: "120px 48px",
  },

  ctaInner: {
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "center" as const,
  },

  ctaHeading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 400,
    color: "#111111",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    margin: "0 0 20px",
  },

  ctaText: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "16px",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "rgba(17,17,17,0.55)",
    margin: "0 0 44px",
  },

  ctaButton: {
    display: "inline-block",
    padding: "16px 40px",
    border: "1px solid #111111",
    borderRadius: "2px",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#111111",
    textDecoration: "none",
  },
};