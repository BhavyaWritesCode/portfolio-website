import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Linearly interpolate between two values.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a random number between min and max.
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Format a number with commas.
 */
export function formatNumber(n: number): string {
  return n.toLocaleString();
}

/**
 * Delay execution for a given number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if we're running in a browser environment.
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Get distance between two points.
 */
export function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Scramble text — given a target string, returns a random char at
 * positions that haven't resolved yet.
 */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export function scrambleChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

/**
 * Generate fibonacci sphere points.
 */
export function fibonacciSphere(samples: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return points;
}
