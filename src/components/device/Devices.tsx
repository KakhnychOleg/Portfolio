import { LaptopBase } from "./LaptopBase";
import { ScrollingShot } from "./ScrollingShot";

// Intrinsic sizes of the converted full-page shots (see scripts/convert-shots.mjs).
const DESKTOP = { width: 1280, height: 4622 };
const MOBILE = { width: 520, height: 4800 };

export function Devices({ shot, name }: { shot: string; name: string }) {
  return (
    <div className="laptop">
      <div className="lid">
        <div className="screen">
          <ScrollingShot
            src={`/shots/${shot}-desktop-full.webp`}
            {...DESKTOP}
            sizes="(max-width: 900px) 80vw, 50vw"
            name={name}
          />
        </div>
      </div>
      <LaptopBase id={shot} />
      <div className="phone">
        <div className="phone-screen">
          <ScrollingShot
            src={`/shots/${shot}-mobile-full.webp`}
            {...MOBILE}
            sizes="(max-width: 900px) 18vw, 160px"
            name={name}
          />
        </div>
      </div>
    </div>
  );
}
