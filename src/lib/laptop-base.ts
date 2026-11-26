/**
 * Geometry for the laptop's keyboard deck, seen from slightly above.
 * The deck is a trapezoid: the back edge (at the hinge) is inset by BACK on both sides and
 * widens to the full width at the front. Every key is a quad whose x positions are
 * interpolated between those two edges, which is what a perspective projection does.
 * Coordinates are viewBox units; `u` is a 0..1 position across the deck.
 */
export const BASE = { width: 1000, height: 136, back: 70, depth: 112 } as const;

const KEYBOARD = { u0: 0.135, u1: 0.865, y0: 9, y1: 74 } as const;
const ROW_GAP = 0.1;
const KEY_PAD = 0.0022;

/** Rows from the function keys down to the space bar; numbers are relative key widths. */
const ROWS: { h: number; keys: number[] }[] = [
  { h: 0.55, keys: Array(14).fill(1) },
  { h: 1, keys: [...Array(13).fill(1), 1.5] },
  { h: 1, keys: [1.5, ...Array(13).fill(1)] },
  { h: 1, keys: [1.8, ...Array(11).fill(1), 1.7] },
  { h: 1, keys: [2.3, ...Array(10).fill(1), 2.2] },
  { h: 1, keys: [1, 1, 1, 1.3, 5.4, 1.3, 1, 1, 1, 1] },
];

const round = (n: number) => Math.round(n * 100) / 100;

/** x of a point `u` across the deck at depth `y`. */
export function xAt(u: number, y: number) {
  const inset = BASE.back * (1 - y / BASE.depth);
  return inset + u * (BASE.width - 2 * inset);
}

/** SVG `points` for the quad between u0..u1 and y0..y1. */
export function quad(u0: number, u1: number, y0: number, y1: number) {
  return [
    [xAt(u0, y0), y0],
    [xAt(u1, y0), y0],
    [xAt(u1, y1), y1],
    [xAt(u0, y1), y1],
  ]
    .map(([x, y]) => `${round(x)},${round(y)}`)
    .join(" ");
}

/** Every key as an SVG polygon `points` string, row by row. */
export function keyPolygons(): string[] {
  const { u0, u1, y0, y1 } = KEYBOARD;
  const unitsH = ROWS.reduce((n, r) => n + r.h, 0) + ROW_GAP * (ROWS.length - 1);
  const keys: string[] = [];
  let y = y0;
  for (const row of ROWS) {
    const h = (row.h / unitsH) * (y1 - y0);
    const total = row.keys.reduce((a, b) => a + b, 0);
    let u = u0;
    for (const k of row.keys) {
      const w = (k / total) * (u1 - u0);
      keys.push(quad(u + KEY_PAD, u + w - KEY_PAD, y + 0.35, y + h - 0.35));
      u += w;
    }
    y += h + (ROW_GAP / unitsH) * (y1 - y0);
  }
  return keys;
}

export const deckPoints = () => {
  const { width: W, back: B, depth: D } = BASE;
  return `${B},0 ${W - B},0 ${W},${D} 0,${D}`;
};

export const trackpadPoints = () => quad(0.355, 0.645, 79, 106);
