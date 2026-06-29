'use client';
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  twinklePeriod: number;
  twinkleAmp: number;
  rgb: string;
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let stars: Star[] = [];

    const generateStars = () => {
      stars = [];
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Tier 1 (200 stars): radius 0.4–0.8px, opacity 0.3–0.6, no twinkle
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.4 + Math.random() * 0.4,
          baseOpacity: 0.3 + Math.random() * 0.3,
          twinklePeriod: 1, // won't be used since amp is 0
          twinkleAmp: 0,
          rgb: '232,232,228',
        });
      }

      // Tier 2 (120 stars): radius 0.8–1.4px, opacity 0.5–0.8, slow twinkle (4–8s cycle)
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.8 + Math.random() * 0.6,
          baseOpacity: 0.5 + Math.random() * 0.3,
          twinklePeriod: isReducedMotion ? 1 : 4000 + Math.random() * 4000,
          twinkleAmp: isReducedMotion ? 0 : 0.2 + Math.random() * 0.2,
          rgb: '232,232,228',
        });
      }

      // Tier 3 (30 stars): radius 1.5–2.5px, opacity 0.7–1.0, faster twinkle (2–4s), 15% blue-white hue
      for (let i = 0; i < 30; i++) {
        const isBlueWhite = Math.random() < 0.15;
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 1.5 + Math.random() * 1.0,
          baseOpacity: 0.7 + Math.random() * 0.3,
          twinklePeriod: isReducedMotion ? 1 : 2000 + Math.random() * 2000,
          twinkleAmp: isReducedMotion ? 0 : 0.3 + Math.random() * 0.2,
          rgb: isBlueWhite ? '147,197,253' : '232,232,228',
        });
      }
    };

    generateStars();

    let raf: number;
    const tick = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      
      // The background color of the void itself is drawn by the body CSS (--void),
      // so this canvas is completely transparent except for the stars.

      stars.forEach((s) => {
        let a = s.baseOpacity;
        if (s.twinkleAmp > 0) {
          a += Math.sin((t / s.twinklePeriod) * Math.PI * 2) * s.twinkleAmp;
        }
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.rgb},${a})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // Debounced Resize
    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        generateStars(); // Re-seed stars to cover new dimensions
      }, 200);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        display: 'block',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
