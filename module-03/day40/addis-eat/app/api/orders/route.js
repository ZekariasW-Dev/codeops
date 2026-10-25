import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { validateOrder } from "../../../lib/order-schema";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const fieldErrors = validateOrder(body);
  if (Object.keys(fieldErrors).length) {
    return NextResponse.json({ error: "Order details are invalid.", fieldErrors }, { status: 422 });
  }

  return NextResponse.json({ orderId: randomUUID().slice(0, 8).toUpperCase(), status: "accepted" }, { status: 201 });
}