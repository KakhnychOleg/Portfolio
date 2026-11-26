import { describe, expect, it } from "vitest";
import { CATEGORY_LABELS, projects } from "@/content/projects";
import {
  filterByCategory,
  filterOptions,
  groupOffline,
  hostOf,
  liveProjects,
  pageState,
  totalSites,
} from "./projects";

const live = liveProjects(projects);

describe("project data", () => {
  it("counts grouped rows by their size", () => {
    expect(totalSites(projects)).toBe(projects.length - 1 + 14);
  });

  it("gives every live project a screenshot and a parseable URL", () => {
    for (const p of live) {
      expect(p.shot, p.name).toBeTruthy();
      expect(() => hostOf(p.url)).not.toThrow();
    }
  });

  it("features exactly one live project", () => {
    expect(live.filter((p) => p.featured).map((p) => p.name)).toEqual(["SoloDesk"]);
  });
});

describe("filters", () => {
  it("returns everything for 'all' and only the category otherwise", () => {
    expect(filterByCategory(live, "all")).toHaveLength(live.length);
    const saas = filterByCategory(live, "saas");
    expect(saas.length).toBeGreaterThan(0);
    expect(saas.every((p) => p.category === "saas")).toBe(true);
  });

  it("offers All first and only categories that have live projects", () => {
    const opts = filterOptions(live, CATEGORY_LABELS);
    expect(opts[0]).toEqual({ key: "all", label: "All", count: live.length });
    expect(opts.slice(1).reduce((n, o) => n + o.count, 0)).toBe(live.length);
    expect(opts.every((o) => o.count > 0)).toBe(true);
  });
});

describe("pageState", () => {
  it("shows 12 first and offers the next 6", () => {
    expect(pageState(21, 12)).toEqual({ visible: 12, left: 9, next: 6, hasMore: true });
  });
  it("offers only what is left on the last page", () => {
    expect(pageState(21, 18)).toEqual({ visible: 18, left: 3, next: 3, hasMore: true });
  });
  it("hides the button when everything is visible", () => {
    expect(pageState(5, 12)).toEqual({ visible: 5, left: 0, next: 0, hasMore: false });
  });
});

describe("groupOffline", () => {
  const rows = groupOffline(projects);

  it("folds the affiliates into one Cupidworld network row", () => {
    const network = rows.find((r) => r.name === "Cupidworld network");
    expect(network?.summary).toContain(
      "AfricaMatches, LoveTripHub, SafariHearts, DateAsians",
    );
    expect(rows.some((r) => r.name === "AfricaMatches")).toBe(false);
  });

  it("keeps the 14 freelance sites as one row", () => {
    expect(rows.filter((r) => r.name === "Freelance marketing sites")).toHaveLength(1);
  });
});
