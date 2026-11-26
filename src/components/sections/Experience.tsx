import { jobs } from "@/content/experience";

export function Experience() {
  return (
    <section className="sec wrap" id="experience" aria-labelledby="exp-title">
      <div className="sec-head">
        <h2 id="exp-title">
          Experience
          <i />
        </h2>
        <p>Four teams, five years, all of it remote-first.</p>
      </div>
      <ol className="jobs">
        {jobs.map((j) => (
          <li className="job" key={j.company}>
            <p className="job-when">{j.when}</p>
            <div>
              <h3>{j.company}</h3>
              <p className="where">
                {j.role}, {j.place}
              </p>
            </div>
            <ul>
              {j.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
