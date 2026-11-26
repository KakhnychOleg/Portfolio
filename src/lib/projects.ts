import type { Category, Project } from "@/content/types";

export const FIRST_PAGE = 12;
export const PAGE_STEP = 6;

export type Filter = Category | "all";

export const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** Every site behind the portfolio, counting grouped rows by their size. */
export const totalSites = (list: Project[]) =>
  list.reduce((n, p) => n + (p.count ?? 1), 0);

export const liveProjects = (list: Project[]) => list.filter((p) => !p.offline);

export const filterByCategory = (list: Project[], filter: Filter) =>
  filter === "all" ? list : list.filter((p) => p.category === filter);

/** Filter chips: "All" first, then each category that has live projects, in label order. */
export function filterOptions(
  list: Project[],
  labels: Record<Category, string>,
): { key: Filter; label: string; count: number }[] {
  const counts = new Map<Category, number>();
  for (const p of list) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  const cats = (Object.keys(labels) as Category[]).filter((c) => counts.has(c));
  return [
    { key: "all", label: "All", count: list.length },
    ...cats.map((c) => ({ key: c, label: labels[c], count: counts.get(c)! })),
  ];
}

/** What the "Show more" button needs to know for a list of `total` items with `shown` visible. */
export function pageState(total: number, shown: number) {
  const visible = Math.min(total, shown);
  const left = total - visible;
  return { visible, left, next: Math.min(PAGE_STEP, left), hasMore: left > 0 };
}

export interface OfflineRow {
  name: string;
  summary: string;
}

/**
 * Offline projects for "Other projects". Affiliated sites fold into their parent's row,
 * so the Cupidworld network reads as one entry instead of five.
 */
export function groupOffline(list: Project[]): OfflineRow[] {
  const offline = list.filter((p) => p.offline);
  const members = new Map<string, string[]>();
  for (const p of offline) {
    if (p.networkOf)
      members.set(p.networkOf, [...(members.get(p.networkOf) ?? []), p.name]);
  }
  return offline
    .filter((p) => !p.networkOf)
    .map((p) => {
      const affiliates = members.get(p.name);
      if (!affiliates) return { name: p.name, summary: p.summary };
      return {
        name: `${p.name} network`,
        summary: `Website development, SEO, careers filter, animation and page automation, plus affiliated sites: ${affiliates.join(", ")}.`,
      };
    });
}
