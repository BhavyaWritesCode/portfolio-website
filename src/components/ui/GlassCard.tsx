"use client";

import { useRef, useEffect } from "react";

type GlassCardProps = {
  children: React.ReactNode;
  spotlight?: boolean;
  variant?: "starlight" | "violet";
} & React.HTMLAttributes<HTMLDivElement>;

export default function GlassCard({
  children,
  className,
  style,
  spotlight = false,
  variant = "starlight",
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spotlight) return;
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || !spot) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spot.style.background = `radial-gradient(200px circle at ${x}px ${y}px, rgba(168, 200, 255,0.08) 0%, transparent 70%)`;
    };
    const onLeave = () => {
      spot.style.background = "transparent";
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [spotlight]);

  return (
    <div
      ref={cardRef}
      className={`glass-card${variant === "violet" ? "-violet" : ""} ${className ?? ""}`}
      style={{ position: "relative", overflow: "hidden", ...style }}
      {...props}
    >
      {spotlight && (
        <div
          ref={spotRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            transition: "background 0.1s ease",
            borderRadius: "inherit",
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
