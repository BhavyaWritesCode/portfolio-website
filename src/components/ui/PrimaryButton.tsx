"use client";

import { useRef } from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
  id?: string;
}

function createBurst(x: number, y: number) {
  const container = document.getElementById("cursor-burst-container");
  if (!container) return;
  for (let i = 0; i < 10; i++) {
    const dot = document.createElement("div");
    const angle = (i / 10) * Math.PI * 2;
    const dist = 30 + Math.random() * 30;
    dot.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;width:3px;height:3px;
      border-radius:50%;background:var(--starlight);pointer-events:none;
      z-index:9997;transform:translate(-50%,-50%);
    `;
    container.appendChild(dot);
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    dot.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(0)`, opacity: 0 },
      ],
      { duration: 350, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "forwards" }
    ).onfinish = () => dot.remove();
  }
}

export default function PrimaryButton({
  children,
  onClick,
  href,
  variant = "primary",
  style,
  className,
  type = "button",
  disabled,
  "aria-label": ariaLabel,
  id,
}: PrimaryButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    createBurst(e.clientX, e.clientY);
    onClick?.();
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 28px",
    fontFamily: "var(--font-heading)",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    transition: "all 0.25s var(--ease-out)",
    textDecoration: "none",
    border: "1px solid var(--starlight)",
    position: "relative",
    overflow: "hidden",
    ...(variant === "primary"
      ? {
          color: "var(--starlight)",
          background: "transparent",
        }
      : {
          color: "var(--text-muted)",
          background: "transparent",
          borderColor: "rgba(168, 200, 255, 0.3)",
        }),
    ...style,
  };

  const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (variant === "primary") {
      el.style.background = "var(--starlight)";
      el.style.color = "var(--space)";
      el.style.boxShadow = "0 0 24px var(--starlight-glow), 0 8px 24px rgba(168,200,255,0.2)";
      el.style.transform = "translateY(-3px)";
    } else {
      el.style.borderColor = "var(--starlight)";
      el.style.color = "var(--starlight)";
      el.style.transform = "translateY(-2px)";
    }
  };
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (variant === "primary") {
      el.style.background = "transparent";
      el.style.color = "var(--starlight)";
      el.style.boxShadow = "none";
      el.style.transform = "translateY(0)";
    } else {
      el.style.borderColor = "rgba(168,200,255,0.3)";
      el.style.color = "var(--text-muted)";
      el.style.transform = "translateY(0)";
    }
  };

  if (href) {
    return (
      <a
        href={href}
        id={id}
        style={baseStyle}
        className={className}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.95)"; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      id={id}
      type={type}
      style={baseStyle}
      className={className}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.95)"; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
    >
      {children}
    </button>
  );
}
