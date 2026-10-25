import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* eslint-disable @next/next/no-img-element */
export const alt = "A shared meal at Addis Eats";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const image = await readFile(
    join(process.cwd(), "public", "images", "shared-meal.jpg"),
  );
  const imageSource = `data:image/jpeg;base64,${image.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: 64,
          background: "#412515",
        }}
      >
        <img
          src={imageSource}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "32px 40px",
            borderRadius: 20,
            background: "rgba(39, 25, 16, 0.88)",
            color: "#fff8ed",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#f5c97b" }}>
            ADDIS EATS
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>
            Ethiopian favorites
          </div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 16 }}>
            Made for sharing.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
