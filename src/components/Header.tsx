const NAV = [
  { href: "#work", label: "Work" },
  { href: "#archive", label: "All projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Header({ status }: { status: string }) {
  return (
    <header className="top">
      <a className="mark" href="#top" aria-label="Oleh Kakhnych, back to top">
        OK
        <i />
      </a>
      <nav aria-label="Sections">
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="status" href="#contact">
        <b aria-hidden="true" />
        {status}
      </a>
    </header>
  );
}
