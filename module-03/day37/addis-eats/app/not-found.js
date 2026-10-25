import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>That page or dish does not exist.</p>
      <Link href="/menu">Back to menu</Link>
    </main>
  );
}