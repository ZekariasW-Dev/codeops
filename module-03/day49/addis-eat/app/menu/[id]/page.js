import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../../../components/AddToCartButton";
import { dishes, getDishById } from "../../../lib/dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: String(dish.id) }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);
  if (!dish) notFound();

  return (
    <section className="dish-detail">
      <Link className="back-link" href="/menu">&lt;- Back to the menu</Link>
      <article className="detail-panel">
        <div>
          <p className="eyebrow">{dish.category === "spicy" ? "Spiced favorite" : "A kitchen classic"}</p>
          <h1>{dish.name}</h1>
          <p>{dish.spicy ? "A generous, slow-cooked plate with a deep, warming spice." : "A comforting Ethiopian favorite, prepared fresh and served with care."}</p>
          <AddToCartButton dish={dish} />
        </div>
        <strong className="detail-price">{dish.price} ETB</strong>
      </article>
    </section>
  );
}