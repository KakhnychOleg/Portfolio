import { describe, expect, it } from "vitest";
import { personJsonLd, siteJsonLd, toScript } from "./json-ld";

describe("JSON-LD", () => {
  it("builds a schema.org Person", () => {
    const p = personJsonLd({
      name: "Jane Doe",
      role: "Engineer",
      description: "d",
      email: "a@b.c",
      url: "https://x.dev",
      sameAs: ["https://github.com/x"],
      employer: "Acme",
    });
    expect(p).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Jane Doe",
      email: "mailto:a@b.c",
      sameAs: ["https://github.com/x"],
      worksFor: { "@type": "Organization", name: "Acme" },
    });
  });

  it("omits worksFor without an employer", () => {
    const p = personJsonLd({
      name: "a",
      role: "b",
      description: "c",
      email: "d",
      url: "e",
      sameAs: [],
    });
    expect(p).not.toHaveProperty("worksFor");
  });

  it("describes the site owner and the website", () => {
    const [person, site] = siteJsonLd();
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Oleh Kakhnych");
    expect(site["@type"]).toBe("WebSite");
  });

  it("escapes < so the payload cannot close its script tag", () => {
    expect(toScript({ a: "</script>" })).not.toContain("</script>");
  });
});
