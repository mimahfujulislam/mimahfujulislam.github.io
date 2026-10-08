import { BrainCircuit, FlaskConical, GraduationCap, Terminal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Crosshairs } from "@/components/ui/crosshairs";
import { Reveal } from "@/components/ui/reveal";

/** Verified facts only — no invented numbers. */
const stats = [
  { icon: GraduationCap, value: "BSc CSE", label: "AIUB" },
  { icon: BrainCircuit, value: "AI / ML", label: "Primary interest" },
  { icon: FlaskConical, value: "Research", label: "Ongoing study & projects" },
  { icon: Terminal, value: "Python", label: "Core language" },
];

export function QuickStats() {
  return (
    <section aria-labelledby="stats-heading" className="relative pt-14 sm:pt-16">
      <h2 id="stats-heading" className="sr-only">
        At a glance
      </h2>
      <Container>
        <div className="relative">
          <Crosshairs />
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <Reveal
                as="li"
                key={value}
                delay={i * 0.06}
                className="group relative flex flex-col gap-4 bg-bg-elevated p-5 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--bg-elevated)_94%,var(--accent))] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    size={18}
                    strokeWidth={1.6}
                    aria-hidden
                    className="text-subtle transition-colors duration-300 group-hover:text-accent"
                  />
                  <span aria-hidden className="font-mono text-[10px] text-subtle/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{value}</p>
                  <p className="mt-1 font-mono text-[11px] tracking-wide text-subtle uppercase">{label}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
