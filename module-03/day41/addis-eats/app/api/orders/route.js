import { createOrder } from "../../data/orders";
import { validateOrder } from "../../data/orderValidation";
import { getOrCreateSessionId } from "../../data/session";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    throw error;
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors: validateOrder({}),
      },
      { status: 422 },
    );
  }

  const details = {
    name: body.name,
    phone: body.phone,
    area: body.area,
    notes: typeof body.notes === "string" ? body.notes : "",
  };
  const fieldErrors = validateOrder(details);

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      { error: "Validation failed", fieldErrors },
      { status: 422 },
    );
  }

  const ownerId = await getOrCreateSessionId();
  const order = createOrder(details, ownerId);
  const { ownerId: _ownerId, ...publicOrder } = order;

  return Response.json({ order: publicOrder }, { status: 201 });
}
