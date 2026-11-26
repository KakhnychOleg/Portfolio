"use client";

import { type CSSProperties, type ReactNode, useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/** The tall scene whose scroll position drives --text, --open, --on and --scroll. */
export function SceneShell({ glow, children }: { glow?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref);
  return (
    <article
      ref={ref}
      className="scene"
      style={glow ? ({ "--glow": glow } as CSSProperties) : undefined}
    >
      {children}
    </article>
  );
}
