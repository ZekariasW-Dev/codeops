import Link from "next/link";
import DishList from "./DishList";
import { getDishPage } from "./dishes";

export const metadata = {
  title: "Menu",
  description: "Browse Ethiopian stews, spiced favorites, and fresh teff injera.",
  alternates: {
    canonical: "/menu",
  },
};

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const query = typeof params.q === "string" ? params.q : "";
  const initialData = getDishPage({
    page: Number.isNaN(requestedPage) ? 1 : requestedPage,
    query,
  });

  return (
    <main>
      <h1>Menu</h1>
      <DishList initialData={initialData} initialQuery={query} />
      <p><Link href="/cart">Go to cart</Link></p>
    </main>
  );
}