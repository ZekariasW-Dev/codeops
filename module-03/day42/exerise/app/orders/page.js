import Link from "next/link";
import { redirect } from "next/navigation";
import { findOrdersForOwner, getPublicOrder } from "../data/orders";
import { getSession } from "../data/session";

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=%2Forders");

  const orders = findOrdersForOwner(session.id).map(getPublicOrder);

  return (
    <main>
      <h2>Your orders</h2>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <Link href={`/main?orderId=${encodeURIComponent(order.id)}`}>
                Order {order.id}
              </Link>
              {" — "}
              {order.area} — {order.status}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
