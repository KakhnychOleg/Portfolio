import { LiveLcp } from "@/components/ui/LiveLcp";
import { LocalTime } from "@/components/ui/LocalTime";
import { profile } from "@/content/profile";

export function Hero() {
  const [first, last] = profile.name.split(" ");
  return (
    <section className="hero wrap" aria-labelledby="hero-name">
      <h1 className="hero-name" id="hero-name">
        <span className="sr-only">{profile.name}</span>
        <span className="ln" aria-hidden="true">
          <span>{first}</span>
        </span>
        <span className="ln" aria-hidden="true">
          <span>
            {last}
            <i className="stop" />
          </span>
        </span>
      </h1>
      <div>
        <div className="redline" aria-hidden="true" />
        <div className="hero-foot">
          <p className="lead">{profile.lead}</p>
          <dl className="meta mono">
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Local time</dt>
              <dd>
                <LocalTime timeZone={profile.timeZone} label="Kyiv" />
              </dd>
            </div>
            <div>
              <dt>This page, LCP</dt>
              <dd className="good">
                <LiveLcp />
              </dd>
            </div>
          </dl>
          <div className="cta-row">
            <a className="btn btn-solid" href="#work">
              See the work
            </a>
            <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
              Email me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
