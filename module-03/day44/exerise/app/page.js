import Link from "next/link";

export const metadata = {
  title: { absolute: "Home | Addis Eats" },
  description: "Discover Addis Eats and browse comforting Ethiopian dishes.",
};

export default function Home() {
  return (
    <main>
      <h2>Welcome</h2>
      <p>Choose a dish from the menu.</p>
      <Link href="/menu">View menu</Link>
    </main>
  );
}
