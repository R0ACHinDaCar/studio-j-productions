"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase-client";


const EASE = [0.22, 1, 0.36, 1] as const;

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    router.push("/portal");
    router.refresh();
  };

  return (
    <main style={styles.main}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p style={styles.eyebrow}>Client Portal</p>
        <h1 style={styles.heading}>Welcome Back</h1>
        <p style={styles.subheading}>
          Sign in to view your project, files, and updates.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              autoComplete="email"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              autoComplete="current-password"
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <motion.button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "default" : "pointer",
            }}
            whileHover={loading ? {} : { backgroundColor: "#111111", color: "#F8F6F2" }}
            transition={{ duration: 0.22 }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    textAlign: "center" as const,
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
    fontSize: "clamp(32px, 4vw, 44px)",
    fontWeight: 400,
    color: "#111111",
    margin: "0 0 12px",
  },

  subheading: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.6,
    color: "rgba(17, 17, 17, 0.55)",
    margin: "0 0 40px",
  },

  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    textAlign: "left" as const,
  },

  field: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },

  label: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.05em",
    color: "rgba(17, 17, 17, 0.6)",
  },

  input: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    padding: "14px 16px",
    border: "1px solid rgba(17, 17, 17, 0.15)",
    borderRadius: "2px",
    backgroundColor: "#ffffff",
    color: "#111111",
    outline: "none",
  },

  error: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    color: "#b91c1c",
    margin: 0,
  },

  button: {
    marginTop: "12px",
    padding: "16px",
    border: "1px solid #111111",
    borderRadius: "2px",
    backgroundColor: "transparent",
    color: "#111111",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  },
};