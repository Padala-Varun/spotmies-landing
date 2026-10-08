import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing so every reveal on the page moves with the same feel. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Deterministic PRNG (mulberry32). Cache Components disallows Math.random()
 * during prerender, and a seed keeps visuals identical across reloads.
 */
export function seededRandom(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function pad(n: number, size = 2) {
  return String(n).padStart(size, "0");
}
