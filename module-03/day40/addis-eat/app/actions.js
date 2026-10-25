"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPricedCart } from "../lib/dishes";
import { readCartLines } from "../lib/cart-cookie";
import { validateOrder } from "../lib/order-schema";
import { getDemoUser, setDemoSession } from "../lib/session";

export async function placeOrder(_previousState, formData) {
  const intent = String(formData.get("intent") ?? "place-order");

  if (intent === "sign-in") {
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return { status: "error", message: "Enter your name to continue.", fieldErrors: {} };
    await setDemoSession(name);
    redirect("/checkout");
  }

  const user = await getDemoUser();
  if (!user) {
    return { status: "error", message: "Sign in before placing an order.", fieldErrors: {} };
  }

  const values = {
    name: user.name,
    phone: formData.get("phone"),
    area: formData.get("area"),
    notes: formData.get("notes"),
  };
  const fieldErrors = validateOrder(values);
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Check the delivery details below.", fieldErrors };
  }

  const items = getPricedCart(await readCartLines());
  if (!items.length) {
    return { status: "error", message: "Your order is empty. Add a dish before checking out.", fieldErrors: {} };
  }

  const orderId = randomUUID().slice(0, 8).toUpperCase();
  const cookieStore = await cookies();
  cookieStore.set("addis-cart", "", { path: "/", maxAge: 0, sameSite: "lax" });
  redirect(`/checkout?placed=${orderId}`);
}