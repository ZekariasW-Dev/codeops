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

export function findOrder(id) {
  return orders.find((order) => order.id === id);
}

export function setOrderStatus(order, status) {
  order.status = status;
}
