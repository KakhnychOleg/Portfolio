import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("portfolio", () => {
  test("loads without console errors or horizontal scroll", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Oleh Kakhnych" })).toBeVisible();
    // Walk the page so lazy images and scroll effects run.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) await page.evaluate((y) => scrollTo(0, y), y);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
    expect(errors).toEqual([]);
  });

  test("header links jump to their sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "The section nav is hidden on small screens, as in the design.");
    await page.goto("/");
    for (const [label, id] of [
      ["Work", "work"],
      ["All projects", "archive"],
      ["Experience", "experience"],
      ["Contact", "contact"],
    ]) {
      await page
        .getByRole("navigation", { name: "Sections" })
        .getByRole("link", { name: label })
        .click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test("filters and show more work together", async ({ page }) => {
    await page.goto("/#archive");
    const rows = page.locator("#archive .row");
    await expect(rows).toHaveCount(12);
    const more = page.getByRole("button", { name: /^Show \d+ more/ });
    await more.click();
    await expect(rows).toHaveCount(18);
    await page.getByRole("button", { name: /^Corporate/ }).click();
    await expect(page.getByRole("button", { name: /^Corporate/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    const corporate = await rows.count();
    expect(corporate).toBeLessThanOrEqual(12);
    await expect(rows.first()).toContainText("Corporate");
  });

  test("other projects group the Cupidworld network and freelance sites", async ({
    page,
  }) => {
    await page.goto("/");
    const others = page.locator("#others li");
    await expect(others.filter({ hasText: "Cupidworld network" })).toHaveCount(1);
    await expect(others.filter({ hasText: "AfricaMatches" })).toHaveCount(1);
    await expect(others.filter({ hasText: "Freelance marketing sites" })).toHaveCount(1);
    await expect(page.locator("#others a")).toHaveCount(0);
  });

  test("resume is downloadable", async ({ page, request }) => {
    await page.goto("/");
    const href = await page
      .getByRole("link", { name: "Resume (PDF)" })
      .getAttribute("href");
    const res = await request.get(href!);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("pdf");
  });

  test("reduced motion shows the featured scene in its final state", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/#work");
    const vars = await page.locator(".scene").evaluate((el) => {
      const s = getComputedStyle(el);
      return ["--open", "--on", "--text"].map((v) => s.getPropertyValue(v).trim());
    });
    expect(vars).toEqual(["1", "1", "1"]);
    await expect(page.locator(".phone")).toHaveCSS("opacity", "1");
    await expect(page.locator(".hero-foot")).toHaveCSS("opacity", "1");
    await context.close();
  });

  test("has no detectable accessibility violations", async ({ page }) => {
    await page.goto("/");
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) await page.evaluate((y) => scrollTo(0, y), y);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(1500); // let the hero entrance finish
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
});
