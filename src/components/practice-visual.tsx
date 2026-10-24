import { useId, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/components/ui";

/**
 * Animated, code-drawn illustrations for each practice area. They are
 * abstract (no figures, names or statistics) and decorative, so they are
 * hidden from assistive technology. Animation classes live in globals.css and
 * are disabled for visitors who prefer reduced motion.
 */

const GOLD = "#C8A064";
const GOLD_DEEP = "#AD7E3A";
const GOLD_LIGHT = "#DCC29A";
const SILVER = "#ADAAB5";

const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

function Frame({ children, className }: { children: (id: string) => ReactNode; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg
      aria-hidden
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      className={cn("block h-full w-full", className)}
      fill="none"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0A1726" />
          <stop offset="1" stopColor="#1A3350" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.9" />
          <stop offset="1" stopColor={GOLD_DEEP} stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.35" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" stroke="#ffffff" strokeOpacity="0.045" />
        </pattern>
      </defs>
      <rect width="640" height="400" fill={`url(#${id}-bg)`} />
      <rect width="640" height="400" fill={`url(#${id}-grid)`} />
      {children(id)}
    </svg>
  );
}

/** Deal structuring: documents, a rising capital structure and a closing seal. */
function CapitalMarkets({ className }: { className?: string }) {
  const bars = [64, 88, 80, 116, 138, 168, 200];
  const tops = bars.map((h, i) => [97 + i * 70, 330 - h] as const);
  const curve = `M${tops.map(([x, y]) => `${x} ${y - 14}`).join(" L")}`;
  return (
    <Frame className={className}>
      {(id) => (
        <>
          <g stroke={SILVER} strokeOpacity="0.35">
            <rect x="52" y="62" width="110" height="124" rx="4" fill="#10243A" />
            <rect x="40" y="74" width="110" height="124" rx="4" fill="#10243A" />
            {[96, 110, 124, 138, 152].map((y, i) => (
              <path key={y} d={`M56 ${y}H${i === 4 ? 104 : 132}`} />
            ))}
            <path d="M56 176H96" stroke={GOLD} strokeOpacity="0.8" strokeWidth="2" />
          </g>
          <path d="M60 330H600" stroke={SILVER} strokeOpacity="0.35" />
          {bars.map((h, i) => (
            <rect
              key={i}
              className="viz-grow-y"
              style={delay(i * 0.12)}
              x={80 + i * 70}
              y={330 - h}
              width="34"
              height={h}
              fill={`url(#${id}-gold)`}
            />
          ))}
          <path
            className="viz-draw"
            style={delay(0.6)}
            pathLength={100}
            d={curve}
            stroke={GOLD_LIGHT}
            strokeWidth="2"
          />
          {tops.map(([x, y]) => (
            <circle key={x} cx={x} cy={y - 14} r="4" fill="#0A1726" stroke={GOLD_LIGHT} strokeWidth="1.5" />
          ))}
          <circle cx="548" cy="100" r="46" fill={`url(#${id}-glow)`} />
          <circle cx="548" cy="100" r="26" stroke={GOLD} strokeOpacity="0.8" />
          <circle className="viz-spin" cx="548" cy="100" r="35" stroke={SILVER} strokeOpacity="0.4" strokeDasharray="3 7" />
          <path
            className="viz-draw"
            style={delay(1.6)}
            pathLength={100}
            d="M536 101l8 8 16-18"
            stroke={GOLD_LIGHT}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </Frame>
  );
}

/** Strategy and public policy: a central mandate connected to stakeholders. */
function StrategicMarketing({ className }: { className?: string }) {
  const hub = [320, 200] as const;
  const nodes = [
    [120, 112],
    [96, 240],
    [210, 310],
    [452, 309],
    [560, 229],
    [520, 101],
    [330, 76],
  ] as const;
  return (
    <Frame className={className}>
      {(id) => (
        <>
          <circle cx={hub[0]} cy={hub[1]} r="110" fill={`url(#${id}-glow)`} />
          {[44, 88, 132].map((r, i) => (
            <circle
              key={r}
              className={i === 1 ? "viz-spin" : undefined}
              cx={hub[0]}
              cy={hub[1]}
              r={r}
              stroke={SILVER}
              strokeOpacity={0.28 - i * 0.06}
              strokeDasharray={i === 1 ? "2 8" : undefined}
            />
          ))}
          {nodes.map(([x, y], i) => {
            const next = nodes[(i + 1) % nodes.length];
            return (
              <path
                key={`edge-${i}`}
                d={`M${x} ${y}L${next[0]} ${next[1]}`}
                stroke={SILVER}
                strokeOpacity="0.12"
              />
            );
          })}
          {nodes.map(([x, y], i) => {
            const d = `M${hub[0]} ${hub[1]}L${x} ${y}`;
            return (
              <g key={`spoke-${i}`}>
                <path d={d} stroke={SILVER} strokeOpacity="0.3" />
                <path
                  className="viz-pulse"
                  style={delay(i * 0.45)}
                  pathLength={100}
                  d={d}
                  stroke={GOLD_LIGHT}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
          {nodes.map(([x, y], i) => (
            <rect
              key={`node-${i}`}
              x={x - 11}
              y={y - 11}
              width="22"
              height="22"
              rx="4"
              fill="#10243A"
              stroke={i % 3 === 0 ? GOLD : SILVER}
              strokeOpacity="0.85"
            />
          ))}
          <circle cx={hub[0]} cy={hub[1]} r="20" fill="#10243A" stroke={GOLD} strokeWidth="2" />
          <circle className="viz-blink" cx={hub[0]} cy={hub[1]} r="8" fill={GOLD} />
        </>
      )}
    </Frame>
  );
}

/** Technology: transaction streams through a secure gateway into one ledger. */
function InfrastructureTechnology({ className }: { className?: string }) {
  const streams = [100, 150, 200, 250, 300].map(
    (y) => `M24 ${y}C150 ${y} 170 200 290 200`,
  );
  return (
    <Frame className={className}>
      {(id) => (
        <>
          {streams.map((d, i) => (
            <g key={i}>
              <path d={d} stroke={SILVER} strokeOpacity="0.25" />
              <path
                className="viz-pulse"
                style={delay(i * 0.6)}
                pathLength={100}
                d={d}
                stroke={i % 2 ? SILVER : GOLD_LIGHT}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          ))}
          <circle cx="320" cy="200" r="90" fill={`url(#${id}-glow)`} />
          <rect x="290" y="130" width="60" height="140" rx="8" fill="#10243A" stroke={GOLD} strokeWidth="1.5" />
          <rect x="308" y="198" width="24" height="20" rx="3" stroke={GOLD_LIGHT} strokeWidth="1.5" />
          <path d="M313 198v-6a7 7 0 0 1 14 0v6" stroke={GOLD_LIGHT} strokeWidth="1.5" />
          {[146, 160, 240, 254].map((y, i) => (
            <circle key={y} className="viz-blink" style={delay(i * 0.7)} cx="320" cy={y} r="2.5" fill={SILVER} />
          ))}
          <path d="M350 200H410" stroke={SILVER} strokeOpacity="0.35" strokeWidth="2" />
          <path
            className="viz-pulse"
            pathLength={100}
            d="M350 200H410"
            stroke={GOLD_LIGHT}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="410" y="92" width="200" height="216" rx="6" fill="#10243A" stroke={SILVER} strokeOpacity="0.35" />
          <path d="M410 124H610" stroke={SILVER} strokeOpacity="0.3" />
          <circle cx="428" cy="108" r="4" fill={GOLD} />
          <path d="M442 108H500" stroke={SILVER} strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i} className="viz-row" style={delay(i * 0.5)}>
              <rect x="422" y={134 + i * 28} width="176" height="20" rx="3" fill={GOLD} fillOpacity="0.1" />
              <path
                d={`M432 ${144 + i * 28}H${500 + ((i * 23) % 40)}`}
                stroke={SILVER}
                strokeOpacity="0.55"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d={`M556 ${144 + i * 28}H588`}
                stroke={GOLD_LIGHT}
                strokeOpacity="0.8"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          ))}
        </>
      )}
    </Frame>
  );
}

/** Consulting and capacity building: an executive dashboard taking shape. */
function BusinessConsulting({ className }: { className?: string }) {
  const growth = "M74 290C120 283 150 264 190 257S260 220 300 199S350 132 372 108";
  return (
    <Frame className={className}>
      {(id) => (
        <>
          <rect x="50" y="72" width="344" height="256" rx="6" fill="#10243A" stroke={SILVER} strokeOpacity="0.3" />
          {[130, 180, 230, 280].map((y) => (
            <path key={y} d={`M74 ${y}H372`} stroke={SILVER} strokeOpacity="0.12" />
          ))}
          <path d="M74 94V306H372" stroke={SILVER} strokeOpacity="0.4" />
          <path d={`${growth}V306H74Z`} fill={`url(#${id}-gold)`} fillOpacity="0.35" className="viz-fade" />
          <path
            className="viz-draw"
            pathLength={100}
            d={growth}
            stroke={GOLD_LIGHT}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle className="viz-blink" cx="372" cy="108" r="5" fill={GOLD_LIGHT} />

          <rect x="414" y="72" width="176" height="120" rx="6" fill="#10243A" stroke={SILVER} strokeOpacity="0.3" />
          <circle cx="502" cy="132" r="36" stroke={SILVER} strokeOpacity="0.2" strokeWidth="10" />
          <circle
            className="viz-ring"
            cx="502"
            cy="132"
            r="36"
            pathLength={100}
            stroke={GOLD}
            strokeWidth="10"
            strokeDasharray="72 100"
            transform="rotate(-90 502 132)"
          />

          <rect x="414" y="208" width="176" height="120" rx="6" fill="#10243A" stroke={SILVER} strokeOpacity="0.3" />
          {[0.9, 0.62, 0.78, 0.5].map((w, i) => (
            <g key={i}>
              <rect x="432" y={226 + i * 24} width="140" height="10" rx="5" fill={SILVER} fillOpacity="0.15" />
              <rect
                className="viz-grow-x"
                style={delay(0.3 + i * 0.15)}
                x="432"
                y={226 + i * 24}
                width={140 * w}
                height="10"
                rx="5"
                fill={i === 0 ? GOLD : SILVER}
                fillOpacity={i === 0 ? 0.9 : 0.55}
              />
            </g>
          ))}
        </>
      )}
    </Frame>
  );
}

const visuals: Record<string, (props: { className?: string }) => ReactNode> = {
  "capital-markets": CapitalMarkets,
  "strategic-marketing": StrategicMarketing,
  "infrastructure-technology": InfrastructureTechnology,
  "business-consulting": BusinessConsulting,
};

export function PracticeVisual({ slug, className }: { slug: string; className?: string }) {
  const Visual = visuals[slug] ?? CapitalMarkets;
  return <Visual className={className} />;
}
