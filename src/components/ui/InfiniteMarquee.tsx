"use client";

import { MARQUEE_SKILLS } from "@/lib/constants";

export default function InfiniteMarquee() {
  // Duplicate for seamless loop
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];

  return (
    <div
      aria-label="Skills marquee"
      style={{
        height: "48px",
        overflow: "hidden",
        borderTop: "0.5px solid rgba(168, 200, 255,0.35)",
        borderBottom: "0.5px solid rgba(168, 200, 255,0.35)",
        display: "flex",
        alignItems: "center",
        background: "rgba(168, 200, 255,0.03)",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(90deg, var(--void) 0%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(270deg, var(--void) 0%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "0",
          animation: "marquee 25s linear infinite",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.animationPlayState = "running";
        }}
      >
        {items.map((skill, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "13px",
              color: "var(--text-code)",
              padding: "0 24px",
              opacity: 0.8,
              userSelect: "none",
            }}
          >
            {skill}
            <span
              aria-hidden="true"
              style={{ color: "var(--starlight)", marginLeft: "24px", opacity: 0.5 }}
            >
              ∙
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
