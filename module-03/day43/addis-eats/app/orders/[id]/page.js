import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { findOrderForOwner } from "../../data/orders";
import { getSession } from "../../data/session";
import { signInPath } from "../../data/redirects";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) {
    redirect(signInPath(`/orders/${encodeURIComponent(id)}`));
  }

  const order = findOrderForOwner(id, session.id);
  if (!order) {
    notFound();
  }

  return (
    <main>
      <h1>Order status</h1>
      <OrderStatus
        orderId={order.id}
        initialOrder={{ id: order.id, status: order.status }}
      />
    </main>
  );
}
