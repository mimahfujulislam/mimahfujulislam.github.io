"use client";

import { ArrowUpRight, CircleAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fallbackLanguages, githubUser, languageColors } from "@/content/repositories";
import { profile, socials } from "@/content/profile";
import { fetchContributions, fetchRepos, type ContributionDay, type Contributions, type GitHubRepo } from "@/lib/github";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Accent } from "@/components/ui/accent";

type Load<T> = { state: "loading" } | { state: "ready"; data: T } | { state: "error" };

export function OpenSource() {
  const [repos, setRepos] = useState<Load<GitHubRepo[]>>({ state: "loading" });
  const [contrib, setContrib] = useState<Load<Contributions>>({ state: "loading" });

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 9000);

    fetchRepos(githubUser, controller.signal)
      .then((data) => active && setRepos({ state: "ready", data }))
      .catch(() => active && setRepos({ state: "error" }));
    fetchContributions(githubUser, controller.signal)
      .then((data) => active && setContrib({ state: "ready", data }))
      .catch(() => active && setContrib({ state: "error" }));

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  // Live languages (most used first) when the API responds; a saved list otherwise.
  const languages = useMemo(() => {
    if (repos.state !== "ready") return fallbackLanguages;
    const counts = new Map<string, number>();
    repos.data.forEach((r) => !r.fork && r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([l]) => l);
  }, [repos]);

  const publicCount = repos.state === "ready" ? repos.data.length : null;

  return (
    <Section
      id="code"
      eyebrow="Open Source"
      title={<>Code &amp; <Accent>Open Source</Accent></>}
      lead="Coursework, experiments and projects live on GitHub — from data structures in C++ to AI lab notebooks and full-stack apps."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* profile */}
        <Reveal className="card flex flex-col rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <Avatar />
            <div className="min-w-0">
              <p className="font-medium text-fg">{profile.name}</p>
              <p className="truncate font-mono text-[12.5px] text-subtle">@{githubUser}</p>
            </div>
          </div>

          {publicCount !== null ? (
            <p className="mt-5 text-sm text-muted">
              <span className="font-medium text-fg">{publicCount}</span> public repositories
            </p>
          ) : null}

          <div className="mt-5">
            <p className="font-mono text-[10.5px] tracking-[0.16em] text-subtle uppercase">Languages in my repos</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {languages.map((l) => (
                <li key={l} className="flex items-center gap-1.5 text-[13px] text-fg/85">
                  <LanguageDot language={l} />
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-7">
            <ButtonLink href={socials.github.url} external variant="secondary" className="w-full">
              <GitHubIcon size={15} />
              View GitHub Profile
              <ArrowUpRight size={14} aria-hidden className="text-subtle" />
            </ButtonLink>
            <p className="mt-3 text-center font-mono text-[10.5px] text-subtle" aria-live="polite">
              {repos.state === "loading"
                ? "Loading live data from GitHub…"
                : repos.state === "ready"
                  ? "Live data from the GitHub API"
                  : "GitHub is unreachable right now — showing saved details"}
            </p>
          </div>
        </Reveal>

        {/* contribution activity */}
        <Reveal delay={0.06} className="card flex flex-col justify-between gap-6 rounded-2xl p-6">
          <ContributionCalendar load={contrib} />
        </Reveal>
      </div>
    </Section>
  );
}

function Avatar() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="flex size-14 items-center justify-center rounded-full border border-line bg-surface font-mono text-sm text-fg">
        {profile.initials}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote avatar, static export
    <img
      src={`https://github.com/${githubUser}.png?size=112`}
      alt={`${profile.name}’s GitHub avatar`}
      width={56}
      height={56}
      loading="lazy"
      onError={() => setFailed(true)}
      className="size-14 rounded-full border border-line bg-surface object-cover"
    />
  );
}

