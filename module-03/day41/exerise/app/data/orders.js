import { randomUUID } from "node:crypto";

const ordersKey = Symbol.for("addis-eats.orders");
const orders = (globalThis[ordersKey] ??= []);

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

export function getPublicOrder(order) {
  const { id, name, area, status } = order;
  return { id, name, area, status };
}

export function setOrderStatus(order, status) {
  order.status = status;
}
