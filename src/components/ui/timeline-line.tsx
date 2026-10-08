"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Vertical rail that draws itself from top to bottom when scrolled into view. */
export function TimelineLine({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("absolute w-px overflow-hidden bg-line", className)}>
      <motion.span
        className="block h-full w-full origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3/0"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "0px 0px -120px 0px" }}
        transition={{ duration: 1.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      />
    </span>
  );
}
