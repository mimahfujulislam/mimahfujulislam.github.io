import { BookOpen, Info } from "lucide-react";
import { featuredResearch, researchAreas, researchIntro, statusMeta, type WorkStatus } from "@/content/research";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { StatusPill } from "@/components/ui/tag";
import { Accent } from "@/components/ui/accent";
import { Crosshairs } from "@/components/ui/crosshairs";

const legend: WorkStatus[] = ["ongoing", "interest"];

export function Research() {
  return (
    <Section
      id="research"
      index="03"
      eyebrow="Research"
      title={<>Research &amp; <Accent>Academic Interests</Accent></>}
      lead={researchIntro}
      headerAside={<StatusLegend />}
    >
      <FeaturedResearch />

      <div className="mt-20">
        <SubHeading title="Areas of interest" note="Research interests — not completed work" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {researchAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <Reveal
                key={area.title}
                delay={0.04 * i}
                className={cn(
                  "card spotlight edge-glow group flex flex-col rounded-2xl p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong",
                  area.wide && "sm:col-span-2",
                )}
              >
                <Icon
                  size={20}
                  strokeWidth={1.6}
                  aria-hidden
                  className="text-subtle transition-colors duration-300 group-hover:text-accent"
                />
                <h4 className={cn("mt-5 font-medium tracking-tight text-fg", area.wide ? "text-lg" : "text-[15.5px]")}>
                  {area.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">{area.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function SubHeading({ title, note }: { title: string; note: string }) {
  return (
    <Reveal className="flex flex-col gap-1 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
      <h3 className="text-lg font-medium tracking-tight text-fg">{title}</h3>
      <p className="font-mono text-[11px] tracking-wide text-subtle">{note}</p>
    </Reveal>
  );
}

function StatusLegend() {
  return (
    <dl className="flex flex-col gap-2.5 rounded-xl border border-line bg-surface p-4">
      <dt className="font-mono text-[10.5px] tracking-[0.16em] text-subtle uppercase">Status key</dt>
      {legend.map((status) => (
        <dd key={status} className="flex items-center gap-3">
          <StatusPill status={status} />
          <span className="hidden text-[12px] text-subtle lg:inline">{statusMeta[status].description}</span>
        </dd>
      ))}
    </dl>
  );
}

/** Laid out like the first page of a paper: masthead, serif title, abstract, study design and a figure. */
function FeaturedResearch() {
  const r = featuredResearch;
  const lastStep = r.methodology.length - 1;
  return (
    <Reveal className="relative">
      <Crosshairs />
      <article
        aria-labelledby="featured-research-title"
        className="card spotlight gradient-border relative overflow-hidden rounded-3xl"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 size-[460px] rounded-full bg-[radial-gradient(closest-side,var(--glow-2),transparent)]"
        />

        {/* masthead */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-3.5 sm:px-10">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">
            <BookOpen size={12} aria-hidden /> Featured research project
          </span>
          <StatusPill status={r.status} pulse />
        </div>

        <div className="relative grid grid-cols-1 gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div>
            <p className="font-mono text-[12px] tracking-wide">
              {r.area.map((a, i) => (
                <span key={a}>
                  {i > 0 ? <span className="text-subtle"> × </span> : null}
                  <span className="text-accent">{a}</span>
                </span>
              ))}
            </p>
            <h3
              id="featured-research-title"
              className="mt-4 font-serif text-[1.85rem] leading-[1.12] text-balance text-fg sm:text-[2.4rem]"
            >
              {r.title}
            </h3>
            <div className="mt-8 border-l-2 border-accent/50 pl-5">
              <p className="font-mono text-[10.5px] tracking-[0.22em] text-subtle uppercase">Abstract</p>
              <p className="mt-2 leading-relaxed text-pretty text-muted sm:text-[17px]">{r.description}</p>
            </div>
          </div>

          <aside className="lg:border-l lg:border-line lg:pl-10">
            <h4 className="font-mono text-[10.5px] tracking-[0.22em] text-subtle uppercase">Study design</h4>
            <dl className="mt-5 space-y-5">
              {r.design.map((d) => (
                <div key={d.label}>
                  <dt className="font-mono text-[11px] tracking-wide text-accent uppercase">{d.label}</dt>
                  <dd className="mt-1 text-[14px] leading-snug text-fg/90">{d.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 flex items-start gap-2 border-t border-line pt-5 text-[12.5px] leading-relaxed text-subtle">
              <Info size={14} aria-hidden className="mt-0.5 shrink-0 text-warning" />
              {r.note}
            </p>
          </aside>
        </div>

        {/* methodology pipeline */}
        <figure className="relative border-t border-line bg-surface/50 px-6 py-8 sm:px-10">
          <h4 className="sr-only">Methodology</h4>
          <ol className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
            {r.methodology.map((m, i) => (
              <li key={m} className="relative flex flex-col items-center text-center">
                {i < lastStep ? (
                  <span
                    aria-hidden
                    className="absolute top-[13px] left-[calc(50%+18px)] hidden h-px w-[calc(100%+1rem-36px)] bg-gradient-to-r from-accent/70 to-line-strong lg:block"
                  />
                ) : null}
                <span className="relative flex size-7 items-center justify-center rounded-full border border-accent/50 bg-bg-elevated font-mono text-[10.5px] text-accent">
                  {i + 1}
                </span>
                <span className="mt-3 text-[13px] leading-snug text-fg">{m}</span>
              </li>
            ))}
          </ol>
          <figcaption className="mt-8 flex gap-2 font-mono text-[11px] text-subtle">
            <span className="shrink-0 text-accent">Fig. 3</span>
            Study methodology — from survey data to explainable, evaluated models.
          </figcaption>
        </figure>
      </article>
    </Reveal>
  );
}
