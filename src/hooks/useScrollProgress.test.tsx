import { render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { sceneProgress, useScrollProgress } from "./useScrollProgress";

describe("sceneProgress", () => {
  const vh = 1000;
  const h = 2400;

  it("is all zeros while the scene is below the viewport", () => {
    expect(sceneProgress(vh, h, vh)).toEqual({ text: 0, open: 0, on: 0, scroll: 0 });
  });

  it("opens the lid fully once the scene reaches the top", () => {
    const v = sceneProgress(0, h, vh);
    expect(v.open).toBe(1);
    expect(v.text).toBe(1);
    expect(v.scroll).toBe(0);
  });

  it("scrolls the screen to the end when the pin is released", () => {
    expect(sceneProgress(-(h - vh), h, vh)).toEqual({
      text: 1,
      open: 1,
      on: 1,
      scroll: 1,
    });
  });

  it("stays within 0..1 far past the scene", () => {
    const v = sceneProgress(-99999, h, vh);
    expect(Object.values(v).every((n) => n >= 0 && n <= 1)).toBe(true);
  });
});

function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref);
  return <div ref={ref} data-testid="scene" />;
}

const mockMotion = (reduce: boolean) =>
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: reduce && q.includes("reduce"),
  }));

describe("useScrollProgress", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("writes the CSS variables on mount", () => {
    mockMotion(false);
    const { getByTestId } = render(<Scene />);
    const style = getByTestId("scene").style;
    for (const v of ["--text", "--open", "--on", "--scroll"]) {
      expect(style.getPropertyValue(v)).not.toBe("");
    }
  });

  it("batches scroll events into one animation frame", () => {
    mockMotion(false);
    const raf = vi.fn(() => 1);
    vi.stubGlobal("requestAnimationFrame", raf);
    render(<Scene />);
    for (let i = 0; i < 20; i++) window.dispatchEvent(new Event("scroll"));
    expect(raf).toHaveBeenCalledTimes(1);
  });

  it("does nothing with reduced motion", () => {
    mockMotion(true);
    const { getByTestId } = render(<Scene />);
    expect(getByTestId("scene").style.getPropertyValue("--open")).toBe("");
  });
});
