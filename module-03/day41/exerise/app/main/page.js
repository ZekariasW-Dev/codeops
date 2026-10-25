import { findOrder, getPublicOrder } from "../data/orders";
import { getSessionId } from "../data/session";
import OrderStatus from "./OrderStatus";

export default async function MainPage({ searchParams }) {
  const { orderId } = await searchParams;
  const sessionId = await getSessionId();
  const order = typeof orderId === "string" ? findOrder(orderId) : null;
  const fallbackData =
    order && order.ownerId === sessionId ? getPublicOrder(order) : undefined;

  return (
    <main>
      <h1>Order status</h1>
      <OrderStatus
        orderId={typeof orderId === "string" ? orderId : null}
        fallbackData={fallbackData}
      />
    </main>
  );
}