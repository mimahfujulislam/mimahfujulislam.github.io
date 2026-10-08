import { cn } from "@/lib/utils";

/** Slow, endless ticker. The list is rendered twice for a seamless loop; the copy is hidden from screen readers. */
export function Marquee({ items, label, className }: { items: string[]; label: string; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : label} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-serif text-[1.65rem] whitespace-nowrap text-muted italic sm:px-8 sm:text-[2rem]">
            {item}
          </span>
          <span aria-hidden className="size-1.5 rotate-45 bg-accent/70" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
