export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-sm border border-rule bg-surface px-2 py-0.5 text-[0.8125rem] text-body"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
