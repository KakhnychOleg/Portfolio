import type { CSSProperties } from "react";
import { roles } from "@/content/experience";
import {
  formatDuration,
  formatPeriod,
  formatYearMonth,
  getBarPosition,
  getYearTicks,
  monthIndex,
  type TimelineRange,
} from "@/lib/timeline";
import { getCurrentMonth } from "@/lib/today";
import { LiveVitals } from "./LiveVitals";

/**
 * Shared row grid, like the DevTools Network panel: name | waterfall | time.
 * On phones the name and time share a line and the bar gets the full width below.
 * The label column width is the same one every section below uses.
 */
const ROW =
  "grid items-center gap-x-6 gap-y-1.5 grid-cols-[minmax(0,1fr)_auto] [grid-template-areas:'label_time'_'track_track'] sm:grid-cols-[var(--spacing-label)_minmax(0,1fr)_4.5rem] sm:[grid-template-areas:'label_track_time']";

/**
 * The career, drawn like the DevTools Network waterfall: one bar per role on a shared
 * time axis, oldest at the top, the way requests stack as a page loads.
 */
export async function Waterfall() {
  const currentMonth = await getCurrentMonth();
  const chronological = [...roles].sort(
    (a, b) => monthIndex(a.start) - monthIndex(b.start),
  );
  const range: TimelineRange = {
    start: chronological[0].start,
    end: currentMonth,
  };
  const ticks = getYearTicks(range);

  return (
    <figure aria-labelledby="waterfall-caption" className="mt-16 sm:mt-20">
      <figcaption id="waterfall-caption" className="sr-only">
        Career timeline from {formatYearMonth(range.start)} to today. Select a role to
        read about it.
      </figcaption>

      {/* Time axis */}
      <div
        aria-hidden="true"
        className={`${ROW} text-[0.8125rem] text-muted tabular-nums`}
      >
        <span className="[grid-area:label]">Role</span>
        <span className="text-right [grid-area:time]">Time</span>
        <div className="relative h-6 [grid-area:track]">
          {ticks.map((tick) => (
            <span
              key={tick.year}
              className="absolute top-0 h-full border-l border-rule pl-1.5"
              style={{ left: `${tick.left}%` }}
            >
              {tick.year}
            </span>
          ))}
        </div>
      </div>

      <ol className="mt-1 border-t border-rule">
        {chronological.map((role, index) => {
          const { left, width } = getBarPosition(role.start, role.end, range);
          const current = role.end === undefined;
          const period = formatPeriod(role.start, role.end);

          return (
            <li key={role.id} className={`${ROW} border-b border-rule py-3`}>
              <span className="truncate text-[0.9375rem] font-medium text-ink [grid-area:label]">
                {role.shortName}
              </span>
              <span className="text-right text-[0.9375rem] text-muted tabular-nums [grid-area:time]">
                {formatDuration(role.start, role.end, currentMonth)}
              </span>
              <div className="relative h-7 [grid-area:track]">
                <YearGrid ticks={ticks} />
                {/* The link is the full row height (a comfortable hit area); the bar is drawn inside it. */}
                <a
                  href={`#role-${role.id}`}
                  className="group absolute inset-y-0 flex items-center"
                  style={{ left: `${left}%`, width: `${width}%` }}
                >
                  <span
                    aria-hidden="true"
                    className={`h-3 w-full bar-draw transition-[filter] group-hover:brightness-110 ${
                      current ? "bar-ongoing bg-cobalt" : "rounded-[2px] bg-signal"
                    }`}
                    style={{ "--bar-delay": `${index * 140}ms` } as CSSProperties}
                  />
                  <span className="sr-only">
                    {role.company}, {period}
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-full left-0 mb-2 rounded-sm bg-ink px-2 py-1 text-[0.8125rem] whitespace-nowrap text-paper tabular-nums opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    {period}
                  </span>
                </a>
              </div>
            </li>
          );
        })}

        <li className="grid grid-cols-1 items-center gap-x-6 gap-y-1.5 py-3 sm:grid-cols-[var(--spacing-label)_minmax(0,1fr)]">
          <span className="text-[0.9375rem] font-medium text-ink">This page</span>
          <LiveVitals />
        </li>
      </ol>
    </figure>
  );
}

function YearGrid({ ticks }: { ticks: { year: number; left: number }[] }) {
  return (
    <div aria-hidden="true">
      {ticks.map((tick) => (
        <span
          key={tick.year}
          className="absolute inset-y-0 border-l border-rule"
          style={{ left: `${tick.left}%` }}
        />
      ))}
    </div>
  );
}
