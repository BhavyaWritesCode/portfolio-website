"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;
  duration?: number; // ms
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({
  target,
  duration = 800,
  suffix = "",
  prefix = "",
  className,
  style,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOut cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [target, duration]);

  return (
    <span ref={containerRef} className={className} style={style}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
