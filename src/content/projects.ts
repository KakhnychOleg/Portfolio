import type { Project } from "./types";

export const projects: Project[] = [
  {
    name: "SoloDesk marketing website",
    description:
      "Multilingual marketing website for a Swiss accounting SaaS, built at Business Innovation Group.",
    stack: ["React", "Astro", "TypeScript"],
    status: "live",
    links: [{ label: "Visit solodesk.ch", href: "https://solodesk.ch/en-ch" }],
  },
  {
    name: "This portfolio",
    description:
      "The site you are on. Next.js and TypeScript, tested with Vitest and Playwright, with a Lighthouse budget enforced in CI.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vitest", "Playwright"],
    status: "building",
    links: [{ label: "Source on GitHub", href: "https://github.com/KakhnychOleg" }],
  },
];
