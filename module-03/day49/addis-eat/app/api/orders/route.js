import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { validateOrder } from "../../../lib/order-schema";
import { canPlaceOrder, getDemoUser } from "../../../lib/session";

export async function POST(request) {
  const user = await getDemoUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in before placing an order." }, { status: 401 });
  }
  if (!canPlaceOrder(user)) {
    return NextResponse.json({ error: "You do not have permission to place an order." }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const fieldErrors = validateOrder({ ...body, name: user.name });
  if (Object.keys(fieldErrors).length) {
    return NextResponse.json({ error: "Order details are invalid.", fieldErrors }, { status: 422 });
  }

  return NextResponse.json({ orderId: randomUUID().slice(0, 8).toUpperCase(), status: "accepted" }, { status: 201 });
}