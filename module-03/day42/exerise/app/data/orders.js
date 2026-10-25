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

export function findOrderForOwner(id, ownerId) {
  return orders.find((order) => order.id === id && order.ownerId === ownerId);
}

export function findOrdersForOwner(ownerId) {
  return orders.filter((order) => order.ownerId === ownerId);
}

export function getAllOrders() {
  return orders;
}

export function getPublicOrder(order) {
  const { id, name, area, status } = order;
  return { id, name, area, status };
}

export function setOrderStatus(order, status) {
  order.status = status;
}
