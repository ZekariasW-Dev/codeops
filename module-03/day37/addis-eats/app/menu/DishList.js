import Link from "next/link";

export default async function DishList({ dishes }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.id}>
          <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
        </li>
      ))}
    </ul>
  );
}