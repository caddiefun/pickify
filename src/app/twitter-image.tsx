import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Pickify - Pick Smart. Save Time.";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#2563eb",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "white",
              }}
            >
              P
            </span>
          </div>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
            }}
          >
            Pickify
          </span>
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            marginBottom: 20,
          }}
        >
          Pick Smart. Save Time.
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#64748b",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Compare and find the best software for your needs
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
