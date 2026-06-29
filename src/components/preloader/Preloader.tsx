"use client";

import { useEffect, useRef, useState } from "react";
import { useLoadingStore } from "@/store/loadingStore";

const SESSION_KEY = "bhavya-preloader-done";

export default function Preloader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"init" | "assemble" | "bar" | "shatter" | "done">("init");
  const [barWidth, setBarWidth] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [visible, setVisible] = useState(true);
  const setLoading = useLoadingStore((s) => s.setLoading);

  useEffect(() => {
    // Return-visit: skip preloader
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      setLoading(false);
      return;
    }

    // Phase sequence
    let cancelled = false;

    const run = async () => {
      await new Promise((r) => setTimeout(r, 100));
      if (cancelled) return;
      setPhase("assemble");

      // Phase 2: Pulse + horizontal line
      await new Promise((r) => setTimeout(r, 900));
      if (cancelled) return;
      setPhase("bar");

      // Phase 3: Bar fills + text types
      let w = 0;
      const statusFull = "initializing systems...";
      let charIdx = 0;
      const tick = setInterval(() => {
        if (cancelled) { clearInterval(tick); return; }
        w = Math.min(w + 2.2, 100);
        setBarWidth(w);
        if (charIdx < statusFull.length) {
          charIdx++;
          setStatusText(statusFull.slice(0, charIdx));
        }
        if (w >= 100) clearInterval(tick);
      }, 20);

      await new Promise((r) => setTimeout(r, 1000));
      if (cancelled) return;

      // Phase 4: Shatter
      setPhase("shatter");
      await new Promise((r) => setTimeout(r, 600));
      if (cancelled) return;

      // Done
      setPhase("done");
      setVisible(false);
      setLoading(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    };

    run();
    return () => { cancelled = true; };
  }, [setLoading]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--void)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: phase === "shatter" ? "opacity 0.4s ease" : "none",
        opacity: phase === "done" ? 0 : 1,
      }}
    >
      {/* BS Monogram */}
      <div
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "64px",
          fontWeight: 700,
          color: "var(--starlight)",
          letterSpacing: "-2px",
          marginBottom: "40px",
          textShadow: "0 0 40px rgba(168, 200, 255, 0.8), 0 0 80px rgba(168, 200, 255, 0.4)",
          animation:
            phase === "assemble"
              ? "countPulse 0.6s ease"
              : phase === "shatter"
              ? "none"
              : "none",
          transform:
            phase === "shatter" ? "scale(1.5)" : "scale(1)",
          opacity: phase === "shatter" ? 0 : 1,
          transition:
            phase === "shatter"
              ? "transform 0.4s ease, opacity 0.3s ease"
              : "transform 0.4s var(--ease-spring)",
        }}
      >
        BS
      </div>

      {/* Amber horizontal line */}
      <div
        style={{
          width: "320px",
          height: "1px",
          background: "var(--starlight)",
          marginBottom: "16px",
          transform: phase === "init" ? "scaleX(0)" : "scaleX(1)",
          transformOrigin: "left",
          transition: "transform 0.5s var(--ease-out)",
          boxShadow: "0 0 8px var(--starlight-glow)",
          opacity: phase === "shatter" ? 0 : 1,
        }}
      />

      {/* Loading bar */}
      <div
        style={{
          width: "320px",
          height: "2px",
          background: "rgba(168, 200, 255, 0.12)",
          borderRadius: "1px",
          overflow: "hidden",
          marginBottom: "20px",
          opacity: phase === "shatter" ? 0 : phase === "bar" || phase === "assemble" ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${barWidth}%`,
            background: "linear-gradient(90deg, var(--space), var(--starlight))",
            borderRadius: "1px",
            boxShadow: "0 0 12px var(--starlight-glow)",
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* Status text */}
      <div
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "11px",
          color: "var(--text-secondary)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          minHeight: "16px",
          opacity: phase === "shatter" ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {statusText}
        {statusText && (
          <span
            style={{
              animation: "blink 1s step-end infinite",
              color: "var(--starlight)",
            }}
          >
            _
          </span>
        )}
      </div>

      {/* Particle scatter effect (CSS) */}
      {phase === "shatter" && (
        <>
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const dist = 80 + Math.random() * 120;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "var(--starlight)",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%)`,
                  animation: `particleFly-${i} 0.5s ease-out forwards`,
                  boxShadow: "0 0 8px var(--starlight-glow)",
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
