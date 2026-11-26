import { ExperienceList } from "@/components/ExperienceList";
import { ProjectList } from "@/components/ProjectList";
import { Section } from "@/components/Section";
import { Waterfall } from "@/components/Waterfall";
import { about, profile, socialLinks } from "@/content/profile";

export default function Home() {
  return (
    <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <section aria-labelledby="name" className="pt-16 pb-12 sm:pt-24">
        <h1
          id="name"
          className="text-[clamp(3.5rem,11vw,8.5rem)] font-display font-bold tracking-[-0.02em] text-ink"
        >
          {profile.name}
        </h1>
        <p className="mt-6 max-w-[56ch] text-xl leading-relaxed">{profile.tagline}</p>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-medium text-cobalt underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Waterfall />
      </section>

      <Section id="about" title="About">
        <div className="max-w-[68ch] space-y-5">
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="text-muted">Languages: {profile.languages.join(", ")}.</p>
        </div>
      </Section>

      <Section id="experience" title="Experience">
        <ExperienceList />
      </Section>

      <Section id="projects" title="Projects">
        <ProjectList />
      </Section>

      <Section id="contact" title="Contact">
        <div className="max-w-[68ch]">
          <p className="text-xl">
            I’m open to remote Full-Stack and Senior Frontend roles. The fastest way to
            reach me is email.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block text-[clamp(2rem,6vw,3.5rem)] font-display font-semibold break-all text-cobalt underline decoration-2 underline-offset-8 hover:decoration-4"
          >
            {profile.email}
          </a>
        </div>
      </Section>

      <footer className="border-t border-rule py-10 text-[0.9375rem] text-muted">
        Built with Next.js and Tailwind CSS.{" "}
        <a
          href="https://github.com/KakhnychOleg"
          className="underline underline-offset-4 hover:text-cobalt"
        >
          Source on GitHub
        </a>
        .
      </footer>
    </main>
  );
}
