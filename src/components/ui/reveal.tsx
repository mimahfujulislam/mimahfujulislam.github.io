"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset in px before the element enters. */
  y?: number;
  as?: "div" | "li" | "article";
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/** Fades and lifts content in once when it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 14, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      data-reveal=""
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -72px 0px" }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {children}
    </Component>
  );
}
