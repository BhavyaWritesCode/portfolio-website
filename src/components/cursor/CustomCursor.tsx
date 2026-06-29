"use client";

import { useEffect, useRef, useCallback } from "react";
import { useCursorStore, type CursorState } from "@/store/cursorStore";
import { lerp } from "@/lib/utils";

/* Particle burst on click */
function createClickBurst(x: number, y: number) {
  const container = document.getElementById("cursor-burst-container");
  if (!container) return;
  for (let i = 0; i < 12; i++) {
    const dot = document.createElement("div");
    const angle = (i / 12) * Math.PI * 2;
    const dist = 40 + Math.random() * 40;
    dot.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;width:4px;height:4px;
      border-radius:50%;background:var(--starlight);pointer-events:none;
      z-index:9997;transform:translate(-50%,-50%);
      box-shadow:0 0 6px var(--starlight-glow);
    `;
    container.appendChild(dot);
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    dot.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 },
      ],
      { duration: 400, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "forwards" }
    ).onfinish = () => dot.remove();
  }
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const stateRef = useRef<CursorState>("default");
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number>(0);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const { setState } = useCursorStore();

  const getElementState = useCallback((el: HTMLElement | null): CursorState => {
    if (!el) return "default";
    if (el.closest("[data-cursor='canvas']")) return "canvas";
    if (el.closest(".card,[data-cursor='card']")) return "card";
    if (el.closest("a,button,[role='button'],[data-cursor='link']")) return "link";
    if (el.closest("p,h1,h2,h3,h4,h5,h6,span,label")) return "text";
    return "default";
  }, []);

  useEffect(() => {
    // Check for mobile
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    /* ── Animate loop ─────────────────────────────────────── */
    const animate = () => {
      const { x, y } = mouseRef.current;
      // Move dot instantly
      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;

      // Trail effect on fast move
      const speed = Math.sqrt(
        (x - lastPosRef.current.x) ** 2 + (y - lastPosRef.current.y) ** 2
      );
      if (speed > 8) {
        addTrailDot(x, y);
      }
      lastPosRef.current = { x, y };

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    /* ── Mouse move ──────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const newState = getElementState(e.target as HTMLElement);
      if (newState !== stateRef.current) {
        stateRef.current = newState;
        setState(newState);
        applyCursorState(newState, dot);
      }
      if (!dot.style.opacity || dot.style.opacity === "0") {
        dot.style.opacity = "1";
        applyCursorState(newState, dot);
      }
    };

    /* ── Mouse down/up ───────────────────────────────────── */
    const onDown = (e: MouseEvent) => {
      createClickBurst(e.clientX, e.clientY);
      dot.style.transform += " scale(0.7)";
      holdTimerRef.current = setTimeout(() => {
        setState("hold");
      }, 300);
    };
    const onUp = () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      const cur = stateRef.current;
      applyCursorState(cur, dot);
    };

    /* ── Mouse leave/enter ────────────────────────────────── */
    const onLeave = () => { dot.style.opacity = "0"; };
    const onEnter = () => { dot.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [getElementState, setState]);

  const addTrailDot = (x: number, y: number) => {
    const container = document.getElementById("cursor-burst-container");
    if (!container) return;
    const trail = document.createElement("div");
    trail.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;width:4px;height:4px;
      border-radius:50%;background:rgba(168, 200, 255, 0.7);pointer-events:none;
      z-index:9995;transform:translate(-50%,-50%);
    `;
    container.appendChild(trail);
    trail.animate(
      [{ opacity: 0.7 }, { opacity: 0, transform: "translate(-50%,-50%) scale(0)" }],
      { duration: 300, easing: "ease-out", fill: "forwards" }
    ).onfinish = () => trail.remove();
  };

  return (
    <>
      {/* Container for particles */}
      <div
        id="cursor-burst-container"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997 }}
        aria-hidden="true"
      />

      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--starlight)",
          pointerEvents: "none",
          zIndex: 9996,
          boxShadow: "0 0 8px #A8C8FF, 0 0 16px rgba(168, 200, 255, 0.5)",
          transition: "width 0.2s, height 0.2s, background 0.2s",
          opacity: 0,
          willChange: "transform",
        }}
      />


    </>
  );
}

function applyCursorState(
  state: CursorState,
  dot: HTMLDivElement
) {
  // Reset
  dot.style.width = "8px";
  dot.style.height = "8px";
  dot.style.background = "var(--starlight)";

  switch (state) {
    case "link":
    case "card":
      dot.style.width = "20px";
      dot.style.height = "20px";
      dot.style.background = "rgba(168, 200, 255, 0.4)";
      break;
    case "text":
      dot.style.width = "4px";
      dot.style.height = "16px";
      dot.style.borderRadius = "2px";
      break;
    case "canvas":
      dot.style.width = "16px";
      dot.style.height = "16px";
      dot.style.background = "transparent";
      dot.style.border = "1.5px solid var(--starlight)";
      break;
  }
}
