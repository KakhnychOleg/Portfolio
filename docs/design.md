# Design system — "Waterfall"

## Concept

Oleh's specialty is making pages load fast and get found. The site borrows one idea from the
browser DevTools Network panel — the **waterfall chart** — and uses it to tell his career:
each role is a bar on a shared time axis, as if his history were a page loading.

The waterfall's structure (a label track on the left, a time track on the right) becomes the
grid for the **whole page**: section headings sit in the label track, content sits in the
time track. One idea, carried all the way down.

## Color

Cool and quiet. Color carries meaning, never decoration.

| Token     | Light     | Dark      | Role                                              |
| --------- | --------- | --------- | ------------------------------------------------- |
| `paper`   | `#F1F3F6` | `#0D0F1C` | Page background                                   |
| `surface` | `#FFFFFF` | `#151829` | Raised areas (chart track, project rows on hover) |
| `ink`     | `#0D0F1C` | `#ECEEF6` | Headings, name                                    |
| `body`    | `#3B4152` | `#C2C7D8` | Body text                                         |
| `muted`   | `#5B6274` | `#8E95AC` | Dates, meta, axis labels                          |
| `cobalt`  | `#3341D1` | `#8E9BFF` | Interactive + current: links, focus, current role |
| `signal`  | `#0B7A52` | `#45D49A` | "Done / good": past roles, passing live metrics   |
| `rule`    | `#DCE0E8` | `#23273B` | Grid lines, dividers (decorative)                 |

All text pairs pass WCAG AA (lowest: `signal` on `paper` light, 4.82:1).
Color is never the only signal — every bar also has a text label.

## Type

**Instrument Sans** (variable: weight 400–700, width 75–100). One family, two voices via
the width axis:

- **Display** — name and section headings: width 75 (condensed), weight 600–700, tight
  tracking. Condensed type echoes the dense rows of a network panel.
- **Text** — everything else: width 100, weight 400/500.
- Dates and axis labels use `tabular-nums` so figures line up like a timetable. No
  monospace.

Scale (rem): 0.8125 meta · 0.9375 small · 1.0625 body (line-height 1.65) · 1.25 lead ·
1.5 h3 · 2.25 h2 (display) · `clamp(3.5rem, 10vw, 8rem)` name (display).

Measure: body text max ~68ch.

## Layout

```
DESKTOP (≥ 1024px)
┌──────────────────────────────────────────────────────────────┐
│ Oleh Kakhnych                 About Experience Projects  ◐   │  sticky top bar
├──────────────────────────────────────────────────────────────┤
│ OLEH KAKHNYCH (condensed, huge)                              │
│ Full-Stack Web Engineer … tagline                            │
│ Email  LinkedIn  GitHub  Telegram  Resume                    │
│                                                              │
│ label track   │ 2021   2022   2023   2024   2025   2026      │
│ WEZOM         │ ████                                         │
│ Southwest St. │      ███                                     │
│ WildWeb       │          ██████                              │
│ BIG           │                 ██████████████▶              │
│ This page     │ LCP 0.4 s   CLS 0   (measured live)          │
├───────────────┼──────────────────────────────────────────────┤
│ About         │ prose (≤ 68ch)                               │  heading sticky in
│ Experience    │ role rows + tech tags                        │  its label track
│ Projects      │ project rows (no cards)                      │
│ Contact       │ one sentence + email                         │
└───────────────┴──────────────────────────────────────────────┘

MOBILE
Name / tagline / links
Waterfall: label above each bar, bars keep the shared time axis
Sections stack: heading above content
```

Left-aligned everywhere. The left edge of the label track is the spine of the page.

## The signature element: career waterfall

- Bars are real links, positioned from the real start and end dates. Hover/focus shows the
  date range; activating a bar scrolls to that role in Experience.
- Current role (BIG) is `cobalt` with an open end; past roles are `signal`.
- Last row, **"This page"**, shows the visitor's own LCP and CLS, measured with
  `web-vitals`. Until a value exists it says "Measuring". Nothing is hardcoded.
- One orchestrated motion moment: on load, bars draw left to right in sequence (~700 ms).
  `prefers-reduced-motion`: bars render complete, no animation.
- Accessible as an ordered list with visually hidden full date ranges.

## Principles

1. **Metrics are earned.** Only numbers from the resume or measured live.
2. **One chart, then typography.** The waterfall is the only visual flourish.
3. **The page has a budget.** No images above the fold, no animation library, CSS-only chart.
4. **Color means status.** Cobalt = current/interactive, signal = done/good. Nothing else is colored.
5. **No template chrome.** No all-caps eyebrows, no 01/02/03, no cards with shadows, no "→" on links.
