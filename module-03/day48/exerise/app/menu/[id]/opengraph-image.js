import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getDishById } from "../../data/dishes";

export const alt = "Addis Eats dish";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

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
        <div style={{ display: "flex", fontSize: 30, color: "#f5c97b" }}>
          ADDIS EATS MENU
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            marginTop: 28,
          }}
        >
          {dish.name}
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 20 }}>
          {dish.price} ETB
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 18 }}>
          {dish.description}
        </div>
      </div>
    ),
    size,
  );
}
