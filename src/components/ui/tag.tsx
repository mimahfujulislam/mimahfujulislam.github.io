import { cn } from "@/lib/utils";
import type { WorkStatus } from "@/content/research";
import { statusMeta } from "@/content/research";

export function Tag({ children, className, mono = true }: { children: React.ReactNode; className?: string; mono?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-surface px-2 py-0.5 text-[11.5px] leading-5 text-muted",
        mono && "font-mono",
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<WorkStatus, { dot: string; text: string; ring: string }> = {
  ongoing: { dot: "bg-warning", text: "text-warning", ring: "border-warning/30 bg-warning/[0.07]" },
  interest: { dot: "bg-accent-3", text: "text-accent-3", ring: "border-accent-3/30 bg-accent-3/[0.07]" },
};

export function StatusPill({
  status,
  label,
  pulse,
  className,
}: {
  status: WorkStatus;
  label?: string;
  pulse?: boolean;
  className?: string;
}) {
  const style = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] leading-5 tracking-wide whitespace-nowrap",
        style.ring,
        style.text,
        className,
      )}
    >
      <span className="relative flex size-1.5" aria-hidden>
        {pulse ? <span className={cn("animate-ping-soft absolute inset-0 rounded-full", style.dot)} /> : null}
        <span className={cn("relative size-1.5 rounded-full", style.dot)} />
      </span>
      {label ?? statusMeta[status].label}
    </span>
  );
}
