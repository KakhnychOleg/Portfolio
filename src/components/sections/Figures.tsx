import { projects } from "@/content/projects";
import { totalSites } from "@/lib/projects";

export function Figures() {
  const figures = [
    { label: "years building for the web", value: "5", plus: true },
    { label: "projects shipped or supported", value: String(totalSites(projects)) },
    {
      label: "monthly active users on the product whose frontend I own",
      value: "3K",
      plus: true,
    },
    { label: "Lighthouse and PageSpeed scores I ship to", value: "90", plus: true },
  ];
  return (
    <section className="wrap" aria-label="In numbers">
      <dl className="figures">
        {figures.map((f) => (
          <div className="fig" key={f.label}>
            <dt>{f.label}</dt>
            <dd>
              {f.value}
              {f.plus && <span>+</span>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
