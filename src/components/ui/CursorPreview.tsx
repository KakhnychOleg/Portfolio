"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * A screenshot that trails the cursor. The parent decides what to show and when;
 * this component only follows the pointer, one rAF at a time, transforms only.
 */
export function CursorPreview({ src, on }: { src: string | null; on: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    let first = true;

    const step = () => {
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      el.style.transform = `translate3d(${pos.x + 24}px, ${pos.y - 120}px, 0) scale(${el.classList.contains("on") ? 1 : 0.85})`;
      const settled =
        Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (first) {
        pos.x = target.x;
        pos.y = target.y;
        first = false;
      }
      if (!frame) frame = requestAnimationFrame(step);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [src]);

  return (
    <div className={on ? "preview on" : "preview"} ref={ref} aria-hidden="true">
      {src && (
        <Image src={src} alt="" width={720} height={450} sizes="352px" quality={70} />
      )}
    </div>
  );
}
