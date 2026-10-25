"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPricedCart } from "../lib/dishes";
import { readCartLines } from "../lib/cart-cookie";
import { validateOrder } from "../lib/order-schema";
import { canPlaceOrder, clearDemoSession, getDemoUser, setDemoSession } from "../lib/session";

export async function signIn(_previousState, formData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { status: "error", message: "Enter your name to continue." };
  if (name.length > 80) return { status: "error", message: "Name must be 80 characters or fewer." };
  await setDemoSession(name);
  redirect("/checkout");
}

export async function signOut() {
  const user = await getDemoUser();
  if (!user) redirect("/sign-in?next=%2Fcheckout");
  await clearDemoSession();
  redirect("/sign-in");
}

export async function placeOrder(_previousState, formData) {
  const user = await getDemoUser();
  if (!user) redirect("/sign-in?next=%2Fcheckout");
  if (!canPlaceOrder(user)) {
    return { status: "error", message: "You do not have permission to place an order.", fieldErrors: {} };
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