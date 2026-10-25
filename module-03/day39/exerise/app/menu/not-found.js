import Link from "next/link";

export default function MenuNotFound() {
  return (
    <main>
      <h1>Dish not found</h1>
      <p>This dish is not on the menu.</p>
      <Link href="/menu">Back to menu</Link>
    </main>
  );
}