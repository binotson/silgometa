import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { officialLogo } from "@/content/brand";
import { company } from "@/content/site";

export const alt = `${company.legalName} — ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-sharing image, using the official emblem on its white tile.
export default async function OpengraphImage() {
  const logo = officialLogo
    ? `data:image/png;base64,${(await readFile(join(process.cwd(), "public", officialLogo.src))).toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#10243A",
          color: "#FAF9F6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} width={120} height={120} alt="" style={{ borderRadius: 6, marginRight: 32 }} />
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: 6 }}>SILGO META</div>
            <div style={{ fontSize: 20, letterSpacing: 14, color: "#ADAAB5", marginTop: 8 }}>LIMITED</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 3, background: "#AD7E3A", marginBottom: 32 }} />
          <div style={{ fontSize: 54, lineHeight: 1.15, maxWidth: 1000 }}>{company.tagline}</div>
          <div style={{ fontSize: 24, color: "#C8A064", marginTop: 26 }}>Strategic advisory · Abuja &amp; Kano, Nigeria</div>
        </div>
      </div>
    ),
    size,
  );
}
