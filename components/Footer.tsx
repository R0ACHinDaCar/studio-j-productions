import Link from "next/link";
import Image from "next/image";




const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Start a Project", href: "/book" },
  { label: "Portal", href: "/portal" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-nav-theme="dark" style={styles.footer}>

      {/* Top row — logo, links, social */}
      <div style={styles.top}>

        {/* Logo */}
        <Link href="/" style={styles.logoLink}>
          <Image
            src="/logo-white.png"
            alt="Studio J Productions"
            width={150}
            height={60}
            style={{ objectFit: "contain", display: "block" }}
          />
        </Link>

        {/* Nav links — center */}
        <nav style={styles.links}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} style={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social — right */}
        <div style={styles.social}>
          <a
            href="https://www.instagram.com/studiojproductions"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
            aria-label="Studio J Productions on Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Bottom row — copyright */}
      <div style={styles.bottom}>
        <p style={styles.copyright}>
          © {year} Studio J Productions. All rights reserved.
        </p>
        <p style={styles.location}>
          Atlanta, Georgia
        </p>
      </div>

    </footer>
  );
}

// ---------------------------------------------------------------------------
// Instagram SVG icon
// ---------------------------------------------------------------------------

function InstagramIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: "#111111",
    padding: "72px 48px 40px",
  },

  top: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    gap: "32px",
    marginBottom: "48px",
  },

  logoLink: {
    display: "block",
    textDecoration: "none",
    flexShrink: 0,
    flexBasis: "160px",
  },

  links: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "48px",
    flexWrap: "wrap" as const,
    flex: 1,
  },

  link: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: "rgba(248, 246, 242, 0.5)",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },

  social: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "16px",
    flexShrink: 0,
    flexBasis: "160px",
  },

  socialLink: {
    color: "rgba(248, 246, 242, 0.5)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s ease",
  },

  divider: {
    height: "1px",
    backgroundColor: "rgba(248, 246, 242, 0.08)",
    marginBottom: "32px",
  },

  bottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    gap: "8px",
  },

  copyright: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    color: "rgba(248, 246, 242, 0.3)",
    margin: 0,
  },

  location: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    color: "rgba(248, 246, 242, 0.3)",
    margin: 0,
  },
};