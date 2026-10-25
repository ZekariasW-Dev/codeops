import { randomUUID } from "node:crypto";

const orders = [];

export function createOrder(details, ownerId, idempotencyKey) {
  if (idempotencyKey) {
    const existing = orders.find((order) => order.ownerId === ownerId && order.idempotencyKey === idempotencyKey);
    if (existing) return existing;
  }
  const order = {
    id: randomUUID(),
    ...details,
    ownerId,
    idempotencyKey,
    status: "placed",
  };

  orders.push(order);
  return order;
}

export function findOrderForOwner(id, ownerId) {
  return orders.find(
    (order) => order.id === id && order.ownerId === ownerId,
  );
}

export function cancelOrderRecord(order) {
  order.status = "cancelled";
}


