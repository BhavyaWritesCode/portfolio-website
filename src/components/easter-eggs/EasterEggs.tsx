"use client";

import { useEffect, useRef, useCallback } from "react";

/* ── Helpers ────────────────────────────────────────────── */
function showToast(message: string) {
  const existing = document.getElementById("easter-egg-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "easter-egg-toast";
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(20px);
    background:rgba(245,166,35,0.95);color:#07070D;
    font-family:var(--font-code,monospace);font-size:13px;font-weight:700;
    padding:10px 20px;border-radius:8px;z-index:9990;
    opacity:0;transition:opacity 0.3s ease,transform 0.3s ease;
    pointer-events:none;white-space:nowrap;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function launchParticles(text: string, color = "#F5A623") {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = `
    position:fixed;inset:0;z-index:9985;pointer-events:none;width:100%;height:100%;
  `;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;

  // Render text particles spelling the message
  ctx.font = `bold 80px var(--font-display,'Impact',sans-serif)`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.remove();
  }, 2200);
}

function matrixRain() {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = `
    position:fixed;inset:0;z-index:9982;pointer-events:none;width:100%;height:100%;opacity:0.7;
  `;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;

  const cols = Math.floor(canvas.width / 16);
  const drops = Array(cols).fill(0).map(() => Math.random() * canvas.height);
  const JAVA_WORDS = ["class", "void", "static", "new", "import", "List", "Map", "String", "int", "return", "public", "private", "extends", "throws", "@Override", "Stream", "Optional"];

  let frame = 0;
  const loop = setInterval(() => {
    ctx.fillStyle = "rgba(7,7,13,0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#F5A623";
    ctx.font = "12px monospace";

    drops.forEach((y, i) => {
      const word = JAVA_WORDS[Math.floor(Math.random() * JAVA_WORDS.length)];
      ctx.fillText(word.charAt(Math.floor(Math.random() * word.length)), i * 16, y);
      drops[i] = y > canvas.height + 50 ? 0 : y + 14;
    });

    frame++;
    if (frame > 60) {
      clearInterval(loop);
      canvas.remove();
    }
  }, 16);
}

/* ── Easter Egg: Konami Code ────────────────────────────── */
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/* ── Easter Egg: Logo 7-tap ─────────────────────────────── */
/* Handled by click tracking on the logo link */

export default function EasterEggs() {
  const konamiRef = useRef<string[]>([]);
  const logoTapsRef = useRef(0);
  const logoTapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typedRef = useRef<string>("");
  const idleSphereRef = useRef(false);

  /* ── 1. Konami Code ─────────────────────────────────── */
  const handleKeydown = useCallback((e: KeyboardEvent) => {
    // Ignore if typing in an input
    if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;

    konamiRef.current.push(e.key);
    if (konamiRef.current.length > KONAMI.length) {
      konamiRef.current.shift();
    }

    if (konamiRef.current.join(",") === KONAMI.join(",")) {
      konamiRef.current = [];
      launchParticles("HIRE ME");
      showToast("🔥 Nice one. Check the contact form.");
    }

    /* ── 4. Type "java" anywhere ── */
    typedRef.current = (typedRef.current + e.key).slice(-5).toLowerCase();
    if (typedRef.current.includes("java")) {
      typedRef.current = "";
      matrixRain();
      showToast("☕ A developer of culture.");
    }
  }, []);

  /* ── 2. Logo 7-tap ──────────────────────────────────── */
  const handleLogoTap = useCallback(() => {
    logoTapsRef.current++;
    if (logoTapTimerRef.current) clearTimeout(logoTapTimerRef.current);
    logoTapTimerRef.current = setTimeout(() => {
      logoTapsRef.current = 0;
    }, 2000);

    if (logoTapsRef.current >= 7) {
      logoTapsRef.current = 0;
      showToast('⚡ Still here? Bold.');
    }
  }, []);

  /* ── 3. Cursor idle 5s ──────────────────────────────── */
  const resetIdleTimer = useCallback(() => {
    idleSphereRef.current = false;
    // Remove any idle message
    document.getElementById("idle-whisper")?.remove();
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (idleSphereRef.current) return;
      idleSphereRef.current = true;
      const el = document.createElement("div");
      el.id = "idle-whisper";
      el.textContent = "what are you doing?";
      el.style.cssText = `
        position:fixed;bottom:20px;right:100px;
        font-family:var(--font-code,monospace);font-size:11px;
        color:var(--text-muted,#4A4540);letter-spacing:0.1em;
        pointer-events:none;z-index:9980;
        animation:pageReveal 0.5s ease;
      `;
      document.body.appendChild(el);
      setTimeout(() => {
        el.style.opacity = "0";
        el.style.transition = "opacity 1s ease";
        setTimeout(() => el.remove(), 1000);
      }, 1500);
    }, 5000);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("mousemove", resetIdleTimer, { passive: true });
    resetIdleTimer();

    // Logo tap listener — attach to the logo link
    const logoLinks = document.querySelectorAll('a[aria-label="Bhavya Saini — Home"]');
    logoLinks.forEach((el) => el.addEventListener("click", handleLogoTap));

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("mousemove", resetIdleTimer);
      logoLinks.forEach((el) => el.removeEventListener("click", handleLogoTap));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (logoTapTimerRef.current) clearTimeout(logoTapTimerRef.current);
    };
  }, [handleKeydown, handleLogoTap, resetIdleTimer]);

  return null; // No rendered output — purely event-based
}
