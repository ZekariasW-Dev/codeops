import Link from "next/link";

export default function MenuNotFound() {
  return (
    <main>
      <h1>Book not found</h1>
      <p>This book is not in the menu.</p>
      <Link href="/menu">Back to menu</Link>
    </main>
  );
}