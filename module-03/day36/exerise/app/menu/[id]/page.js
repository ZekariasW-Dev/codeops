import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "../../data/books";

export default function BookPage({ params }) {
  return (
    <Suspense fallback={<p>Loading book...</p>}>
      <BookDetails params={params} />
    </Suspense>
  );
}

async function BookDetails({ params }) {
  const { id } = await params;
  const book = books.find((item) => item.id === id);

  if (!book) {
    notFound();
  }

  return (
    <main>
      <h1>{book.title}</h1>
      <p>Book id: {id}</p>
      <p>{book.description}</p>
      <p>Price: ${book.price}</p>
      <Link href="/menu">Back to menu</Link>
    </main>
  );
}