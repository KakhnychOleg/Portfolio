import { jobs } from "@/content/experience";
import { profile, siteUrl } from "@/content/profile";

interface PersonInput {
  name: string;
  role: string;
  description: string;
  email: string;
  url: string;
  sameAs: readonly string[];
  employer?: string;
}

export function personJsonLd(p: PersonInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
    description: p.description,
    email: `mailto:${p.email}`,
    url: p.url,
    sameAs: [...p.sameAs],
    ...(p.employer && { worksFor: { "@type": "Organization", name: p.employer } }),
    knowsAbout: ["React", "TypeScript", "Next.js", "Astro", "Node.js", "Technical SEO"],
  };
}

export function websiteJsonLd(name: string, url: string) {
  return { "@context": "https://schema.org", "@type": "WebSite", name, url };
}

/** The page's structured data, ready for a `<script type="application/ld+json">`. */
export function siteJsonLd() {
  return [
    personJsonLd({
      name: profile.name,
      role: profile.role,
      description: profile.tagline,
      email: profile.email,
      url: siteUrl,
      sameAs: profile.links.filter((l) => l.label !== "Telegram").map((l) => l.href),
      employer: jobs[0]?.company,
    }),
    websiteJsonLd(profile.name, siteUrl),
  ];
}

/** Serialise for inline script tags; escaping `<` keeps a stray `</script>` from closing it. */
export const toScript = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
