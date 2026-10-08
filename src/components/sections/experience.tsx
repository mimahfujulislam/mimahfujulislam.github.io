import { experiences } from "@/content/experience";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { Accent } from "@/components/ui/accent";

export function Experience() {
  return (
    <Section
      id="experience"
      index="04"
      eyebrow="Experience"
      title={<>Experience &amp; <Accent>Leadership</Accent></>}
      lead="Beyond the classroom — building an organization, working with a team, and delivering work for clients."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {experiences.map((exp, i) => {
          const Icon = exp.icon;
          return (
            <Reveal key={exp.role} delay={0.06 * i} className="flex">
              <article className="card spotlight edge-glow flex w-full flex-col rounded-2xl p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-accent">
                    <Icon size={18} strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="text-right font-mono text-[11px] leading-5 tracking-wide text-subtle uppercase">
                    {exp.type}
                    {exp.period ? (
                      <>
                        <br />
                        {exp.period}
                      </>
                    ) : null}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-fg">{exp.role}</h3>
                <p className="mt-0.5 text-[15px] text-accent">{exp.organization}</p>
                <p className="mt-4 leading-relaxed text-pretty text-muted">{exp.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {exp.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[14px] leading-snug text-fg/85">
                      <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-7" aria-label="Focus areas">
                  {exp.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
