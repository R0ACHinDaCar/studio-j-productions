"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase-client";
 
const EASE = [0.22, 1, 0.36, 1] as const;

export default function ConfirmPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Session was already exchanged by AuthRedirect before navigation.
    // Just verify it exists here.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true);
      } else {
        // No session — token may have expired or link was already used
        setError("This invite link has expired or has already been used. Please contact Studio J Productions for a new one.");
      }
      setChecking(false);
    });
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({ password });
    
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Redirect to login with a success flag so we can show a welcome message
    router.push("/portal/login?accountCreated=true");
    router.refresh();
  };

  return (
    <main data-nav-theme="light" style={styles.main}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p style={styles.eyebrow}>Client Portal</p>
        <h1 style={styles.heading}>Set Your Password</h1>
        <p style={styles.subheading}>
          Choose a password to secure your Studio J Productions portal.
        </p>

        {checking ? (
          <p style={styles.waiting}>Verifying your invitation...</p>
        ) : !sessionReady ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                style={styles.input}
                placeholder="Repeat your password"
                autoComplete="new-password"
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
              {loading ? "Saving..." : "Set Password & Enter Portal"}
            </motion.button>
          </form>
        )}
      </motion.div>
    </main>
  );
}



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
  
  waiting: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    color: "rgba(17, 17, 17, 0.45)",
    marginTop: "24px",
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