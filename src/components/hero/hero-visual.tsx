"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn, hash01 } from "@/lib/utils";
import { Crosshairs } from "@/components/ui/crosshairs";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/* ------------------------------------------------------------------ */
/* Stages                                                              */
/* ------------------------------------------------------------------ */

const STAGES = [
  { label: "Dataset", caption: "Collect and clean structured data — rows of features and labels." },
  { label: "Model", caption: "A model learns patterns as signals pass through its layers." },
  { label: "Prediction", caption: "New inputs are scored, producing a probability for each outcome." },
  { label: "Insight", caption: "Explainability shows which features drove the prediction — and why." },
] as const;

const STAGE_MS = 2800;

/* ------------------------------------------------------------------ */
/* Geometry (static, computed once at module load)                     */
/* ------------------------------------------------------------------ */

const CENTER_Y = 150;
const spread = (n: number, gap: number) =>
  Array.from({ length: n }, (_, i) => CENTER_Y - ((n - 1) * gap) / 2 + i * gap);

const rand = hash01;

const LAYERS = [
  { x: 168, ys: spread(4, 44) },
  { x: 248, ys: spread(6, 34) },
  { x: 328, ys: spread(5, 38) },
  { x: 402, ys: spread(3, 46) },
];

type Node = { id: string; layer: number; x: number; y: number };
type Edge = { id: string; from: string; to: string; layer: number; d: string; w: number };

const NODES: Node[] = LAYERS.flatMap((layer, l) =>
  layer.ys.map((y, i) => ({ id: `${l}-${i}`, layer: l, x: layer.x, y })),
);

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
};

const EDGES: Edge[] = LAYERS.slice(0, -1).flatMap((layer, l) =>
  layer.ys.flatMap((y1, i) =>
    LAYERS[l + 1].ys.map((y2, j) => ({
      id: `${l}-${i}>${l + 1}-${j}`,
      from: `${l}-${i}`,
      to: `${l + 1}-${j}`,
      layer: l,
      d: curve(layer.x + 6, y1, LAYERS[l + 1].x - 6, y2),
      w: Math.round((0.45 + rand(l * 100 + i * 10 + j) * 0.9) * 100) / 100,
    })),
  ),
);

/** Feature columns share colours with the explanation bars on the right. */
const FEATURE_COLORS = ["fill-accent", "fill-accent-2", "fill-accent-3", "fill-subtle"];
const DATA_ROWS = Array.from({ length: 7 }, (_, r) => 54 + r * 30);
const ROW_TO_INPUT = [0, 0, 1, 2, 2, 3];
const PREDICTION = [0.74, 0.19, 0.07];
const ATTRIBUTION = [0.92, 0.62, 0.4, 0.2];

