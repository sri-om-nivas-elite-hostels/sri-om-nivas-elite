import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — co-living for men and women in Madhapur, Hyderabad`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Text-only brand card: no photographs are implied.
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
          padding: 72,
          background: "#faf6ee",
          color: "#183d2e",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 20,
              background: "#1f4d3a",
              color: "#faf6ee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            SO
          </div>
          <div style={{ fontSize: 30, color: "#8a4a2f", fontWeight: 600 }}>Madhapur, Hyderabad</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 34, color: "#55615a" }}>Co-living accommodation for men and women</div>
        </div>
        <div style={{ display: "flex", height: 10, width: 220, background: "#b8673f", borderRadius: 5 }} />
      </div>
    ),
    size,
  );
}
