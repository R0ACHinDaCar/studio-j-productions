import Link from "next/link";



export default function NotFound() {
  return (
    <main data-nav-theme="dark" style={styles.main}>

      <div style={styles.inner}>
        <p style={styles.code}>404</p>
        <h1 style={styles.heading}>
          This page doesn't<br />
          <em style={styles.italic}>seem to exist.</em>
        </h1>
        <p style={styles.subtext}>
          The page you're looking for may have moved or never existed.
          Let's get you back somewhere useful.
        </p>

        <div style={styles.links}>
          <Link href="/" style={styles.primaryLink}>
            Back to Home →
          </Link>
          <Link href="/book" style={styles.secondaryLink}>
            Start a Project
          </Link>
        </div>
      </div>

    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    backgroundColor: "#111111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "120px 48px",
  },

  inner: {
    maxWidth: "640px",
    textAlign: "center" as const,
  },

  code: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(80px, 12vw, 140px)",
    fontWeight: 400,
    letterSpacing: "-0.03em",
    color: "rgba(248,246,242,0.08)",
    margin: "0 0 8px",
    lineHeight: 1,
  },

  heading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(40px, 6vw, 72px)",
    fontWeight: 400,
    color: "#F8F6F2",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    margin: "0 0 24px",
  },

  italic: {
    fontStyle: "italic",
    color: "rgba(248,246,242,0.6)",
  },

  subtext: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "rgba(248,246,242,0.5)",
    margin: "0 0 48px",
  },

  links: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "32px",
    flexWrap: "wrap" as const,
  },

  primaryLink: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: "#F8F6F2",
    textDecoration: "none",
    borderBottom: "1px solid rgba(248,246,242,0.3)",
    paddingBottom: "2px",
  },

  secondaryLink: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: "rgba(248,246,242,0.4)",
    textDecoration: "none",
  },
};