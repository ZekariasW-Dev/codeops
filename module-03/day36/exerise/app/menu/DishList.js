import Link from "next/link";

export default function DishList({ books }) {
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