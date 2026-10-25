import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h2>Welcome</h2>
      <p>Choose a dish from the menu.</p>
      <Link href="/menu">View menu</Link>
    </main>
  );
}
