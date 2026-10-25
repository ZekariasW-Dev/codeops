import { findOrderForOwner, getPublicOrder } from "../../../data/orders";
import { getSession } from "../../../data/session";

export async function GET(_request, { params }) {
  const { id } = await params;
  const session = await getSession();
  const order = session ? findOrderForOwner(id, session.id) : null;

  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json(getPublicOrder(order), {
    headers: { "Cache-Control": "no-store" },
  });
}