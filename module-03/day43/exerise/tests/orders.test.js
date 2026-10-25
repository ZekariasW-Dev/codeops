import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import {
  createOrder,
  findOrderForOwner,
  findOrdersForOwner,
} from "../app/data/orders.js";

test("order reads are restricted to the owning session", () => {
  const ownerId = randomUUID();
  const otherSessionId = randomUUID();
  const order = createOrder(
    { name: "Test Customer", phone: "0912345678", area: "Bole", notes: "" },
    ownerId,
  );

  assert.equal(findOrderForOwner(order.id, ownerId), order);
  assert.equal(findOrderForOwner(order.id, otherSessionId), undefined);
  assert.deepEqual(findOrdersForOwner(otherSessionId), []);
});
