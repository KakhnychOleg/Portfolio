import { projects } from "@/content/projects";
import { TagList } from "./TagList";

const STATUS_LABEL = { live: "Live", building: "In progress" } as const;

export function ProjectList() {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {projects.map((project) => (
        <li key={project.name} className="py-8">
          <article>
            <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-2xl font-semibold text-ink">{project.name}</h3>
              <p
                className={`text-[0.9375rem] font-medium ${
                  project.status === "live" ? "text-signal" : "text-muted"
                }`}
              >
                {STATUS_LABEL[project.status]}
              </p>
            </header>
            <p className="mt-2 max-w-[68ch]">{project.description}</p>
            <div className="mt-4">
              <TagList
                items={project.stack}
                label={`Technologies used in ${project.name}`}
              />
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-medium text-cobalt underline decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ul>
  );
}
