import { skillGroups } from "@/content/skills";
import { cn, hash01 } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Accent } from "@/components/ui/accent";

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title={<>Technical <Accent>Skills</Accent></>}
      lead="The languages, methods and tools I work with — grouped by area, without self-rated percentages."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = group.icon;
          return (
            <Reveal
              key={group.title}
              delay={0.04 * i}
              className={cn(
                "card spotlight edge-glow group/card flex flex-col rounded-2xl p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)]",
                group.featured && "sm:col-span-2",
                group.wide && !group.featured && "lg:col-span-2",
              )}
            >
              <div className={cn(group.featured && "grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-8")}>
              <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-lg border",
                      group.featured
                        ? "border-accent/30 bg-accent/10 text-accent"
                        : "border-line bg-surface text-muted transition-colors group-hover/card:text-fg",
                    )}
                  >
                    <Icon size={17} strokeWidth={1.7} aria-hidden />
                  </span>
                  <h3 className="text-[15.5px] font-medium tracking-tight text-fg">{group.title}</h3>
                </div>
                {group.featured ? (
                  <span className="rounded-full border border-accent/30 bg-accent/[0.07] px-2.5 py-0.5 font-mono text-[10.5px] tracking-wide text-accent">
                    Primary focus
                  </span>
                ) : (
                  <span className="font-mono text-[11px] text-subtle" aria-label={`${group.items.length} skills`}>
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{group.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-0.5",
                        item.core
                          ? "border-accent/35 bg-accent/[0.08] text-fg"
                          : "border-line bg-surface text-fg/85 hover:border-accent/35 hover:bg-accent/[0.06] hover:text-fg",
                      )}
                    >
                      {item.name}
                      {item.core ? <span className="font-mono text-[10px] text-accent">core</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
              </div>
              {group.featured ? <DecisionBoundaryFigure /> : null}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

const FIG_W = 220;
const FIG_H = 140;
/** A smooth (logistic) boundary from the bottom-left to the top-right of the plot. */
const boundaryY = (x: number) => FIG_H - 14 - (FIG_H - 34) / (1 + Math.exp(-(x - FIG_W / 2) / 28));
const round = (n: number) => Math.round(n * 10) / 10;

const BOUNDARY = Array.from({ length: 28 }, (_, i) => {
  const x = 8 + (i * (FIG_W - 16)) / 27;
  return [round(x), round(boundaryY(x))] as const;
});
const BOUNDARY_PATH = BOUNDARY.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");
const REGION_PATH = `${BOUNDARY_PATH}L${FIG_W - 8} ${FIG_H}L8 ${FIG_H}Z`;

const POINTS = Array.from({ length: 64 }, (_, i) => ({
  x: round(14 + hash01(i * 17 + 3) * (FIG_W - 28)),
  y: round(12 + hash01(i * 29 + 7) * (FIG_H - 24)),
}))
  .map((p) => ({ ...p, gap: p.y - boundaryY(p.x) }))
  .filter((p) => Math.abs(p.gap) > 10)
  .slice(0, 34);

/** Fig. 2 — a stylised classifier: two classes separated by a learned decision boundary. */
function DecisionBoundaryFigure() {
  return (
    <figure className="hidden sm:block">
      <div className="overflow-hidden rounded-xl border border-line bg-bg/40">
        <svg viewBox={`0 0 ${FIG_W} ${FIG_H}`} className="h-auto w-full" aria-hidden="true">
          <path d={REGION_PATH} className="fill-accent/[0.07]" />
          <path
            d={BOUNDARY_PATH}
            fill="none"
            strokeWidth={1.4}
            strokeDasharray="4 3"
            className="stroke-fg/50"
            style={{ animation: "dash-flow 2.4s linear infinite" }}
          />
          {POINTS.map((p, i) =>
            p.gap > 0 ? (
              <circle key={i} cx={p.x} cy={p.y} r={2.6} className="fill-accent" opacity={0.85} />
            ) : (
              <rect key={i} x={p.x - 2.4} y={p.y - 2.4} width={4.8} height={4.8} rx={0.8} className="fill-accent-3" opacity={0.85} />
            ),
          )}
        </svg>
      </div>
      <figcaption className="mt-2.5 font-mono text-[10.5px] leading-relaxed text-subtle">
        <span className="text-accent">Fig. 2</span> A learned decision boundary between two classes.
      </figcaption>
    </figure>
  );
}
