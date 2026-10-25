import { Suspense } from "react";
import Link from "next/link";
import DishList from "./DishList";
import { dishes } from "./dishes";

export const revalidate = 60;

export default function MenuPage() {
  return (
    <main>
      <h1>Menu</h1>
      <Suspense fallback={<p>Loading dishes...</p>}>
        <DishList dishes={dishes} />
      </Suspense>
      <p><Link href="/cart">Go to cart</Link></p>
    </main>
  );
}