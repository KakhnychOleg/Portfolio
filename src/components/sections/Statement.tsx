import { statement } from "@/content/profile";

/** Words wrapped in *asterisks* are accented. Screen readers get the sentence in one piece. */
export function Statement() {
  const words = statement.split(/\s+/);
  return (
    <section className="statement wrap" aria-label="About">
      <p>
        <span className="sr-only">{statement.replace(/\*/g, "")}</span>
        {words.map((w, i) => (
          <span key={i} aria-hidden="true">
            <span className={w.includes("*") ? "w red" : "w"}>
              {w.replace(/\*/g, "")}
            </span>{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
