"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = ["Events", "Promotional Content", "Photography", "Sports"];

const UPGRADES = [
  { label: "Drone Coverage", note: "Coming soon", disabled: true },
  { label: "GoPro Coverage", note: null, disabled: false },
  { label: "Expedited Editing", note: null, disabled: false },
  { label: "Photos & Video", note: null, disabled: false },
  { label: "Interviews", note: null, disabled: false },
  { label: "Full Day of Filming", note: null, disabled: false },
];

interface FormData {
  service: string;
  location: string;
  date: string;
  upgrades: string[];
  name: string;
  email: string;
  phone: string;
  details: string;
}

const EMPTY: FormData = {
  service: "",
  location: "",
  date: "",
  upgrades: [],
  name: "",
  email: "",
  phone: "",
  details: "",
};

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormData, value: string) => {
    if (key === "upgrades") {
      // upgrades passed as "||"-joined string, convert back to array
      setForm((f) => ({ ...f, upgrades: value ? value.split("||") : [] }));
    } else {
      setForm((f) => ({ ...f, [key]: value }));
    }
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    // Step 0 — Service
    <StepShell key="service" title="What are we filming?" subtitle="Choose the type of project you have in mind.">
      <div style={styles.optionGrid}>
        {SERVICES.map((s) => (
          <OptionCard
            key={s}
            label={s}
            selected={form.service === s}
            onSelect={() => { set("service", s); setTimeout(next, 300); }}
          />
        ))}
      </div>
    </StepShell>,

    // Step 1 — Location
    <StepShell key="location" title="Where?" subtitle="City, venue, or general area — wherever the project takes place.">
      <input
        type="text"
        placeholder="e.g. Atlanta, GA"
        value={form.location}
        onChange={(e) => set("location", e.target.value)}
        style={styles.input}
        autoFocus
      />
      <StepNav
        onBack={back}
        onNext={next}
        nextDisabled={!form.location.trim()}
      />
    </StepShell>,

    // Step 2 — Date
    <StepShell key="date" title="When?" subtitle="Approximate date or timeframe. Don't worry if it's not confirmed yet.">
      <input
        type="text"
        placeholder="e.g. August 2026 or not sure yet"
        value={form.date}
        onChange={(e) => set("date", e.target.value)}
        style={styles.input}
        autoFocus
      />
      <StepNav onBack={back} onNext={next} nextDisabled={!form.date.trim()} />
    </StepShell>,

    // Step 3 — Upgrades
    <StepShell key="upgrades" title="Any add-ons?" subtitle="Select everything that applies — you can choose multiple.">
      <div style={styles.optionGrid}>
        {UPGRADES.map((u) => {
          const selected = form.upgrades.includes(u.label);
          return (
            <motion.button
              key={u.label}
              disabled={u.disabled}
              onClick={() => {
                if (u.disabled) return;
                set("upgrades", selected
                  ? form.upgrades.filter((x) => x !== u.label).join("||")
                  : [...form.upgrades, u.label].join("||")
                );
              }}
              style={{
                ...styles.optionCard,
                backgroundColor: u.disabled
                  ? "rgba(17,17,17,0.04)"
                  : selected ? "#111111" : "#ffffff",
                color: u.disabled
                  ? "rgba(17,17,17,0.3)"
                  : selected ? "#F8F6F2" : "#111111",
                borderColor: u.disabled
                  ? "rgba(17,17,17,0.08)"
                  : selected ? "#111111" : "rgba(17,17,17,0.15)",
                cursor: u.disabled ? "not-allowed" : "pointer",
                position: "relative",
              }}
              whileHover={u.disabled ? {} : { scale: 1.02 }}
              whileTap={u.disabled ? {} : { scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              {u.label}
              {u.note && (
                <span style={styles.upgradeNote}>{u.note}</span>
              )}
            </motion.button>
          );
        })}
      </div>
      <div style={{ marginTop: "24px" }}>
        <StepNav onBack={back} onNext={next} nextLabel="Continue →" />
      </div>
    </StepShell>,

    // Step 4 — Contact
    <StepShell key="contact" title="Last step." subtitle="How should we reach you?">
      <div style={styles.fieldGroup}>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          style={styles.input}
          autoFocus
        />
        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="Phone number (optional)"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Anything else we should know? (optional)"
          value={form.details}
          onChange={(e) => set("details", e.target.value)}
          style={{ ...styles.input, ...styles.textarea }}
          rows={4}
        />
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <StepNav
        onBack={back}
        onNext={handleSubmit}
        nextLabel={submitting ? "Sending..." : "Send My Inquiry"}
        nextDisabled={!form.name.trim() || !form.email.trim() || submitting}
      />
    </StepShell>,
  ];

  return (
    <main data-nav-theme="light" style={styles.main}>
      <div style={styles.inner}>

        {/* Progress bar */}
        {!done && (
          <div style={styles.progressTrack}>
            <motion.div
              style={styles.progressFill}
              animate={{ width: `${((step) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        )}

        {/* Steps */}
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              style={styles.doneWrapper}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p style={styles.eyebrow}>Inquiry Received</p>
              <h1 style={styles.doneHeading}>We'll be in touch.</h1>
              <p style={styles.doneText}>
                Thanks {form.name.split(" ")[0]} — we've received your inquiry and will reach out within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {steps[step]}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// StepShell
// ---------------------------------------------------------------------------

function StepShell({ title, subtitle, children }: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div style={styles.stepShell}>
      <p style={styles.eyebrow}>Start a Project</p>
      <h1 style={styles.stepTitle}>{title}</h1>
      <p style={styles.stepSubtitle}>{subtitle}</p>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// OptionCard
// ---------------------------------------------------------------------------

function OptionCard({ label, selected, onSelect }: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      style={{
        ...styles.optionCard,
        backgroundColor: selected ? "#111111" : "#ffffff",
        color: selected ? "#F8F6F2" : "#111111",
        borderColor: selected ? "#111111" : "rgba(17,17,17,0.15)",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18 }}
    >
      {label}
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// StepNav
// ---------------------------------------------------------------------------

function StepNav({ onBack, onNext, nextDisabled, nextLabel }: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div style={styles.nav}>
      <button onClick={onBack} style={styles.backBtn}>← Back</button>
      <motion.button
        onClick={onNext}
        disabled={nextDisabled}
        style={{
          ...styles.nextBtn,
          opacity: nextDisabled ? 0.4 : 1,
          cursor: nextDisabled ? "default" : "pointer",
        }}
        whileHover={nextDisabled ? {} : { backgroundColor: "#333333" }}
        transition={{ duration: 0.2 }}
      >
        {nextLabel ?? "Continue →"}
      </motion.button>
    </div>
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
    padding: "120px 24px 80px",
  },

  inner: {
    width: "100%",
    maxWidth: "640px",
  },

  progressTrack: {
    width: "100%",
    height: "2px",
    backgroundColor: "rgba(17,17,17,0.1)",
    borderRadius: "1px",
    marginBottom: "64px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#111111",
    borderRadius: "1px",
  },

  stepShell: {
    width: "100%",
  },

  eyebrow: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(17,17,17,0.45)",
    margin: "0 0 16px",
  },

  stepTitle: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: 400,
    color: "#111111",
    letterSpacing: "-0.02em",
    margin: "0 0 12px",
    lineHeight: 1.1,
  },

  stepSubtitle: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    lineHeight: 1.6,
    color: "rgba(17,17,17,0.55)",
    margin: "0 0 40px",
  },

  optionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },

  optionCard: {
    padding: "18px 24px",
    border: "1px solid",
    borderRadius: "4px",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    fontWeight: 400,
    cursor: "pointer",
    textAlign: "left" as const,
    transition: "background-color 0.2s ease, color 0.2s ease",
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
    marginBottom: "32px",
  },

  input: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
    padding: "14px 16px",
    border: "1px solid rgba(17,17,17,0.15)",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    color: "#111111",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
    marginBottom: "0",
  },

  textarea: {
    resize: "vertical" as const,
    minHeight: "100px",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "40px",
  },

  backBtn: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: "rgba(17,17,17,0.45)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },

  nextBtn: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#F8F6F2",
    backgroundColor: "#111111",
    border: "none",
    borderRadius: "2px",
    padding: "14px 32px",
  },

  upgradeNote: {
    display: "block",
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "0.06em",
    marginTop: "4px",
    opacity: 0.6,
  },
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    color: "#b91c1c",
    margin: "0 0 16px",
  },

  doneWrapper: {
    textAlign: "center" as const,
    padding: "40px 0",
  },

  doneHeading: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: "clamp(36px, 5vw, 56px)",
    fontWeight: 400,
    color: "#111111",
    letterSpacing: "-0.02em",
    margin: "0 0 16px",
  },

  doneText: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "16px",
    fontWeight: 300,
    lineHeight: 1.7,
    color: "rgba(17,17,17,0.6)",
    margin: 0,
  },
};