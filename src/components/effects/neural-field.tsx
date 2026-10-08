"use client";

import { useEffect, useRef } from "react";
import { cn, hash01 } from "@/lib/utils";

const GAP = 34; // distance between dots
const REACH = 170; // cursor influence radius
const LINK = GAP * 1.65; // max distance for a connection near the cursor

type Dot = { ox: number; oy: number; phase: number };

/**
 * A field of dots behind the hero. Idle: a slow diagonal “signal” wave.
 * Near the cursor: dots light up, lean away and connect like a small network.
 * Pauses when off-screen; draws a single still frame with reduced motion.
 */
export function NeuralField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      return { dot: s.getPropertyValue("--subtle").trim(), accent: s.getPropertyValue("--accent").trim() };
    };
    let colors = readColors();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(width / GAP) + 1;
      const rows = Math.ceil(height / GAP) + 1;
      const offX = (width - (cols - 1) * GAP) / 2;
      const offY = (height - (rows - 1) * GAP) / 2;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ ox: offX + c * GAP, oy: offY + r * GAP, phase: hash01(r * 131 + c) * Math.PI * 2 });
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const near: { x: number; y: number; glow: number }[] = [];

      for (const d of dots) {
        let x = d.ox + Math.sin(t * 0.0006 + d.phase) * 1.4;
        let y = d.oy + Math.cos(t * 0.0005 + d.phase) * 1.4;
        let glow = 0;

        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REACH) {
            glow = 1 - dist / REACH;
            if (dist > 0.5) {
              x += (dx / dist) * glow * 9;
              y += (dy / dist) * glow * 9;
            }
            near.push({ x, y, glow });
          }
        }

        const wave = 0.5 + 0.5 * Math.sin(t * 0.0011 - (d.ox + d.oy) * 0.007);
        ctx.globalAlpha = Math.min(1, 0.12 + wave * 0.1 + glow * 0.75);
        ctx.fillStyle = glow > 0.04 ? colors.accent : colors.dot;
        ctx.beginPath();
        ctx.arc(x, y, 0.9 + glow * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const a = near[i];
          const b = near[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > LINK) continue;
          ctx.globalAlpha = Math.min(a.glow, b.glow) * 0.6 * (1 - dist / LINK);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    if (reduced) {
      draw(0);
    } else {
      start();
    }

    const onResize = () => {
      build();
      if (reduced) draw(0);
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (reduced) return;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (reduced) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    if (finePointer && !reduced) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      stop();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={cn("absolute inset-0 h-full w-full", className)} />;
}
