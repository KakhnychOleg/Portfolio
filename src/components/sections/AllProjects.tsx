"use client";

import { useEffect, useRef, useState } from "react";
import { CursorPreview } from "@/components/ui/CursorPreview";
import type { Category, Project } from "@/content/types";
import {
  FIRST_PAGE,
  type Filter,
  PAGE_STEP,
  filterByCategory,
  filterOptions,
  hostOf,
  pageState,
} from "@/lib/projects";

interface Props {
  projects: Project[];
  labels: Record<Category, string>;
}

export function AllProjects({ projects, labels }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState(FIRST_PAGE);
  const listRef = useRef<HTMLUListElement>(null);
  const focusIndex = useRef<number | null>(null);

  const items = filterByCategory(projects, filter);
  const page = pageState(items.length, shown);
  const options = filterOptions(projects, labels);

  // After "Show more", keyboard users land on the first new row.
  useEffect(() => {
    if (focusIndex.current === null) return;
    listRef.current
      ?.querySelectorAll<HTMLAnchorElement>("a")
      [focusIndex.current]?.focus({ preventScroll: true });
    focusIndex.current = null;
  }, [shown]);

  // A filter change starts the list from the first page again.
  const choose = (key: Filter) => {
    setFilter(key);
    setShown(FIRST_PAGE);
  };

  const showMore = () => {
    focusIndex.current = page.visible;
    setShown((n) => n + PAGE_STEP);
  };

  // Cursor preview: fine pointers only. The image mounts on the first hover,
  // so nothing is downloaded for touch users.
  const [preview, setPreview] = useState<string | null>(null);
  const [previewOn, setPreviewOn] = useState(false);
  const showPreview = (shot?: string) => {
    if (!shot || !matchMedia("(pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPreview(`/shots/${shot}-desktop.webp`);
    setPreviewOn(true);
  };

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            className="chip"
            aria-pressed={filter === o.key}
            onClick={() => choose(o.key)}
          >
            {o.label}
            <sup>{o.count}</sup>
          </button>
        ))}
      </div>
      <ul
        className="archive"
        ref={listRef}
        aria-live="polite"
        onPointerLeave={() => setPreviewOn(false)}
      >
        {items.slice(0, page.visible).map((p) => (
          <li className="row" key={p.name}>
            <a className="rl" href={p.url} onPointerEnter={() => showPreview(p.shot)}>
              <span className="row-name">{p.name}</span>
              <span className="row-cat">{labels[p.category]}</span>
              <span className="row-sum">{p.summary}</span>
              <span className="row-dom mono">{hostOf(p.url)}</span>
            </a>
          </li>
        ))}
      </ul>
      {page.hasMore && (
        <button className="btn btn-ghost more" type="button" onClick={showMore}>
          Show {page.next} more ({page.left} left)
        </button>
      )}
      <CursorPreview src={preview} on={previewOn} />
    </>
  );
}
