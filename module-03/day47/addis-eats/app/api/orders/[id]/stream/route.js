import { findOrderForOwner } from "../../../../data/orders";
import { getSession } from "../../../../data/session";
export async function GET(request, { params }) {
  const { id } = await params; const session = await getSession();
  if (!session) return Response.json({ error: "Authentication required" }, { status: 401 });
  const order = findOrderForOwner(id, session.id);
  if (!order) return Response.json({ error: "Order not found" }, { status: 404 });
  const encoder = new TextEncoder();
  const stream = new ReadableStream({ start(controller) {
    const send = () => controller.enqueue(encoder.encode(`data: ${JSON.stringify({ id: order.id, status: order.status, at: new Date().toISOString() })}\n\n`));
    send(); const timer = setInterval(send, 5000);
    request.signal.addEventListener("abort", () => { clearInterval(timer); controller.close(); });
  }});
  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive" } });
}
