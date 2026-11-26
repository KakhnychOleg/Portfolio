/** Month precision is enough for a career timeline: "YYYY-MM". */
export type YearMonth = `${number}-${number}`;

export interface Role {
  /** Stable id, used as the anchor (#role-<id>) the waterfall bars link to. */
  id: string;
  company: string;
  /** Short label for the waterfall's label track. */
  shortName: string;
  title: string;
  location: string;
  url?: string;
  start: YearMonth;
  /** Omitted for the current role. */
  end?: YearMonth;
  highlights: string[];
  stack: string[];
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  /** "live" = shipped and public, "building" = work in progress in public. */
  status: "live" | "building";
  links: { label: string; href: string }[];
}

export interface SocialLink {
  label: string;
  href: string;
}
