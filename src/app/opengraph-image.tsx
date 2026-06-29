import { ImageResponse } from "next/og";
import { PERSONAL } from "@/lib/constants";

export const runtime = "edge";

export const alt = "Bhavya Saini — Portfolio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07070D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif", // Satori fallback
          position: "relative",
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(168, 200, 255,0.4) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(157,0,255,0.3) 0%, transparent 60%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", zIndex: 10 }}>
          <div
            style={{
              fontSize: "48px",
              color: "#F5A623",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "32px",
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "16px" }}>{"<"}</span>
            backend.engineer
            <span style={{ margin: "0 16px" }}>{"/"}</span>
            ai.systems
            <span style={{ marginLeft: "16px" }}>{">"}</span>
          </div>

          <h1
            style={{
              fontSize: "140px",
              color: "#F5F0E8",
              margin: 0,
              lineHeight: 0.9,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            {PERSONAL.name}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: "40px",
              color: "rgba(245, 240, 232, 0.7)",
            }}
          >
            {PERSONAL.university} · {PERSONAL.degree}
          </div>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "4px solid #F5A623",
              padding: "16px 32px",
              borderRadius: "16px",
            }}
          >
            <span style={{ fontSize: "36px", color: "#F5A623", fontWeight: "bold", letterSpacing: "0.1em" }}>
              BHAVYASAINI.DEV
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
