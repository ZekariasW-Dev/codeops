import { notFound } from "next/navigation";
import { findOrder } from "../../data/orders";
import { getSessionId } from "../../data/session";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const sessionId = await getSessionId();
  const order = findOrder(id);

  if (!order || order.ownerId !== sessionId) {
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
