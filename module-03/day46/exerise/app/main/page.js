import { findOrderForOwner, getPublicOrder } from "../data/orders";
import { getSession } from "../data/session";
import OrderStatus from "./OrderStatus";

export const metadata = {
  title: "Order status",
  description: "Check the latest status of your Addis Eats order.",
  robots: { index: false, follow: false },
};

export default async function MainPage({ searchParams }) {
  const { orderId } = await searchParams;
  const session = await getSession();
  const order =
    session && typeof orderId === "string"
      ? findOrderForOwner(orderId, session.id)
      : null;
  const fallbackData = order ? getPublicOrder(order) : undefined;

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