function LanguageDot({ language }: { language: string }) {
  return (
    <span
      aria-hidden
      className="size-2.5 rounded-full ring-1 ring-line"
      style={{ backgroundColor: languageColors[language] ?? "var(--subtle)" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Contribution calendar                                               */
/* ------------------------------------------------------------------ */

const CELL = 10;
const GAP = 3;
const LEVEL_OPACITY = [0, 0.32, 0.55, 0.78, 1];
const dayFormat = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });

function toWeeks(days: ContributionDay[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];
  const firstWeekday = new Date(`${sorted[0].date}T00:00:00Z`).getUTCDay();
  for (let i = 0; i < firstWeekday; i++) week.push(null);
  for (const day of sorted) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...Array<null>(7 - week.length).fill(null)]);
  return weeks.slice(-53);
}

function ContributionCalendar({ load }: { load: Load<Contributions> }) {
  const weeks = useMemo(() => (load.state === "ready" ? toWeeks(load.data.days) : []), [load]);

  const header = (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h3 className="font-medium text-fg">Contribution activity</h3>
        <p className="mt-1 text-sm text-muted">
          {load.state === "ready" ? (
            <>
              <span className="font-medium text-fg">{load.data.total.toLocaleString("en")}</span> contributions on
              GitHub in the last year
            </>
          ) : load.state === "loading" ? (
            "Loading activity…"
          ) : (
            "Public activity on GitHub"
          )}
        </p>
      </div>
      {load.state === "ready" ? (
        <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-subtle" aria-hidden>
          Less
          {LEVEL_OPACITY.map((o, i) => (
            <span
              key={i}
              className={cn("size-2.5 rounded-[3px]", i === 0 ? "bg-line" : "bg-accent")}
              style={i === 0 ? undefined : { opacity: o }}
            />
          ))}
          More
        </div>
      ) : null}
    </div>
  );

  if (load.state === "error") {
    return (
      <>
        {header}
        <p className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-line-strong p-4 text-sm text-muted">
          <CircleAlert size={15} aria-hidden className="shrink-0 text-subtle" />
          The activity graph couldn’t be loaded right now.
          <a
            href={socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg"
          >
            View on GitHub
          </a>
        </p>
      </>
    );
  }

  if (load.state === "loading") {
    return (
      <>
        {header}
        <div className="mt-5 h-[92px] animate-pulse rounded-xl bg-surface-hover" aria-hidden />
      </>
    );
  }

  const width = weeks.length * (CELL + GAP) - GAP;
  const height = 16 + 7 * (CELL + GAP) - GAP;

  return (
    <>
      {header}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-5 h-auto w-full"
        role="img"
        aria-label={`GitHub contribution calendar: ${load.data.total} contributions in the last year`}
      >
        {weeks.map((week, w) => {
          const first = week.find(Boolean);
          const prev = weeks[w - 1]?.find(Boolean);
          const showMonth =
            first && (!prev || first.date.slice(5, 7) !== prev.date.slice(5, 7)) && w < weeks.length - 2;
          return (
            <g key={w} transform={`translate(${w * (CELL + GAP)} 0)`}>
              {showMonth && first ? (
                <text y={9} className="fill-subtle font-mono" fontSize={8.5}>
                  {monthFormat.format(new Date(`${first.date}T00:00:00Z`))}
                </text>
              ) : null}
              {week.map((day, d) =>
                day ? (
                  <rect
                    key={d}
                    y={16 + d * (CELL + GAP)}
                    width={CELL}
                    height={CELL}
                    rx={2.5}
                    className={day.level === 0 ? "fill-line" : "fill-accent"}
                    opacity={day.level === 0 ? 1 : LEVEL_OPACITY[day.level]}
                  >
                    <title>
                      {`${day.count} contribution${day.count === 1 ? "" : "s"} on ${dayFormat.format(new Date(`${day.date}T00:00:00Z`))}`}
                    </title>
                  </rect>
                ) : null,
              )}
            </g>
          );
        })}
      </svg>
    </>
  );
}
