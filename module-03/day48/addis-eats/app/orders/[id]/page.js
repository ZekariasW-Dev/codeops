import { notFound, redirect } from "next/navigation";
import { findOrderForOwner } from "../../data/orders";
import { getSession } from "../../data/session";
import { signInPath } from "../../data/redirects";
import OrderStatus from "./OrderStatus";
export const metadata = { title: "Order status", description: "Check the latest status of your Addis Eats order.", robots: { index: false, follow: false } };
export default async function OrderPage({ params }) {
  const { id } = await params; const session = await getSession();
  if (!session) redirect(signInPath(`/orders/${encodeURIComponent(id)}`));
  const order = findOrderForOwner(id, session.id); if (!order) notFound();
  const placedAt = order.createdAt || new Date().toISOString();
  return <main><h1>Order status</h1><OrderStatus orderId={order.id} initialOrder={{ id: order.id, status: order.status, placedAt, total: order.total || 420, delivery: { address: `${order.area}, Addis Ababa${order.notes ? ` — ${order.notes}` : ""}`, lat: order.lat || 9.032, lng: order.lng || 38.746 }, courier: { name: "Mekdes", lat: 9.020, lng: 38.752 }, history: [{ status: "placed", at: placedAt }] }} /></main>;
}
