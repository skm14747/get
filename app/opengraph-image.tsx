import { ImageResponse } from "next/og";

export const alt = "GoEasyTools – Fast, Private Browser Utilities";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0f172a",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "#059669",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            100% In-Browser • Zero Server Uploads
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            GoEasyTools
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              maxWidth: "920px",
              lineHeight: 1.4,
            }}
          >
            Free browser utilities for text processing, calculators, file conversions, and developer tools. Private by design.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #334155",
            paddingTop: "24px",
          }}
        >
          <div style={{ fontSize: "24px", color: "#38bdf8", fontWeight: 600 }}>
            goeasytools.com
          </div>
          <div style={{ fontSize: "20px", color: "#64748b" }}>
            No accounts • No tracking • Fast
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
