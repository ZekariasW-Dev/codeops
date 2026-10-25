import { ImageResponse } from "next/og";

export const alt = "Addis Eats Ethiopian food menu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#5a2816",
          color: "#fff7e8",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#f5c97b" }}>
          ADDIS EATS
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            marginTop: 28,
          }}
        >
          Ethiopian favorites,
        </div>
        <div style={{ display: "flex", fontSize: 78, fontWeight: 700 }}>
          made for sharing.
        </div>
      </div>
    ),
    size,
  );
}
