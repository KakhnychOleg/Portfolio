import { describe, expect, it } from "vitest";
import { BASE, keyPolygons, quad, xAt } from "./laptop-base";

const parse = (points: string) => points.split(" ").map((p) => p.split(",").map(Number));

describe("laptop base geometry", () => {
  it("narrows the deck at the hinge and spans full width at the front", () => {
    expect(xAt(0, 0)).toBe(BASE.back);
    expect(xAt(1, 0)).toBe(BASE.width - BASE.back);
    expect(xAt(0, BASE.depth)).toBe(0);
    expect(xAt(1, BASE.depth)).toBe(BASE.width);
  });

  it("draws a quad wider at the front than at the back", () => {
    const [tl, tr, br, bl] = parse(quad(0.2, 0.8, 10, 60));
    expect(br[0] - bl[0]).toBeGreaterThan(tr[0] - tl[0]);
    expect(tl[1]).toBe(10);
    expect(bl[1]).toBe(60);
  });

  it("lays out 70 keys inside the deck, row by row without overlap", () => {
    const keys = keyPolygons().map(parse);
    expect(keys).toHaveLength(14 + 14 + 14 + 13 + 12 + 10);
    for (const k of keys) {
      for (const [x, y] of k) {
        expect(x).toBeGreaterThan(0);
        expect(x).toBeLessThan(BASE.width);
        expect(y).toBeGreaterThan(0);
        expect(y).toBeLessThan(BASE.depth);
      }
    }
    // The first key of each row starts below the previous row's last key.
    const firstRow = keys.slice(0, 14);
    const secondRowTop = keys[14][0][1];
    expect(secondRowTop).toBeGreaterThan(Math.max(...firstRow.map((k) => k[2][1])));
  });
});
