import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { brandIconDataUri } from "@/lib/brand-icon";

/**
 * Social card (1200×630) and Apple touch icon, rendered to PNG at build time
 * by the route handlers in src/app/og.png and src/app/apple-touch-icon.png.
 */

const LAYERS: number[][] = [
  [80, 160, 240],
  [40, 120, 200, 280],
  [80, 160, 240],
  [120, 200],
];
const XS = [20, 120, 220, 320];

export function renderSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(120deg, #06080d 0%, #070b14 55%, #0d1730 100%)",
          color: "#e7ebf2",
          fontFamily: "sans-serif",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 6,
            display: "flex",
            background: "linear-gradient(90deg, #6b9bff, #3dd6eb 50%, #a99bff)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 16,
                border: "1.5px solid rgba(148,163,184,0.3)",
                background: "#0b0f17",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              MI
            </div>
            <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#7d889b" }}>PORTFOLIO</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
              {profile.name}
            </div>
            <div style={{ display: "flex", marginTop: 30, fontSize: 32, color: "#9aa4b5" }}>
              Computer Science Undergraduate
            </div>
            <div style={{ display: "flex", marginTop: 6, fontSize: 32, color: "#9aa4b5" }}>
              building with&nbsp;<span style={{ color: "#6b9bff" }}>AI, Machine Learning &amp; Data.</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {["CSE @ AIUB", "AI / ML", "Data Science", "Research"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(148,163,184,0.25)",
                  fontSize: 20,
                  color: "#c7cedb",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <svg width="340" height="320" viewBox="0 0 340 320" style={{ position: "absolute", right: 84, top: 156 }}>
          {LAYERS.slice(0, -1).map((ys, l) =>
            ys.map((y1) =>
              LAYERS[l + 1].map((y2) => (
                <line
                  key={`${l}-${y1}-${y2}`}
                  x1={XS[l]}
                  y1={y1}
                  x2={XS[l + 1]}
                  y2={y2}
                  stroke="#6b9bff"
                  strokeOpacity={0.3}
                  strokeWidth={1.4}
                />
              )),
            ),
          )}
          {LAYERS.map((ys, l) =>
            ys.map((y) => (
              <circle
                key={`${l}-${y}`}
                cx={XS[l]}
                cy={y}
                r={10}
                fill="#0b0f17"
                stroke={l === LAYERS.length - 1 ? "#3dd6eb" : "#6b9bff"}
                strokeWidth={2}
              />
            )),
          )}
        </svg>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

/** Full-bleed square: iOS applies its own rounded mask to touch icons. */
export function renderAppleIcon() {
  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by Satori, not the DOM
    <img src={brandIconDataUri({ rounded: false })} width={180} height={180} alt="" />,
    { width: 180, height: 180 },
  );
}
