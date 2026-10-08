"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*+<>";

/**
 * Text that “decodes” from random glyphs into place once on mount.
 * The real text is always available to screen readers and is what the server renders.
 */
export function DecodeText({ text, duration = 900, delay = 150 }: { text: string; duration?: number; delay?: number }) {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now + delay;
      const progress = Math.max(0, Math.min(1, (now - start) / duration));
      const revealed = Math.floor(progress * text.length);
      setShown(
        text
          .split("")
          .map((char, i) =>
            i < revealed || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, duration, delay, reduced]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{shown}</span>
    </>
  );
}
