export const profile = {
  name: "Oleh Kakhnych",
  role: "Full-Stack Web Engineer",
  tagline:
    "Full-Stack Web Engineer with 5+ years of experience building React and TypeScript apps, headless CMS platforms, and fast, high-converting websites for international teams.",
  lead: "Full-Stack Web Engineer. I build React and TypeScript products that load fast and get found.",
  location: "Ukraine, remote",
  timeZone: "Europe/Kyiv",
  email: "kakhnych.oleg@gmail.com",
  resume: "/Oleh_Kakhnych_CV_Full-Stack.pdf",
  status: "Open to remote roles",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/oleg-kakhnych/" },
    { label: "GitHub", href: "https://github.com/KakhnychOleg" },
    { label: "Telegram", href: "https://t.me/okay1301" },
  ],
} as const;

/** Words wrapped in *asterisks* are drawn in the accent colour. */
export const statement =
  "I build fast React and TypeScript products, then make them *easy* *to* *find*: for search engines and for AI assistants. Five years, more than forty websites, teams in Switzerland, the USA and Ukraine.";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kakhnych.vercel.app";
