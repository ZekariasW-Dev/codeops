"use client";

import useSWR from "swr";
import fetcher from "../../lib/fetcher";

export default function OrderStatus({ orderId, fallbackData }) {
  const { data, error } = useSWR(
    orderId ? `/api/orders/${encodeURIComponent(orderId)}` : null,
    fetcher,
    { fallbackData, refreshInterval: 3000 },
  );

  if (!orderId) {
    return <p>Place an order to track its status here.</p>;
  }

  if (error || (!data && !fallbackData)) {
    return <p role="alert">This order could not be found.</p>;
  }

  const order = data ?? fallbackData;

  return (
    <section aria-live="polite">
      <p>Order for {order.name}</p>
      <p>Delivery area: {order.area}</p>
      <p>Status: {order.status}</p>
      <p>Order ID: {order.id}</p>
    </section>
  );
}