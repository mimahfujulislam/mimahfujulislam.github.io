import { Compass } from "lucide-react";
import { aboutParagraphs, preparingFor } from "@/content/about";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Accent } from "@/components/ui/accent";

export function About() {
  const [first, ...rest] = aboutParagraphs;

  return (
    <Section id="about" index="01" eyebrow="About" title={<>About <Accent>Me</Accent></>}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <p className="text-lg leading-relaxed text-pretty text-fg sm:text-xl sm:leading-relaxed">{first}</p>
        </Reveal>

        <div>
          {rest.map((paragraph, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <p className="mb-5 leading-relaxed text-pretty text-muted">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.15} className="card mt-8 rounded-2xl p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-accent">
                <Compass size={16} strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <h3 className="text-[15px] font-medium text-fg">Current focus</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Completing my undergraduate degree and preparing for opportunities in:
                </p>
              </div>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {preparingFor.map((item) => (
                <li key={item} className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-fg/90">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
