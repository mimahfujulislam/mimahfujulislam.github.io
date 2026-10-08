import { cn } from "@/lib/utils";

/** “MI” monogram used in the navbar, footer and favicon. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex size-7 items-center justify-center overflow-hidden rounded-lg border border-line-strong bg-bg-elevated font-mono text-[11px] font-semibold tracking-tight text-fg",
        className,
      )}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_65%)]" />
      <span className="relative">MI</span>
    </span>
  );
}
