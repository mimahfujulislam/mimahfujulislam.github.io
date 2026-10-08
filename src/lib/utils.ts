import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a public asset path (e.g. "/resume.pdf") with the configured base path. */
export function withBase(path: string) {
  return `${basePath}${path}`;
}

/**
 * Deterministic pseudo-random value in [0, 1), rounded to 3 decimals.
 * Integer-only hashing (no Math.sin), so server and browser render identical
 * values and hydration matches.
 */
export function hash01(seed: number) {
  let x = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return Math.round(((x >>> 0) / 4294967296) * 1000) / 1000;
}
