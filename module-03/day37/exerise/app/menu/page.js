import { Suspense } from "react";
import Link from "next/link";
import DishList from "./DishList";
import { books } from "../data/books";

export const revalidate = 60;

export default function MenuPage() {
  return (
    <main>
      <h1>Menu</h1>
      <Suspense fallback={<p>Loading books...</p>}>
        <DishList books={books} />
      </Suspense>
      <p><Link href="/cart">Go to cart</Link></p>
    </main>
  );
}