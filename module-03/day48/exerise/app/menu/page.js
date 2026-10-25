import { Suspense } from "react";
import Link from "next/link";
import DishList from "./DishList";
import FilterShell from "./FilterShell";
import { getDishPage } from "../data/dishes";

export const metadata = {
  title: "Menu",
  description: "Browse Ethiopian stews, fresh sides, and favorites made for sharing.",
};

export const revalidate = 60;

export default async function MenuPage({ searchParams }) {
  const { page: pageParam } = await searchParams;
  const parsedPage = Number.parseInt(pageParam ?? "1", 10);
  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const initialData = getDishPage("", requestedPage);

  return (
    <main>
      <h1>Menu</h1>
      <FilterShell>
        <Suspense fallback={<p>Loading dishes...</p>}>
          <DishList initialData={initialData} />
        </Suspense>
      </FilterShell>
      <p><Link href="/cart">Go to cart</Link></p>
    </main>
  );
}