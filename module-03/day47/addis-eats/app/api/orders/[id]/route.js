import { findOrderForOwner } from "../../../data/orders";
import { getSession } from "../../../data/session";

export async function GET(_request, { params }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Authentication required" }, { status: 401 });
  }

  const order = findOrderForOwner(id, session.id);
  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json({ id: order.id, status: order.status });
}
