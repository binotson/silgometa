import { ImageResponse } from "next/og";
import { company } from "@/content/site";

export const alt = `${company.legalName} — ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-sharing image. Swap in the official logo once it is supplied.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#10243A",
          color: "#FAF9F6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: 6 }}>SILGO META</div>
          <div style={{ fontSize: 18, letterSpacing: 14, color: "#C9AD74", marginTop: 8 }}>LIMITED</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 3, background: "#B99A5B", marginBottom: 32 }} />
          <div style={{ fontSize: 58, lineHeight: 1.15, maxWidth: 980 }}>{company.tagline}</div>
          <div style={{ fontSize: 24, color: "rgba(250,249,246,0.7)", marginTop: 28 }}>
            Strategic advisory · Abuja &amp; Kano, Nigeria
          </div>
        </div>
      </div>
    ),
    size,
  );
}
