"use client";

import { useRef, useEffect, useState } from "react";

interface SectionHeaderProps {
  label?: string; // code-style label e.g. "// about_me.java"
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ label, title, subtitle, centered }: SectionHeaderProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        marginBottom: "48px",
        textAlign: centered ? "center" : "left",
      }}
    >
      {label && (
        <div
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "14px",
            color: "var(--starlight)",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: centered ? "center" : "flex-start",
          }}
        >
          {label}
          {!centered && (
            <span
              ref={lineRef}
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(90deg, var(--starlight) 0%, transparent 100%)",
                display: "block",
                transformOrigin: "left",
                transform: lineVisible ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 0.6s var(--ease-out)",
                maxWidth: "200px",
              }}
            />
          )}
        </div>
      )}
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1.05,
          position: "relative",
          display: "inline-block",
        }}
      >
        {title}
        {/* Amber underline draws on enter */}
        <span
          style={{
            position: "absolute",
            bottom: "-8px",
            left: 0,
            height: "2px",
            width: lineVisible ? "60%" : "0%",
            background: "var(--grad-text)",
            borderRadius: "1px",
            transition: "width 0.8s var(--ease-out) 0.2s",
            boxShadow: "0 0 12px var(--starlight-glow)",
            display: centered ? "none" : "block",
          }}
        />
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "18px",
            color: "var(--text-secondary)",
            marginTop: "16px",
            maxWidth: "580px",
            marginLeft: centered ? "auto" : undefined,
            marginRight: centered ? "auto" : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
