import type { ReactNode } from "react";

/**
 * A page section on the waterfall grid: heading in the label track, content in the time track.
 * The heading sticks while its section scrolls, so readers always know where they are.
 */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="grid gap-x-6 gap-y-6 border-t border-rule py-16 sm:grid-cols-[var(--spacing-label)_minmax(0,1fr)] sm:py-20"
    >
      <h2
        id={headingId}
        className="self-start text-4xl font-display font-semibold text-ink sm:sticky sm:top-24"
      >
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
