"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");
const getServerSnapshot = (): Theme | null => null;

function applyTheme(next: Theme) {
  const root = document.documentElement;
  const commit = () => {
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable (private mode) — theme still applies for this visit */
    }
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && typeof document.startViewTransition === "function") {
    document.startViewTransition(commit);
  } else {
    commit();
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme !== "light";
  const label = theme === null ? "Toggle color theme" : isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-hover hover:text-fg",
        className,
      )}
    >
      <Sun
        size={17}
        strokeWidth={1.75}
        aria-hidden
        className={cn("absolute transition-all duration-300", isDark ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100")}
      />
      <Moon
        size={16}
        strokeWidth={1.75}
        aria-hidden
        className={cn("absolute transition-all duration-300", isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0")}
      />
    </button>
  );
}
