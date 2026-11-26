export type Category =
  "saas" | "platform" | "ecommerce" | "corporate" | "care" | "freelance";

export interface Project {
  name: string;
  url: string;
  category: Category;
  summary: string;
  tags: string[];
  /** Screenshot slug: public/shots/<shot>-desktop.webp and -mobile.webp. */
  shot?: string;
  /** Accent sampled from the site, used for the screen glow. */
  glow?: string;
  featured?: boolean;
  /** The site is down, parked or no longer in the form it was built: no link, no screenshot. */
  offline?: boolean;
  /** Grouped entries stand for several sites (e.g. 14 freelance builds in one row). */
  count?: number;
  /** Affiliated site that folds into its parent's row in "Other projects". */
  networkOf?: string;
}

export interface Job {
  when: string;
  company: string;
  role: string;
  place: string;
  points: string[];
}

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  url: string;
}
