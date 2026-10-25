"use server";

import { revalidatePath } from "next/cache";
import {
  cancelOrderRecord,
  createOrder,
  findOrderForOwner,
} from "./data/orders";
import { validateOrder } from "./data/orderValidation";
import { getSession } from "./data/session";

export async function placeOrder(_previousState, formData) {
  const session = await getSession();
  if (!session) {
    return {
      status: 401,
      fieldErrors: {},
      message: "Please sign in before placing an order.",
    };
  }

  const notes = formData.get("notes");
  const orderToken = formData.get("orderToken");
  const details = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    area: formData.get("area"),
    notes: typeof notes === "string" ? notes : "",
  };
  const fieldErrors = validateOrder(details);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 422,
      fieldErrors,
      message: "Please fix the fields below.",
    };
  }

  const order = createOrder(details, session.id, orderToken);
  revalidatePath("/checkout");

  return {
    status: 201,
    fieldErrors: {},
    message: "Your order was placed.",
    orderId: order.id,
  };
}

export async function cancelOrder(_previousState, formData) {
  const session = await getSession();
  if (!session) {
    return { status: 401, message: "Your session could not be found." };
  }

  const orderId = formData.get("orderId");
  if (typeof orderId !== "string") {
    return { status: 400, message: "Order id is required." };
  }

  const order = findOrderForOwner(orderId, session.id);
  if (!order) {
    return { status: 404, message: "Order not found." };
  }

  cancelOrderRecord(order);
  revalidatePath("/checkout");

  return { status: 200, message: "Your order was cancelled." };
}


