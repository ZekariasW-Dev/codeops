import { findOrderForOwner, getPublicOrder, subscribeToOrder } from "../../../../data/orders";
import { getSession } from "../../../../data/session";
export const dynamic = "force-dynamic";
const frame = (order) => `event: status\ndata: ${JSON.stringify(order)}\n\n`;
export async function GET(request, { params }) {
  const { id } = await params;
  const session = await getSession();
  const order = session ? findOrderForOwner(id, session.id) : null;
  if (!order) return Response.json({ error: "Order not found" }, { status: 404 });
  const encoder = new TextEncoder(); let unsubscribe = () => {}; let heartbeat;
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(frame(getPublicOrder(order))));
      unsubscribe = subscribeToOrder(id, (next) => controller.enqueue(encoder.encode(frame(next))));
      heartbeat = setInterval(() => controller.enqueue(encoder.encode(": keep-alive\n\n")), 15000);
      request.signal.addEventListener("abort", () => controller.close(), { once: true });
    },
    cancel() { clearInterval(heartbeat); unsubscribe(); },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive" } });
}

