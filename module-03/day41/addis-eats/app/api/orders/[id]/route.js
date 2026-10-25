import { findOrder } from "../../../data/orders";
import { getSessionId } from "../../../data/session";

export async function GET(_request, { params }) {
  const { id } = await params;
  const sessionId = await getSessionId();
  const order = findOrder(id);

  if (!order || order.ownerId !== sessionId) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json({ id: order.id, status: order.status });
}
