import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "./reveal";

type SectionProps = {
  id: string;
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerAside?: React.ReactNode;
};

export function Section({ id, index, eyebrow, title, lead, children, className, headerAside }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("relative py-20 sm:py-28", className)}>
      <Container>
        <div className="relative isolate mb-12 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
          {index ? (
            <span
              aria-hidden
              className="text-outline pointer-events-none absolute -top-14 -left-2 -z-10 font-serif text-[8.5rem] leading-none italic select-none sm:-top-20 sm:-left-4 sm:text-[11rem]"
            >
              {index}
            </span>
          ) : null}
          <Reveal className="max-w-2xl">
            <SectionEyebrow index={index}>{eyebrow}</SectionEyebrow>
            <h2
              id={headingId}
              className="mt-4 text-[2rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-fg sm:text-[2.75rem] lg:text-[3rem]"
            >
              {title}
            </h2>
            {lead ? <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">{lead}</p> : null}
          </Reveal>
          {headerAside ? <Reveal delay={0.08}>{headerAside}</Reveal> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}

export function SectionEyebrow({ index, children }: { index?: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-subtle uppercase">
      {index ? <span className="text-accent">§ {index}</span> : null}
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}
