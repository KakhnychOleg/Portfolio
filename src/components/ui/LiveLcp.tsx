"use client";

import { useEffect, useState } from "react";

/** This page's real Largest Contentful Paint, measured in the visitor's browser. */
export function LiveLcp() {
  const [value, setValue] = useState("measuring");

  useEffect(() => {
    if (!PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint")) {
      // Older Safari and Firefox do not report LCP.
      const id = requestAnimationFrame(() => setValue("n/a in this browser"));
      return () => cancelAnimationFrame(id);
    }
    const observer = new PerformanceObserver((list) => {
      const last = list.getEntries().at(-1);
      if (last) setValue(`${(last.startTime / 1000).toFixed(2)} s`);
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
    return () => observer.disconnect();
  }, []);

  return <>{value}</>;
}
