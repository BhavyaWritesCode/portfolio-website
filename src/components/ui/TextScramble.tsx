"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { scrambleChar } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: boolean;
  as?: React.ElementType<any>;
}

export default function TextScramble({
  text,
  className,
  style,
  trigger,
  as: Component = "span",
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    let frame = 0;
    const total = 12;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      frame++;
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < (frame / total) * text.length) return ch;
            return scrambleChar();
          })
          .join("")
      );
      if (frame >= total) {
        clearInterval(intervalRef.current!);
        setDisplay(text);
      }
    }, 30);
  }, [text]);

  useEffect(() => {
    if (trigger) scramble();
  }, [trigger, scramble]);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return React.createElement(
    Component as any,
    {
      className,
      style: { fontFamily: "var(--font-code)", ...style },
      onMouseEnter: scramble,
    },
    display
  );
}
