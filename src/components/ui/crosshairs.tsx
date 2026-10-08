import { cn } from "@/lib/utils";

const corners = ["-top-[5px] -left-[5px]", "-top-[5px] -right-[5px]", "-bottom-[5px] -left-[5px]", "-bottom-[5px] -right-[5px]"];

/**
 * Small “+” registration marks at the four corners of the parent —
 * a technical-drawing detail. The parent must be `relative`.
 */
export function Crosshairs({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0 z-10", className)}>
      {corners.map((position) => (
        <span key={position} className={cn("absolute size-[11px]", position)}>
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-subtle/70" />
          <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-subtle/70" />
        </span>
      ))}
    </span>
  );
}
