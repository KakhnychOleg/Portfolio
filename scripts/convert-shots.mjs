// Converts the source screenshots (JPEG, kept outside git) into the WebP files the site serves.
// Usage: npm run shots [-- <source dir>]   (default: prototypes/shots)
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve(process.argv[2] ?? "prototypes/shots");
const OUT = path.resolve("public/shots");

// Live projects with a screenshot (keep in sync with src/content/projects.ts).
const LIVE = [
  "solodesk", "ledgerpeek", "novasnap", "ezblockchain", "poldingroup", "aviaoil", "ucoil",
  "nvatransportation", "clevertransco", "allistrade", "newenergy", "saunazeder",
  "burocreativelab", "philly", "brillant", "venusmed", "vyturio", "picklinika", "safarmes",
  "overwatchclan", "mirkas",
];
const FEATURED = ["solodesk"];

// [suffix, max width, quality]: first screens feed the cursor preview, full pages scroll
// inside the featured laptop and phone.
const jobs = [
  ...LIVE.map((s) => [s, "desktop", 720, 70]),
  ...FEATURED.flatMap((s) => [
    [s, "desktop-full", 1280, 68],
    [s, "mobile-full", 520, 68],
  ]),
];

await mkdir(OUT, { recursive: true });
let total = 0;
for (const [slug, kind, width, quality] of jobs) {
  const src = path.join(SRC, `${slug}-${kind}.jpg`);
  const dest = path.join(OUT, `${slug}-${kind}.webp`);
  const info = await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(dest);
  total += (await stat(dest)).size;
  console.log(`${path.basename(dest)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
console.log(`${jobs.length} files, ${(total / 1024 / 1024).toFixed(2)} MB`);
