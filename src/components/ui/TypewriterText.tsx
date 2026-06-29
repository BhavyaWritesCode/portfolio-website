"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per char
  delay?: number; // ms before start
  cursor?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  cursor = true,
  className,
  style,
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    idxRef.current = 0;
    setDisplayed("");
    setDone(false);

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        idxRef.current++;
        setDisplayed(text.slice(0, idxRef.current));
        if (idxRef.current >= text.length) {
          clearInterval(interval);
          setDone(true);
          onComplete?.();
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className} style={style}>
      {displayed}
      {cursor && (
        <span
          className="typewriter-cursor"
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            marginLeft: "2px",
            verticalAlign: "middle",
            animation: done ? "blink 1s step-end infinite" : "none",
          }}
        />
      )}
    </span>
  );
}
