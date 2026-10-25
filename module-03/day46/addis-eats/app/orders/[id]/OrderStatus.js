"use client";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";

export default function OrderStatus({ orderId, initialOrder }) {
  const { data: order, error } = useSWR(
    `/api/orders/${orderId}`,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
    },
  );

  return (
    <section aria-live="polite">
      {error ? (
        <p role="alert">Unable to refresh this order status.</p>
      ) : null}
      <p>Order: {order.id}</p>
      <p>Status: {order.status}</p>
    </section>
  );
}
