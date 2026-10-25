import { Suspense } from "react";
import Link from "next/link";
import DishList from "./DishList";
import { dishes } from "./dishes";

export const revalidate = 60;

async function getDishes() {
  return dishes;
}

export default async function MenuPage() {
  const menuDishes = await getDishes();

  return (
    <main>
      <h1>Menu</h1>
      <Suspense fallback={<p>Loading dishes...</p>}>
        <DishList dishes={menuDishes} />
      </Suspense>
      <p><Link href="/cart">Go to cart</Link></p>
    </main>
  );
}