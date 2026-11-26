import { BASE, deckPoints, keyPolygons, trackpadPoints } from "@/lib/laptop-base";

const KEYS = keyPolygons();

/** The keyboard deck in perspective. Gradient ids are prefixed so several laptops can share a page. */
export function LaptopBase({ id }: { id: string }) {
  const { width: W, height: H, back: B, depth: D } = BASE;
  return (
    <svg className="base" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-deck`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b3b40" />
          <stop offset="1" stopColor="#28282c" />
        </linearGradient>
        <linearGradient id={`${id}-lip`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a5a61" />
          <stop offset=".25" stopColor="#2a2a2e" />
          <stop offset="1" stopColor="#121214" />
        </linearGradient>
        <radialGradient id={`${id}-spill`} cx=".5" cy="0" r=".7">
          <stop
            offset="0"
            style={{
              stopColor: "var(--glow, #e2231a)",
              stopOpacity: "calc(var(--on) * .35)",
            }}
          />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <polygon points={deckPoints()} fill={`url(#${id}-deck)`} />
      <g fill="#0d0d0f" stroke="#050506" strokeWidth=".6">
        {KEYS.map((points) => (
          <polygon key={points} points={points} />
        ))}
      </g>
      <polygon
        points={trackpadPoints()}
        fill="#323237"
        stroke="#1d1d21"
        strokeWidth=".8"
      />
      <polygon points={deckPoints()} fill={`url(#${id}-spill)`} />
      <path
        d={`M0 ${D} H${W} V${D + 14} Q${W} ${H} ${W - 14} ${H} H14 Q0 ${H} 0 ${D + 14} Z`}
        fill={`url(#${id}-lip)`}
      />
      <path
        d={`M440 ${D} H560 Q558 ${D + 7} 548 ${D + 7} H452 Q442 ${D + 7} 440 ${D} Z`}
        fill="#141416"
      />
      <line x1={B} y1=".5" x2={W - B} y2=".5" stroke="#6a6a72" strokeWidth="1" />
    </svg>
  );
}
