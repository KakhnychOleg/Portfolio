import { projects } from "@/content/projects";
import { groupOffline } from "@/lib/projects";

export function OtherProjects() {
  return (
    <section className="sec wrap" id="others" aria-labelledby="others-title">
      <div className="sec-head">
        <h3 id="others-title" className="mono kicker">
          Other projects
        </h3>
        <p>Earlier work whose sites are no longer online in the form I built them.</p>
      </div>
      <ul className="others">
        {groupOffline(projects).map((r) => (
          <li key={r.name}>
            <b>{r.name}</b>
            <span>{r.summary}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
