"use client";

import { useEffect, useState } from "react";

/** Current time in the given zone, e.g. "14:05 (Kyiv)". Rendered after mount to avoid a hydration mismatch. */
export function LocalTime({ timeZone, label }: { timeZone: string; label: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(`${format.format(new Date())} (${label})`);
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone, label]);

  return <time suppressHydrationWarning>{time}</time>;
}
