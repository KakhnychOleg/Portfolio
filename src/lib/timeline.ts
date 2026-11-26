import type { YearMonth } from "@/content/types";

export interface TimelineRange {
  start: YearMonth;
  end: YearMonth;
}

/** Horizontal placement of a bar inside the track, in percent (0–100). */
export interface BarPosition {
  left: number;
  width: number;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Converts "YYYY-MM" to a running month count, so month arithmetic is plain subtraction. */
export function monthIndex(value: YearMonth): number {
  const [year, month] = value.split("-").map(Number);
  return year * 12 + (month - 1);
}

/** Total months covered by a range. Both ends are inclusive: Jan–Dec is 12 months. */
export function rangeLength(range: TimelineRange): number {
  return monthIndex(range.end) - monthIndex(range.start) + 1;
}

/** "2021-05" → "May 2021". Fixed English names keep server and client output identical. */
export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "May 2021 – Jun 2022", or "Aug 2024 – Present" for an ongoing role. */
export function formatPeriod(start: YearMonth, end?: YearMonth): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : "Present"}`;
}

/**
 * Length of a role, like the Time column in DevTools: "1 yr 2 mo", "8 mo", "2 yr".
 * Both months count, so May 2021 – Jun 2022 is 14 months. An ongoing role runs to `today`.
 */
export function formatDuration(
  start: YearMonth,
  end: YearMonth | undefined,
  today: YearMonth,
): string {
  const months = monthIndex(end ?? today) - monthIndex(start) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years > 0 && `${years} yr`, rest > 0 && `${rest} mo`].filter(Boolean).join(" ");
}

/** One tick per January inside the range, positioned like a bar's left edge. */
export function getYearTicks(range: TimelineRange): { year: number; left: number }[] {
  const total = rangeLength(range);
  const first = monthIndex(range.start);
  const ticks: { year: number; left: number }[] = [];

  const startYear = Math.ceil(first / 12);
  const endYear = Math.floor(monthIndex(range.end) / 12);

  for (let year = startYear; year <= endYear; year++) {
    ticks.push({ year, left: ((year * 12 - first) / total) * 100 });
  }
  return ticks;
}

/**
 * Where a role's bar sits on the timeline track.
 *
 * Rules (see timeline.test.ts):
 * - A bar starts at the beginning of its start month and ends at the end of its end month.
 * - A missing `end` means the role is ongoing: the bar runs to the end of the range.
 * - Parts outside the range are clipped, so `left` and `left + width` stay within 0–100.
 * - An `end` earlier than `start` is a data error: throw.
 *
 * TODO(Oleh): implement. Hint: monthIndex() and rangeLength() do the heavy lifting.
 */
export function getBarPosition(
  start: YearMonth,
  end: YearMonth | undefined,
  range: TimelineRange,
): BarPosition {
  void start;
  void end;
  void range;
  return { left: 0, width: 0 };
}
