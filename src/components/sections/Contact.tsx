import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section className="contact wrap" id="contact" aria-labelledby="contact-title">
      <p className="mono">Open to remote Full-Stack and Senior Frontend roles</p>
      <h2 id="contact-title">
        Got a product that has to be fast
        <i />
      </h2>
      <a className="mail" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <div className="contact-links">
        {profile.links.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
        <a href={profile.resume} download>
          Resume (PDF)
        </a>
      </div>
      <footer className="site-foot mono">
        <span>© 2026 {profile.name}</span>
        <span>Built with Next.js, measured live</span>
      </footer>
    </section>
  );
}
