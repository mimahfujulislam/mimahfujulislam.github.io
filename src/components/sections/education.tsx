import { ArrowUpRight, CalendarDays, Check, GraduationCap, Library, MapPin, School, Telescope } from "lucide-react";
import { education, schooling } from "@/content/education";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { StatusPill } from "@/components/ui/tag";
import { TimelineLine } from "@/components/ui/timeline-line";
import { Accent } from "@/components/ui/accent";

const schoolIcons = [Library, School];

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="Education" title={<Accent>Education</Accent>}>
      <ol className="relative space-y-6">
        <TimelineLine className="top-6 bottom-6 left-[19px]" />

        {/* current degree */}
        <Reveal as="li" className="relative pl-14">
          <span
            aria-hidden
            className="absolute top-4 left-0 flex size-10 items-center justify-center rounded-full border border-accent/40 bg-bg-elevated text-accent shadow-[0_0_0_6px_color-mix(in_oklab,var(--accent)_10%,transparent)]"
          >
            <GraduationCap size={18} strokeWidth={1.7} />
          </span>
          <article className="card spotlight edge-glow rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill status="ongoing" label={education.status} pulse />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] leading-5 text-muted">
                <CalendarDays size={12} aria-hidden /> Expected graduation · {education.expectedGraduation}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-fg sm:text-2xl">{education.degree}</h3>
            <p className="mt-1.5 text-[15px] text-fg/85">
              <a
                href={education.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-fg"
              >
                {education.institution}
                <ArrowUpRight size={13} aria-hidden className="text-subtle" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-subtle">
              <MapPin size={13} aria-hidden /> {education.location}
              {education.gpa ? <span className="ml-3">GPA {education.gpa}</span> : null}
            </p>
            <p className="mt-5 max-w-3xl leading-relaxed text-pretty text-muted">{education.focus}</p>

            <h4 className="mt-7 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">
              Relevant academic interests
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {education.areas.map((area) => (
                <li
                  key={area}
                  className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[13px] text-fg/85 transition-colors hover:border-accent/35 hover:text-fg"
                >
                  {area}
                </li>
              ))}
            </ul>

            <p className="mt-7 flex items-start gap-2.5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
              <Telescope size={15} aria-hidden className="mt-0.5 shrink-0 text-accent-3" />
              <span>
                <span className="font-medium text-fg">Next — </span>
                {education.next}
              </span>
            </p>
          </article>
        </Reveal>

        {/* earlier education */}
        {schooling.map((entry, i) => {
          const Icon = schoolIcons[i] ?? School;
          const meta = [entry.year, entry.result].filter(Boolean);
          return (
            <Reveal as="li" key={entry.degree} delay={0.06 * (i + 1)} className="relative pl-14">
              <span
                aria-hidden
                className="absolute top-5 left-0 flex size-10 items-center justify-center rounded-full border border-line-strong bg-bg-elevated text-muted"
              >
                <Icon size={17} strokeWidth={1.7} />
              </span>
              <article className="card spotlight edge-glow flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-fg">{entry.degree}</h3>
                  <p className="mt-1 text-[15px] text-fg/85">{entry.institution}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} aria-hidden /> {entry.location}
                    </span>
                    {meta.length ? <span className="font-mono text-[12px]">{meta.join(" · ")}</span> : null}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-success/30 bg-success/[0.07] px-2.5 py-0.5 font-mono text-[11px] leading-5 tracking-wide text-success sm:self-center">
                  <Check size={12} aria-hidden /> Completed
                </span>
              </article>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
