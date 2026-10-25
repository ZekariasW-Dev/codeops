import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes } from "../dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default function DishPage({ params }) {
  return (
    <Suspense fallback={<p>Loading dish...</p>}>
      <DishDetails params={params} />
    </Suspense>
  );
}

async function DishDetails({ params }) {
  const { id } = await params;
  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.name}</h1>
      <p>Dish id: {id}</p>
      <p>{dish.description}</p>
      <Link href="/menu">Back to menu</Link>
    </main>
  );
}