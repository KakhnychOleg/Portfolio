// WCAG 2.x contrast check for every text colour the page uses on its black background.
// Translucent colours are composited over the background first. Exits 1 on any failure.
const BG = [12, 11, 11]; // --black #0c0b0b
const BONE = [237, 235, 230];

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const over = (rgb, a, bg = BG) => rgb.map((c, i) => Math.round(c * a + bg[i] * (1 - a)));
const lum = (rgb) => {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [name, foreground, background, minimum] — 4.5 for body text, 3 for large display text.
const pairs = [
  ["bone text", BONE, BG, 4.5],
  ["--dim text (60% bone)", over(BONE, 0.6), BG, 4.5],
  ["other projects name (75% bone)", over(BONE, 0.75), BG, 4.5],
  ["job bullets (82% bone)", over(BONE, 0.82), BG, 4.5],
  ["--accent-ink text #ff4a3d", hex("#ff4a3d"), BG, 4.5],
  ["black on bone button", BG, BONE, 4.5],
  ["row name on red hover (large text)", BONE, hex("#e2231a"), 3],
  ["row details on red hover (white)", [255, 255, 255], hex("#e2231a"), 4.5],
  [
    "header text over translucent header",
    over(BONE, 0.6, over(BG, 0.72, BONE)),
    over(BG, 0.72),
    4.5,
  ],
];

let failed = 0;
for (const [name, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? "pass" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${name}`,
  );
}
process.exit(failed ? 1 : 0);