const REGIONS = [
  { x: 8, y: 38, w: 106, h: 216 },
  { x: 150, y: 52, w: 196, h: 196 },
  { x: 386, y: 78, w: 106, h: 144 },
  { x: 500, y: 92, w: 132, h: 116 },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function HeroVisual() {
  // With reduced motion: show the complete pipeline and don't autoplay (until the visitor chooses to).
  const reduced = usePrefersReducedMotion();
  const [stageChoice, setStage] = useState<number | null>(null);
  const [playChoice, setPlaying] = useState<boolean | null>(null);
  const stage = stageChoice ?? (reduced ? 3 : 0);
  const playing = playChoice ?? !reduced;

  const [inView, setInView] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [cycle, setCycle] = useState(0);
  const rootRef = useRef<HTMLElement>(null);

  // Pause when scrolled out of view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const running = playing && inView;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setStage((s) => ((s ?? 0) + 1) % STAGES.length);
      setCycle((c) => c + 1);
    }, STAGE_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const selectStage = (i: number) => {
    setStage(i);
    setPlaying(false);
  };

  const connected = hovered ? new Set(EDGES.filter((e) => e.from === hovered || e.to === hovered).map((e) => e.id)) : null;

  return (
    <figure ref={rootRef} className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
      {/* soft glow behind the panel */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_45%,var(--glow-1),transparent_70%)] blur-2xl"
      />

      <div className="relative">
      <Crosshairs />
      <div className="card orbit-frame overflow-hidden rounded-2xl backdrop-blur-xl">
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <div className="flex items-center gap-2 font-mono text-[11px] text-subtle">
            <span className={cn("size-1.5 rounded-full", running ? "bg-success" : "bg-subtle")} aria-hidden />
            explainable_pipeline.py
          </div>
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-subtle transition-colors hover:bg-surface-hover hover:text-fg"
            aria-label={playing ? "Pause animation" : "Play animation"}
          >
            {playing ? <Pause size={11} aria-hidden /> : <Play size={11} aria-hidden />}
            {playing ? "pause" : "play"}
          </button>
        </div>

        {/* diagram */}
        <div className={cn("px-2 py-3 sm:px-4", !running && "[&_*]:[animation-play-state:paused]")}>
          <svg viewBox="0 0 640 300" className="h-auto w-full" aria-hidden="true">
            {/* stage regions */}
            {REGIONS.map((r, i) => (
              <rect
                key={i}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx={14}
                className={cn(
                  "transition-[opacity,fill,stroke] duration-500",
                  stage === i ? "fill-accent/[0.06] stroke-accent/40 opacity-100" : "fill-transparent stroke-line opacity-0",
                )}
                strokeDasharray="4 5"
                strokeWidth={1}
              />
            ))}

            {/* dataset table */}
            {DATA_ROWS.map((y, r) => (
              <g key={r}>
                {FEATURE_COLORS.map((color, c) => {
                  const base = r === 0 ? 0.85 : Math.round((0.16 + rand(r * 7 + c) * 0.34) * 1000) / 1000;
                  const highlight = stage === 3 && c === 0 && r > 0;
                  return (
                    <rect
                      key={c}
                      x={20 + c * 21}
                      y={y}
                      width={16}
                      height={r === 0 ? 6 : 9}
                      rx={2}
                      className={cn(color, "transition-opacity duration-500")}
                      style={{
                        opacity: highlight ? 0.95 : base,
                        ["--cell-o" as string]: base,
                        animation:
                          stage === 0 && r > 0 ? `cell-shimmer 1.6s ease-in-out ${r * 0.12 + c * 0.05}s infinite` : undefined,
                      }}
                    />
                  );
                })}
              </g>
            ))}

            {/* dataset → input */}
            {ROW_TO_INPUT.map((target, r) => {
              const y = DATA_ROWS[r + 1] + 4.5;
              const node = LAYERS[0].ys[target];
              return (
                <path
                  key={r}
                  d={curve(106, y, LAYERS[0].x - 7, node)}
                  fill="none"
                  strokeWidth={1}
                  strokeDasharray={stage === 0 ? "3 4" : undefined}
                  className={cn("transition-colors duration-500", stage === 0 ? "stroke-accent/70" : "stroke-line-strong")}
                  style={stage === 0 ? { animation: "dash-flow 1s linear infinite" } : undefined}
                />
              );
            })}

            {/* network edges */}
            <g fill="none">
              {EDGES.map((e) => (
                <path key={e.id} d={e.d} strokeWidth={e.w * 0.8} className="stroke-line-strong" />
              ))}
            </g>

            {/* forward-pass wave */}
            <g fill="none" className="transition-opacity duration-700" style={{ opacity: stage === 1 ? 1 : 0.5 }}>
              {[0, 1, 2].map((l) => (
                <g key={l} style={{ animation: `wave ${STAGE_MS}ms ease-in-out ${l * 0.32}s infinite`, opacity: 0.06 }}>
                  {EDGES.filter((e) => e.layer === l).map((e) => (
                    <path key={e.id} d={e.d} strokeWidth={e.w} className="stroke-accent" />
                  ))}
                </g>
              ))}
            </g>

            {/* hover highlight */}
            {connected ? (
              <g fill="none">
                {EDGES.filter((e) => connected.has(e.id)).map((e) => (
                  <path key={e.id} d={e.d} strokeWidth={1.4} className="stroke-accent-2" />
                ))}
              </g>
            ) : null}

            {/* output → prediction bars */}
            {LAYERS[3].ys.map((y, i) => (
              <g key={i}>
                <line x1={408} y1={y} x2={418} y2={y} strokeWidth={1} className="stroke-line-strong" />
                <rect x={420} y={y - 4} width={62} height={8} rx={4} className="fill-line" />
                <rect
                  x={420}
                  y={y - 4}
                  width={62 * PREDICTION[i]}
                  height={8}
                  rx={4}
                  className={cn("transition-transform duration-700 ease-out", i === 0 ? "fill-accent" : "fill-subtle/60")}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "left center",
                    transform: stage >= 2 ? "scaleX(1)" : "scaleX(0)",
                    transitionDelay: `${i * 90}ms`,
                  }}
                />
              </g>
            ))}

            {/* prediction → insight */}
            <path
              d={curve(486, LAYERS[3].ys[0], 510, 116)}
              fill="none"
              strokeWidth={1}
              strokeDasharray="2 4"
              className={cn("transition-colors duration-500", stage === 3 ? "stroke-accent/80" : "stroke-line-strong")}
            />

            {/* insight: feature attribution */}
            {ATTRIBUTION.map((value, i) => {
              const y = 116 + i * 24;
              return (
                <g key={i}>
                  <rect x={512} y={y - 3.5} width={7} height={7} rx={2} className={FEATURE_COLORS[i]} />
                  <rect x={526} y={y - 4} width={92} height={8} rx={4} className="fill-line" />
                  <rect
                    x={526}
                    y={y - 4}
                    width={92 * value}
                    height={8}
                    rx={4}
                    className={cn(FEATURE_COLORS[i], "transition-transform duration-700 ease-out")}
                    style={{
                      opacity: 0.85,
                      transformBox: "fill-box",
                      transformOrigin: "left center",
                      transform: stage === 3 ? "scaleX(1)" : "scaleX(0)",
                      transitionDelay: `${i * 90}ms`,
                    }}
                  />
                </g>
              );
            })}

            {/* nodes */}
            {NODES.map((n) => {
              const isHovered = hovered === n.id;
              const lit =
                (stage === 1 && n.layer < 3) || (stage === 2 && n.layer === 3) || (stage === 0 && n.layer === 0);
              return (
                <g key={n.id}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isHovered ? 7.5 : 5.5}
                    strokeWidth={1.25}
                    className={cn(
                      "fill-bg-elevated transition-all duration-300",
                      isHovered ? "stroke-accent-2" : lit ? "stroke-accent" : "stroke-line-strong",
                    )}
                  />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={2.6}
                    className="fill-accent"
                    style={{
                      opacity: 0.12,
                      animation: n.layer < 3 ? `wave ${STAGE_MS}ms ease-in-out ${n.layer * 0.32 + 0.18}s infinite` : undefined,
                      ...(n.layer === 3 && stage >= 2 ? { opacity: n.y === LAYERS[3].ys[0] ? 1 : 0.4 } : {}),
                    }}
                  />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={12}
                    fill="transparent"
                    className="cursor-crosshair"
                    onPointerEnter={() => setHovered(n.id)}
                    onPointerLeave={() => setHovered(null)}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* stage stepper */}
        <div className="grid grid-cols-4 border-t border-line" role="group" aria-label="Pipeline stages">
          {STAGES.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => selectStage(i)}
              aria-pressed={stage === i}
              className={cn(
                "relative flex flex-col items-start gap-0.5 px-3 py-2.5 text-left transition-colors sm:px-4",
                i > 0 && "border-l border-line",
                stage === i ? "bg-surface-hover" : "hover:bg-surface",
              )}
            >
              <span className={cn("font-mono text-[10px]", stage === i ? "text-accent" : "text-subtle")}>
                0{i + 1}
              </span>
              <span className={cn("text-[12.5px] font-medium sm:text-[13px]", stage === i ? "text-fg" : "text-muted")}>
                {s.label}
              </span>
              {stage === i ? (
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-line">
                  <span
                    key={`${stage}-${cycle}-${running}`}
                    className="block h-full origin-left bg-accent"
                    style={{ animation: running ? `progress-fill ${STAGE_MS}ms linear forwards` : undefined }}
                  />
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <p className="min-h-[3.75rem] border-t border-line px-4 py-3 text-[13px] leading-relaxed text-muted sm:min-h-0">
          <span className="font-medium text-fg">{STAGES[stage].label}.</span> {STAGES[stage].caption}
        </p>
      </div>
      </div>
      <figcaption className="mt-4 flex gap-2 font-mono text-[11px] leading-relaxed text-subtle">
        <span className="shrink-0 text-accent">Fig. 1</span>
        <span>
          From data to insight — an explainable ML pipeline. Illustrative values, not results.
          <span className="sr-only">
            {" "}
            Data rows flow from a dataset into a neural network model, which produces predictions, followed by an
            explanation of which features mattered most.
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
