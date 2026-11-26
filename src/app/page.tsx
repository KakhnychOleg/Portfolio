import { Header } from "@/components/Header";
import { AllProjects } from "@/components/sections/AllProjects";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Featured } from "@/components/sections/Featured";
import { Figures } from "@/components/sections/Figures";
import { Hero } from "@/components/sections/Hero";
import { OtherProjects } from "@/components/sections/OtherProjects";
import { Statement } from "@/components/sections/Statement";
import { Testimonials } from "@/components/sections/Testimonials";
import { profile } from "@/content/profile";
import { CATEGORY_LABELS, projects } from "@/content/projects";
import { siteJsonLd, toScript } from "@/lib/json-ld";
import { liveProjects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toScript(siteJsonLd()) }}
      />
      <Header status={profile.status} />
      <main id="top">
        <Hero />
        <Statement />
        <Figures />
        <Featured />
        <section className="sec wrap" id="archive" aria-labelledby="archive-title">
          <div className="sec-head">
            <h2 id="archive-title">
              All projects
              <i />
            </h2>
            <p>
              Every live site I&apos;ve built, migrated or supported. Hover a row to
              preview it.
            </p>
          </div>
          <AllProjects projects={liveProjects(projects)} labels={CATEGORY_LABELS} />
        </section>
        <OtherProjects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
