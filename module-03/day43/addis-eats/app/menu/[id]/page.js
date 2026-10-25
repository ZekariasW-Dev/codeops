import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { dishes } from "../dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.name}</h1>
      <Image
        className="dish-detail-image"
        src={dish.image}
        alt={dish.imageAlt}
        width={960}
        height={720}
        sizes="(max-width: 960px) 100vw, 960px"
      />
      <p>Dish id: {id}</p>
      <p>{dish.description}</p>
      <Link href="/menu">Back to menu</Link>
    </main>
  );
}