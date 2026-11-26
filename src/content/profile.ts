import type { SocialLink } from "./types";

export const profile = {
  name: "Oleh Kakhnych",
  role: "Full-Stack Web Engineer",
  tagline:
    "Full-Stack Web Engineer with 5+ years of experience building React and TypeScript apps, headless CMS platforms, and fast, high-converting websites for international teams.",
  email: "kakhnych.oleg@gmail.com",
  location: "Ukraine, working remotely",
  languages: ["Ukrainian (native)", "Russian (native)", "English (B2)", "Polish (A2)"],
} as const;

export const socialLinks: SocialLink[] = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/oleg-kakhnych/" },
  { label: "GitHub", href: "https://github.com/KakhnychOleg" },
  { label: "Telegram", href: "https://t.me/okay1301" },
];

export const about: string[] = [
  "I build React and TypeScript products end to end: architecture, component libraries, performance and the SEO work that gets them found. Right now I own the frontend of a product used by 3,000+ monthly active users across Switzerland.",
  "I care about the parts users feel without noticing: pages that load fast, and content that search engines and AI assistants can actually understand.",
  "Over five years I have worked remotely with teams in Switzerland, the USA and Ukraine, from pixel-perfect agency builds to owning a product's frontend architecture.",
];
