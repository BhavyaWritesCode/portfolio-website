import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "This route doesn't exist in the codebase.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      data-page="404"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 5%",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Large 404 */}
      <h1
        className="gradient-text"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(120px, 20vw, 200px)",
          lineHeight: 1,
          marginBottom: "16px",
          backgroundImage: "linear-gradient(135deg, #F5A623, #FF2D78)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
        }}
      >
        404
      </h1>

      <div
        style={{
          fontFamily: "var(--font-code)",
          fontSize: "16px",
          color: "var(--starlight)",
          marginBottom: "16px",
        }}
      >
        // page_not_found.error
      </div>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "18px",
          color: "var(--text-secondary)",
          marginBottom: "48px",
          maxWidth: "400px",
        }}
      >
        This route doesn&apos;t exist in the codebase.
      </p>

      {/* Wireframe tetrahedron — CSS fallback */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: -1,
          opacity: 0.08,
          fontFamily: "var(--font-display)",
          fontSize: "400px",
          color: "var(--starlight)",
          userSelect: "none",
          pointerEvents: "none",
          animation: "spinRing 20s linear infinite",
        }}
      >
        △
      </div>

      <Link
        href="/"
        id="back-to-home"
        className="not-found-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "14px 32px",
          border: "1px solid var(--starlight)",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-heading)",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--starlight)",
          textDecoration: "none",
          transition: "all 0.25s var(--ease-out)",
        }}
      >
        ← Return to Home
      </Link>
      <style>{`
        .not-found-btn:hover {
          background: var(--starlight) !important;
          color: var(--void) !important;
          transform: translateY(-3px) !important;
          box-shadow: 0 0 24px var(--starlight-glow) !important;
        }
      `}</style>
    </div>
  );
}
