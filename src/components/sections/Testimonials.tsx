import { testimonials } from "@/content/testimonials";

/** Real LinkedIn recommendations only; renders nothing while there are none. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="sec wrap" id="recommendations" aria-labelledby="rec-title">
      <div className="sec-head">
        <h2 id="rec-title">
          Recommendations
          <i />
        </h2>
        <p>From people I have worked with, as written on LinkedIn.</p>
      </div>
      <ul className="quotes">
        {testimonials.map((t) => (
          <li key={t.name}>
            <figure>
              <blockquote>{t.text}</blockquote>
              <figcaption>
                <a href={t.url}>{t.name}</a>, {t.role}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
