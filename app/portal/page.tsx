import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";



export default async function PortalPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  // Find the client record linked to this auth user
  const { data: client } = await supabase
    .from("clients")
    .select("id, name, email")
    .eq("auth_user_id", user.id)
    .single();

  if (!client) {
    // Logged in, but no matching client row — shouldn't normally happen,
    // but fail gracefully instead of crashing.
    return (
      <main data-nav-theme="light" style={styles.main}>
        <div style={styles.errorBox}>
          <p style={styles.errorText}>
            We couldn&apos;t find an account linked to this login. Please
            contact Studio J Productions for help.
          </p>
        </div>
      </main>
    );
  }

  // Fetch this client's projects
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, title, status, description, nas_link, invoice_link, thumbnail_url, created_at")
    .eq("client_id", client.id)
    .order("created_at", { ascending: false });

  // ── TEMPORARY DEBUG BLOCK — remove once the issue is resolved ──────
  const DEBUG = true;
  if (DEBUG) {
    return (
      <main style={{ padding: "160px 48px", fontFamily: "monospace", fontSize: "13px", whiteSpace: "pre-wrap" }}>
        <h1 style={{ fontSize: "20px", marginBottom: "24px" }}>Portal Debug Output</h1>
        <p><strong>Logged-in user.id:</strong> {user.id}</p>
        <p><strong>Matched client.id:</strong> {client.id}</p>
        <p><strong>Matched client.name:</strong> {client.name}</p>
        <p><strong>projectsError:</strong> {JSON.stringify(projectsError, null, 2)}</p>
        <p><strong>projects returned:</strong> {JSON.stringify(projects, null, 2)}</p>
      </main>
    );
  }
  // ── END DEBUG BLOCK ─────────────────────────────────────────────────

  return (
    <main data-nav-theme="light" style={styles.main}>
      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <p style={styles.eyebrow}>Client Portal</p>
          <h1 style={styles.heading}>Welcome, {client.name.split(" ")[0]}</h1>
        </div>

        {/* Projects */}
        <div style={styles.projectList}>
          {!projects || projects.length === 0 ? (
            <p style={styles.empty}>No projects yet — check back soon.</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} style={styles.projectCard}>
                {/* Thumbnail — only renders if a URL is set */}
                {project.thumbnail_url && (
                  <div style={styles.thumbnailWrapper}>
                    <img
                      src={project.thumbnail_url}
                      alt={project.title}
                      style={styles.thumbnail}
                    />
                  </div>
                )}

                <div style={styles.cardContent}>
                  <div style={styles.projectHeader}>
                    <h2 style={styles.projectTitle}>{project.title}</h2>
                    <span style={styles.statusBadge}>{project.status}</span>
                  </div>

                  {project.description && (
                    <p style={styles.projectDescription}>{project.description}</p>
                  )}

                  <div style={styles.linkRow}>
                    {project.nas_link && (
                      <a
                        href={project.nas_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.linkButton}
                      >
                        View Files →
                      </a>
                    )}
                    {project.invoice_link && (
                      <a
                        href={project.invoice_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.linkButton}
                      >
                        View Invoice →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    backgroundColor: "#F8F6F2",
    padding: "160px 48px 100px",
  },

  inner: {
    maxWidth: "880px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "56px",
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
    fontSize: "clamp(32px, 4vw, 48px)",
    fontWeight: 400,
    color: "#111111",
    margin: 0,
  },

  projectList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },

  empty: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    color: "rgba(17, 17, 17, 0.5)",
  },

  projectCard: {
    display: "flex",
    flexDirection: "row" as const,
    backgroundColor: "#ffffff",
    border: "1px solid rgba(17, 17, 17, 0.1)",
    borderRadius: "4px",
    overflow: "hidden",
  },

  thumbnailWrapper: {
    flexShrink: 0,
    width: "220px",
    minHeight: "100%",
    backgroundColor: "#1a1a1a",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  cardContent: {
    flex: 1,
    padding: "32px",
    minWidth: 0, // allows text to wrap properly inside flex child
  },

  projectHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
    flexWrap: "wrap" as const,
    gap: "12px",
  },

  projectTitle: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "24px",
    fontWeight: 400,
    color: "#111111",
    margin: 0,
  },

  statusBadge: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#111111",
    backgroundColor: "rgba(17, 17, 17, 0.06)",
    padding: "6px 14px",
    borderRadius: "20px",
  },

  projectDescription: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.6,
    color: "rgba(17, 17, 17, 0.6)",
    margin: "0 0 24px",
  },

  linkRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap" as const,
  },

  linkButton: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.05em",
    color: "#111111",
    textDecoration: "none",
    border: "1px solid rgba(17, 17, 17, 0.2)",
    borderRadius: "2px",
    padding: "10px 20px",
  },

  errorBox: {
    maxWidth: "480px",
    margin: "0 auto",
    textAlign: "center" as const,
  },

  errorText: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    color: "rgba(17, 17, 17, 0.6)",
  },
};