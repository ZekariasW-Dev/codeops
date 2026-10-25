import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes, getDishById } from "../../data/dishes";

export function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  return {
    title: dish.name,
    description: `${dish.description} ${dish.price} ETB at Addis Eats.`,
    openGraph: {
      title: dish.name,
      description: dish.description,
      type: "website",
    },
  };
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
  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <h1>{dish.name}</h1>
      <p>Dish id: {id}</p>
      <p>{dish.description}</p>
      <p>Price: {dish.price} ETB</p>
      <Link href="/menu">Back to menu</Link>
    </main>
  );
}