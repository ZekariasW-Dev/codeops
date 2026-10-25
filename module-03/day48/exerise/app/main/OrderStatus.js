"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { relative, when } from "../../lib/format";
const DeliveryMap = dynamic(() => import("./DeliveryMap"), { ssr: false, loading: () => <div className="delivery-map map-placeholder" aria-label="Loading delivery map">Loading map…</div> });
export default function OrderStatus({ orderId, fallbackData }) {
  const [order, setOrder] = useState(fallbackData);
  const [connection, setConnection] = useState(orderId ? "connecting" : "closed");
  useEffect(() => {
    if (!orderId) return;
    const source = new EventSource(`/api/orders/${encodeURIComponent(orderId)}/stream`);
    source.onopen = () => setConnection("connected");
    source.addEventListener("status", (event) => {
      const next = JSON.parse(event.data); setOrder(next);
      if (next.status === "delivered") { source.close(); setConnection("delivered"); }
    });
    source.onerror = () => setConnection("disconnected");
    return () => source.close();
  }, [orderId]);
  if (!orderId) return <p>Place an order to track its status here.</p>;
  if (!order) return <p role="alert">This order could not be found.</p>;
  return <section aria-live="polite"><p>Stream: <strong>{connection}</strong></p><p>Order for {order.name}</p><p>Delivery area: {order.area}</p><p>Status: {order.status}</p><p><time dateTime={order.createdAt}>{when(order.createdAt)}</time> ({relative(order.createdAt)})</p><p>Order ID: {order.id}</p><p>Courier is heading to the delivery marker in {order.area}.</p><DeliveryMap area={order.area} /></section>;
}

