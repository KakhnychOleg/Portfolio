import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CATEGORY_LABELS } from "@/content/projects";
import type { Project } from "@/content/types";
import { AllProjects } from "./AllProjects";

const make = (n: number, category: Project["category"]): Project[] =>
  Array.from({ length: n }, (_, i) => ({
    name: `${category} ${i + 1}`,
    url: `https://${category}${i + 1}.example`,
    category,
    summary: "s",
    tags: [],
  }));

// 15 corporate + 5 SaaS = 20 live projects.
const projects = [...make(15, "corporate"), ...make(5, "saas")];

const rows = () => within(screen.getByRole("list")).getAllByRole("link");

describe("AllProjects", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
  });

  it("shows 12 rows, then 6 more per click, until the list ends", async () => {
    const user = userEvent.setup();
    render(<AllProjects projects={projects} labels={CATEGORY_LABELS} />);
    expect(rows()).toHaveLength(12);

    await user.click(screen.getByRole("button", { name: "Show 6 more (8 left)" }));
    expect(rows()).toHaveLength(18);
    // Focus moves to the first new row for keyboard users.
    expect(rows()[12]).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Show 2 more (2 left)" }));
    expect(rows()).toHaveLength(20);
    expect(screen.queryByRole("button", { name: /Show/ })).not.toBeInTheDocument();
  });

  it("filters by category and resets the page on every filter change", async () => {
    const user = userEvent.setup();
    render(<AllProjects projects={projects} labels={CATEGORY_LABELS} />);
    await user.click(screen.getByRole("button", { name: /Show 6 more/ }));
    expect(rows()).toHaveLength(18);

    await user.click(screen.getByRole("button", { name: /^SaaS/ }));
    expect(rows()).toHaveLength(5);
    expect(screen.getByRole("button", { name: /^SaaS/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: /^All/ }));
    expect(rows()).toHaveLength(12);
  });

  it("only offers categories that have projects, with counts", () => {
    render(<AllProjects projects={projects} labels={CATEGORY_LABELS} />);
    const chips = within(
      screen.getByRole("group", { name: "Filter projects" }),
    ).getAllByRole("button");
    expect(chips.map((c) => c.textContent)).toEqual(["All20", "SaaS5", "Corporate15"]);
  });
});
