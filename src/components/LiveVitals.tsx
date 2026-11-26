"use client";

import { useEffect, useState } from "react";
import type { Metric } from "web-vitals";

type Reading = Pick<Metric, "value" | "rating">;

/**
 * Shows the visitor's own LCP and CLS for this page, measured in their browser.
 * Nothing here is hardcoded: until the browser reports a value, the row says so.
 */
export function LiveVitals() {
  const [lcp, setLcp] = useState<Reading | null>(null);
  const [cls, setCls] = useState<Reading | null>(null);

  useEffect(() => {
    let active = true;
    // Loaded lazily so the measuring code never competes with the content it measures.
    import("web-vitals").then(({ onLCP, onCLS }) => {
      if (!active) return;
      // reportAllChanges: report as soon as a value exists, not only when the tab is hidden.
      onLCP(({ value, rating }) => setLcp({ value, rating }), { reportAllChanges: true });
      onCLS(({ value, rating }) => setCls({ value, rating }), { reportAllChanges: true });
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-[0.9375rem] tabular-nums">
      <dl className="flex gap-x-6">
        <Vital
          name="Largest Contentful Paint"
          short="LCP"
          reading={lcp}
          format={(v) => `${(v / 1000).toFixed(2)} s`}
        />
        <Vital
          name="Cumulative Layout Shift"
          short="CLS"
          reading={cls}
          format={(v) => v.toFixed(2)}
        />
      </dl>
      <p className="text-muted">measured in your browser</p>
    </div>
  );
}

function Vital({
  name,
  short,
  reading,
  format,
}: {
  name: string;
  short: string;
  reading: Reading | null;
  format: (value: number) => string;
}) {
  return (
    <div className="flex gap-1.5">
      <dt>
        <abbr title={name} className="text-muted no-underline">
          {short}
        </abbr>
      </dt>
      <dd
        className={
          reading === null
            ? "text-muted"
            : reading.rating === "good"
              ? "font-medium text-signal"
              : "font-medium text-ink"
        }
      >
        {reading === null ? "Measuring" : format(reading.value)}
      </dd>
    </div>
  );
}
