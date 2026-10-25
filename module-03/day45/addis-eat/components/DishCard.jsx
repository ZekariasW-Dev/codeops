import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <article
      className="dish-card"
      data-dish-name={dish.name.toLowerCase()}
      data-dish-category={dish.category}
    >
      <div className="dish-card-top">
        <span className="dish-mark" aria-hidden="true">{dish.name.slice(0, 1)}</span>
        {dish.spicy && <span className="spice-label">Spiced favorite</span>}
      </div>
      <Link href={`/menu/${dish.id}`} className="dish-link">
        <h2>{dish.name}</h2>
        <p>{dish.category === "spicy" ? "Deeply spiced and slow cooked" : "Comforting, bright, and made fresh"}</p>
      </Link>
      <div className="dish-card-bottom">
        <strong className="dish-price">{dish.price} ETB</strong>
        <AddToCartButton dish={dish} compact />
      </div>
    </article>
  );
}