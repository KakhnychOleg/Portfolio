import { ThemeToggle } from "./ThemeToggle";

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <a
          href="#top"
          className="hidden text-xl font-display font-semibold text-ink sm:block"
        >
          Oleh Kakhnych
        </a>
        <nav aria-label="Sections" className="-ml-2 sm:ml-0">
          <ul className="flex gap-1 text-[0.9375rem]">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="rounded-sm px-2 py-1.5 text-body transition-colors hover:text-cobalt"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
