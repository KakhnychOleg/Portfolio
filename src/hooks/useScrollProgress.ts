"use client";

import { type RefObject, useEffect } from "react";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export interface SceneVars {
  text: number;
  open: number;
  on: number;
  scroll: number;
}

/**
 * Maps a scene's position to its animation stages.
 * `enter` goes 0→1 while the scene's top travels up the viewport; `p` goes 0→1 while
 * the (taller than viewport) scene scrolls past its sticky pin.
 */
export function sceneProgress(top: number, height: number, vh: number): SceneVars {
  const p = clamp(-top / Math.max(1, height - vh));
  const enter = clamp((vh - top) / vh);
  return {
    text: clamp((enter - 0.35) / 0.4),
    open: clamp((enter - 0.3) / 0.7),
    on: clamp((p - 0.02) / 0.14 + (enter > 0.98 ? 0.15 : 0)),
    scroll: clamp((p - 0.2) / 0.72),
  };
}

/**
 * Writes the scene's progress into CSS variables (--text, --open, --on, --scroll).
 * One passive scroll listener, at most one rAF per frame, no React re-renders.
 * With reduced motion it does nothing: the CSS shows the final state.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const v = sceneProgress(r.top, r.height, window.innerHeight);
      el.style.setProperty("--text", v.text.toFixed(3));
      el.style.setProperty("--open", v.open.toFixed(3));
      el.style.setProperty("--on", v.on.toFixed(3));
      el.style.setProperty("--scroll", v.scroll.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}
