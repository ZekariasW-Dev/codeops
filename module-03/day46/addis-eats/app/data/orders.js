import { randomUUID } from "node:crypto";

const orders = [];

export function createOrder(details, ownerId) {
  const order = {
    id: randomUUID(),
    ...details,
    ownerId,
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
