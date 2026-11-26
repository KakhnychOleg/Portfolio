import { describe, expect, it } from "vitest";
import {
  formatDuration,
  formatPeriod,
  formatYearMonth,
  getBarPosition,
  getYearTicks,
  monthIndex,
  rangeLength,
  type TimelineRange,
} from "./timeline";

const year2024: TimelineRange = { start: "2024-01", end: "2024-12" };

describe("monthIndex / rangeLength", () => {
  it("makes consecutive months differ by one, across a year boundary", () => {
    expect(monthIndex("2024-01") - monthIndex("2023-12")).toBe(1);
  });

  it("counts both ends of a range", () => {
    expect(rangeLength(year2024)).toBe(12);
    expect(rangeLength({ start: "2024-03", end: "2024-03" })).toBe(1);
  });
});

describe("formatting", () => {
  it("formats a month", () => {
    expect(formatYearMonth("2021-05")).toBe("May 2021");
  });

  it("formats finished and ongoing periods", () => {
    expect(formatPeriod("2021-05", "2022-06")).toBe("May 2021 – Jun 2022");
    expect(formatPeriod("2024-08")).toBe("Aug 2024 – Present");
  });
});

describe("formatDuration", () => {
  it("counts both the first and the last month", () => {
    expect(formatDuration("2021-05", "2022-06", "2026-11")).toBe("1 yr 2 mo");
  });

  it("omits the zero part", () => {
    expect(formatDuration("2022-06", "2023-01", "2026-11")).toBe("8 mo");
    expect(formatDuration("2023-01", "2024-12", "2026-11")).toBe("2 yr");
  });

  it("measures an ongoing role up to today", () => {
    expect(formatDuration("2024-08", undefined, "2026-11")).toBe("2 yr 4 mo");
  });
});

describe("getYearTicks", () => {
  it("places a tick on every January inside the range", () => {
    expect(getYearTicks({ start: "2023-07", end: "2025-06" })).toEqual([
      { year: 2024, left: 25 },
      { year: 2025, left: 75 },
    ]);
  });
});

// TODO(Oleh): remove `.skip` and make these pass by implementing getBarPosition().
describe.skip("getBarPosition", () => {
  it("fills the track when the role spans the whole range", () => {
    expect(getBarPosition("2024-01", "2024-12", year2024)).toEqual({
      left: 0,
      width: 100,
    });
  });

  it("covers the second half of the year", () => {
    expect(getBarPosition("2024-07", "2024-12", year2024)).toEqual({
      left: 50,
      width: 50,
    });
  });

  it("gives a one-month role one month of width", () => {
    const { left, width } = getBarPosition("2024-04", "2024-04", year2024);
    expect(left).toBeCloseTo(25);
    expect(width).toBeCloseTo(100 / 12);
  });

  it("runs an ongoing role to the end of the range", () => {
    expect(getBarPosition("2024-07", undefined, year2024)).toEqual({
      left: 50,
      width: 50,
    });
  });

  it("clips a role that started before the range", () => {
    expect(getBarPosition("2023-01", "2024-06", year2024)).toEqual({
      left: 0,
      width: 50,
    });
  });

  it("clips a role that ends after the range", () => {
    expect(getBarPosition("2024-07", "2025-12", year2024)).toEqual({
      left: 50,
      width: 50,
    });
  });

  it("throws when end is before start", () => {
    expect(() => getBarPosition("2024-06", "2024-01", year2024)).toThrow();
  });
});
