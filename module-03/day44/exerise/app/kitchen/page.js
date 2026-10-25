import { notFound, redirect } from "next/navigation";
import { getAllOrders, getPublicOrder } from "../data/orders";
import { getSession } from "../data/session";

export const metadata = {
  title: "Kitchen orders",
  description: "Manage incoming Addis Eats orders in the kitchen.",
  robots: { index: false, follow: false },
};

export default async function KitchenPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=%2Fkitchen");
  if (session.role !== "staff") notFound();

  const orders = getAllOrders().map(getPublicOrder);

  return (
    <main>
      <h2>Kitchen orders</h2>
      {orders.length === 0 ? (
        <p>There are no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.name} — {order.area} — {order.status} (Order {order.id})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
