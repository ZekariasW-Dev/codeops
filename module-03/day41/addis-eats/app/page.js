import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Addis Eats</h1>
      <p>Welcome. Choose a dish from our menu.</p>
      <Link href="/menu">View the menu</Link>
    </main>
  );
}
