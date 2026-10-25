import Link from "next/link";

export default async function DishList({ books }) {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <Link href={`/menu/${book.id}`}>{book.title}</Link> - ${book.price}
        </li>
      ))}
    </ul>
  );
}