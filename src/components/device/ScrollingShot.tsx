"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  width: number;
  height: number;
  sizes: string;
  name: string;
}

/**
 * A full-page screenshot inside a screen. --max is how far it can travel
 * (image height minus frame height); CSS multiplies it by the scene's --scroll.
 */
export function ScrollingShot({ src, width, height, sizes, name }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  const measure = useCallback(() => {
    const img = ref.current;
    const frame = img?.parentElement;
    if (!img || !frame) return;
    img.style.setProperty(
      "--max",
      String(Math.max(0, img.offsetHeight - frame.offsetHeight)),
    );
  }, []);

  useEffect(() => {
    const frame = ref.current?.parentElement;
    if (!frame) return;
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [measure]);

  if (failed) return <div className="placeholder">{name}</div>;
  return (
    <Image
      ref={ref}
      src={src}
      alt=""
      width={width}
      height={height}
      sizes={sizes}
      quality={70}
      decoding="async"
      onLoad={measure}
      onError={() => setFailed(true)}
    />
  );
}
