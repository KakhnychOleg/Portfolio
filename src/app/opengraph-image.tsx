import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Built at build time from the same palette as the page: black, bone, one red accent.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 72,
        background: "#0c0b0b",
        color: "#edebe6",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 120,
          fontWeight: 800,
          lineHeight: 0.9,
          letterSpacing: -4,
        }}
      >
        OLEH
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          fontSize: 120,
          fontWeight: 800,
          lineHeight: 0.9,
          letterSpacing: -4,
        }}
      >
        KAKHNYCH
        <div
          style={{
            width: 22,
            height: 22,
            background: "#e2231a",
            marginLeft: 8,
            marginBottom: 12,
          }}
        />
      </div>
      <div style={{ height: 4, background: "#e2231a", marginTop: 40 }} />
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 36,
          color: "rgba(237,235,230,.75)",
        }}
      >
        {profile.lead}
      </div>
    </div>,
    size,
  );
}
