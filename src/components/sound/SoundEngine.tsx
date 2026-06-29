"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSoundStore } from "@/store/soundStore";

/**
 * Web Audio API procedural sound engine.
 * Generates all sounds programmatically — no audio files needed.
 * Lazy-initialized only when sound is first enabled.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  gainValue: number,
  type: OscillatorType = "sine",
  attack = 0.01,
  decay = 0.1
) {
  const ctx = getCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(gainValue, ctx.currentTime + attack);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration + 0.05);
}

function playNoise(duration: number, gainValue: number, freq: number) {
  const ctx = getCtx();
  if (!ctx) return;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = 0.5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(gainValue, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

export const sounds = {
  buttonHover: () => playTone(2000, 0.08, 0.03, "sine"),
  buttonClick: () => {
    playTone(800, 0.12, 0.06, "triangle");
    playTone(1200, 0.08, 0.04, "sine");
  },
  pageNav: () => playNoise(0.3, 0.12, 800),
  preloaderDone: () => {
    // Rising chord
    [440, 554, 659].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.8, 0.04, "sine", 0.05, 0.7), i * 100);
    });
  },
  cardFlip: () => playNoise(0.2, 0.08, 2000),
  formSuccess: () => {
    [523, 659, 784].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.4, 0.05, "sine", 0.02, 0.35), i * 120);
    });
  },
  cursorClick: () => playTone(1000, 0.1, 0.02, "square"),
  objectHover: () => playTone(200, 0.5, 0.01, "sine", 0.02, 0.45),
};

export default function SoundEngine() {
  const { enabled } = useSoundStore();
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const attach = useCallback(() => {
    // Button hover
    const handleMouseEnter = (e: Event) => {
      if (!enabledRef.current) return;
      const el = e.target as HTMLElement;
      if (el.closest("button, a, [role='button']")) {
        sounds.buttonHover();
      }
    };

    // Button click
    const handleClick = (e: Event) => {
      if (!enabledRef.current) return;
      const el = e.target as HTMLElement;
      if (el.closest("button, a, [role='button']")) {
        sounds.buttonClick();
      }
    };

    document.addEventListener("mouseover", handleMouseEnter, { passive: true });
    document.addEventListener("click", handleClick, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      const cleanup = attach();
      // Resume AudioContext on first user gesture (browser policy)
      if (audioCtx?.state === "suspended") {
        audioCtx.resume();
      }
      return cleanup;
    }
  }, [enabled, attach]);

  return null; // No rendered output
}
