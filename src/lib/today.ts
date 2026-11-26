import { cacheLife } from "next/cache";
import type { YearMonth } from "@/content/types";

/**
 * The current month, used as the right edge of the timeline.
 *
 * With Cache Components, reading the clock during render makes a page dynamic. "use cache"
 * keeps the page static and recomputes the value at most once a day.
 */
export async function getCurrentMonth(): Promise<YearMonth> {
  "use cache";
  cacheLife("days");
  return new Date().toISOString().slice(0, 7) as YearMonth;
}
