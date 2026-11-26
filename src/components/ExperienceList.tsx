import { roles } from "@/content/experience";
import { formatPeriod } from "@/lib/timeline";
import { TagList } from "./TagList";

export function ExperienceList() {
  return (
    <ol className="space-y-14">
      {roles.map((role) => (
        <li key={role.id}>
          {/* :target highlights the role a waterfall bar just jumped to. */}
          <article
            id={`role-${role.id}`}
            aria-labelledby={`role-${role.id}-heading`}
            className="-ml-4 border-l-2 border-transparent pl-4 transition-colors duration-700 target:border-cobalt"
          >
            <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3
                id={`role-${role.id}-heading`}
                className="text-2xl font-semibold text-ink"
              >
                {role.company}
              </h3>
              <p className="text-[0.9375rem] text-muted tabular-nums">
                {formatPeriod(role.start, role.end)}
              </p>
            </header>
            <p className="mt-1 text-[0.9375rem] text-muted">
              {role.title}, {role.location}
            </p>
            <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-5 marker:text-rule">
              {role.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-5">
              <TagList
                items={role.stack}
                label={`Technologies used at ${role.company}`}
              />
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
