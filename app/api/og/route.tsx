import { ImageResponse } from "@vercel/og";

export const runtime = "nodejs";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #1e1b4b 50%, #09090b 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
              }}
            >
              <span style={{ color: "white", fontWeight: 900 }}>O</span>
            </div>
            <span
              style={{
                fontSize: "72px",
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              OGForge
            </span>
          </div>
          <p
            style={{
              fontSize: "32px",
              color: "#a1a1aa",
              marginTop: "8px",
            }}
          >
            AI Social Card Generator
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
            }}
          >
            {["#8b5cf6", "#ec4899", "#06b6d4", "#f97316"].map((c) => (
              <div
                key={c}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: c,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
