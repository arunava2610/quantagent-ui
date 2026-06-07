// src/components/IntroBanner.jsx
// Drop this file into your src/components/ folder (create the folder if it doesn't exist)
// Then import and use <IntroBanner /> at the top of your App.jsx or main page component

import { useState } from "react";

const steps = [
  {
    icon: "①",
    title: "Select Companies",
    desc: "Pick one or more NIFTY50 stocks from the dropdown below.",
  },
  {
    icon: "②",
    title: "Add Context (Optional)",
    desc: "Provide any custom notes or focus areas for the AI to consider.",
  },
  {
    icon: "③",
    title: "Generate Report",
    desc: "Our AI analyses multi-year financials and delivers a BUY / SELL / HOLD verdict with reasoning.",
  },
  {
    icon: "④",
    title: "Download or Email",
    desc: "Get your executive screening report as a Word document instantly.",
  },
];

export default function IntroBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div style={styles.wrapper}>
      {/* dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        style={styles.dismiss}
        title="Dismiss"
      >
        ✕
      </button>

      {/* header */}
      <div style={styles.header}>
        <span style={styles.badge}>AI-Powered</span>
        <h1 style={styles.title}>QuantAgent — NIFTY50 Forensic Screener</h1>
        <p style={styles.subtitle}>
          An agentic investment tool that performs deep forensic analysis on
          NIFTY50 stocks. Select your companies, and the AI models multi-year
          revenue, profitability, and debt data to issue a rated, evidence-backed
          screening report — ready to download or receive by email.
        </p>
      </div>

      {/* how it works */}
      <div style={styles.stepsRow}>
        {steps.map((s) => (
          <div key={s.icon} style={styles.step}>
            <span style={styles.stepIcon}>{s.icon}</span>
            <strong style={styles.stepTitle}>{s.title}</strong>
            <span style={styles.stepDesc}>{s.desc}</span>
          </div>
        ))}
      </div>

      {/* note */}
      <p style={styles.note}>
        ⚠️ This tool is for informational purposes only and does not constitute
        financial advice. Always conduct your own due diligence.
      </p>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    background: "linear-gradient(135deg, #0f1923 0%, #1a2d45 60%, #0f1923 100%)",
    border: "1px solid #2a4a6b",
    borderRadius: "12px",
    padding: "32px 36px 20px",
    marginBottom: "32px",
    color: "#e8f0fe",
    fontFamily: "'Georgia', serif",
    boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
  },
  dismiss: {
    position: "absolute",
    top: "14px",
    right: "16px",
    background: "none",
    border: "none",
    color: "#6b8ab0",
    fontSize: "16px",
    cursor: "pointer",
    lineHeight: 1,
    padding: "4px 8px",
    borderRadius: "4px",
  },
  header: {
    marginBottom: "24px",
  },
  badge: {
    display: "inline-block",
    background: "#1e4b8f",
    color: "#7eb8f7",
    fontSize: "11px",
    fontFamily: "monospace",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "3px 10px",
    borderRadius: "3px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "clamp(20px, 3vw, 28px)",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 10px",
    letterSpacing: "-0.3px",
  },
  subtitle: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#a8c0e0",
    margin: 0,
    maxWidth: "780px",
    fontFamily: "sans-serif",
  },
  stepsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },
  step: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  stepIcon: {
    fontSize: "18px",
    color: "#5ba3f5",
    fontFamily: "monospace",
  },
  stepTitle: {
    fontSize: "13px",
    color: "#dce8ff",
    fontFamily: "sans-serif",
    fontWeight: "600",
  },
  stepDesc: {
    fontSize: "12px",
    color: "#7a9fc4",
    lineHeight: "1.5",
    fontFamily: "sans-serif",
  },
  note: {
    fontSize: "11.5px",
    color: "#5a7a9a",
    margin: 0,
    fontFamily: "sans-serif",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    paddingTop: "14px",
  },
};
