import { Suspense } from "react";
import Link from "next/link";
import DishList from "./DishList";
import FilterShell from "./FilterShell";
import { books } from "../data/books";

export const revalidate = 60;

async function getDishes() {
  return books;
}

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main>
      <h1>Menu</h1>
      <FilterShell>
        <Suspense fallback={<p>Loading books...</p>}>
          <DishList books={dishes} />
        </Suspense>
      </FilterShell>
      <p><Link href="/cart">Go to cart</Link></p>
    </main>
  );
}