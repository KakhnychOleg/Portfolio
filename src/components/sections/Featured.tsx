import type { CSSProperties } from "react";
import { Devices } from "@/components/device/Devices";
import { CATEGORY_LABELS, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { hostOf } from "@/lib/projects";
import { SceneShell } from "./SceneShell";

/** Deterministic pseudo-random numbers, so server and client render the same dust. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dust(seed: number) {
  const r = seeded(seed);
  return Array.from({ length: 14 }, () => {
    const v = (n: number) => n.toFixed(2);
    return {
      left: `${v(r() * 100)}%`,
      top: `${v(r() * 100)}%`,
      "--s": `${v(2 + r() * 5)}px`,
      "--b": `${v(r() * 2)}px`,
      "--d": `${v(8 + r() * 10)}s`,
      "--x": `${v((r() - 0.5) * 60)}px`,
      "--y": `${v((r() - 0.5) * 60)}px`,
    } as CSSProperties;
  });
}

function Scene({ project, index }: { project: Project; index: number }) {
  const host = hostOf(project.url);
  return (
    <SceneShell glow={project.glow}>
      <div className="scene-pin">
        <div className="scene-text">
          <div className="idx mono">
            <span>{CATEGORY_LABELS[project.category]}</span>
            <span>{host}</span>
          </div>
          <h3>{project.name}</h3>
          <p>{project.summary}</p>
          <ul className="tags">
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <a className="btn btn-ghost" href={project.url}>
            Visit {host}
          </a>
        </div>
        <div className="stage" aria-hidden="true">
          <div className="dust">
            {dust(index + 1).map((style, i) => (
              <i key={i} style={style} />
            ))}
          </div>
          {project.shot && <Devices shot={project.shot} name={project.name} />}
        </div>
      </div>
    </SceneShell>
  );
}

export function Featured() {
  const featured = projects.filter((p) => p.featured && !p.offline);
  return (
    <section className="sec wrap" id="work" aria-labelledby="work-title">
      <div className="sec-head">
        <h2 id="work-title">
          Featured
          <i />
        </h2>
        <p>
          A Swiss accounting SaaS I build the marketing site for. Keep scrolling to open
          it.
        </p>
      </div>
      <div>
        {featured.map((p, i) => (
          <Scene key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
