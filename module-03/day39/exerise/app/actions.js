"use server";

import { revalidatePath } from "next/cache";
import { createOrder as saveOrder, findOrder, setOrderStatus } from "./data/orders";
import { validateOrder } from "./data/orderValidation";
import { getOrCreateSessionId, getSessionId } from "./data/session";

export async function placeOrder(_previousState, formData) {
  const details = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    area: formData.get("area"),
    notes: formData.get("notes") || "",
  };
  const fieldErrors = validateOrder(details);

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 422, fieldErrors, message: "Please fix the fields below." };
  }

  const ownerId = await getOrCreateSessionId();
  const order = saveOrder(details, ownerId);
  revalidatePath("/checkout");

  return {
    status: 201,
    fieldErrors: {},
    message: "Your order was placed.",
    orderId: order.id,
  };
}

export async function cancelOrder(_previousState, formData) {
  const sessionId = await getSessionId();

  if (!sessionId) {
    return { status: 401, message: "Your session could not be found." };
  }

  const orderId = formData.get("orderId");
  if (typeof orderId !== "string") {
    return { status: 400, message: "Order id is required." };
  }

  const order = findOrder(orderId);
  if (!order || order.ownerId !== sessionId) {
    return { status: 404, message: "Order not found." };
  }

  setOrderStatus(order, "cancelled");
  revalidatePath("/checkout");

  return { status: 200, message: "Your order was cancelled." };
}
