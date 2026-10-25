import Link from "next/link";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { dishes } from "./dishes";

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export default async function MenuPage({ searchParams }) {
  const { demo } = await searchParams;

  if (demo === "error") {
    throw new Error("This is the menu error demo.");
  }

  if (demo === "loading") {
    await wait(1500);
  }

  return (
    <main>
      <h1>Menu</h1>
      <CategoryBar />
      <DishList dishes={dishes} />
      <h2>Route demos</h2>
      <ul>
        <li><Link href="/menu?demo=loading">Show loading.js</Link></li>
        <li><Link href="/menu?demo=error">Show error.js</Link></li>
      </ul>
    </main>
  );
}