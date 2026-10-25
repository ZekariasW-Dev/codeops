import assert from "node:assert/strict";
import test from "node:test";
import { createHmac } from "node:crypto";
import {
  createSessionToken,
  verifySessionToken,
} from "../app/data/sessionToken.js";

const secret = "test-session-secret-that-is-long-enough";

test("verifies signed sessions and rejects modified claims", () => {
  process.env.SESSION_SECRET = secret;
  const token = createSessionToken("staff@example.com", "staff");

  assert.equal(verifySessionToken(token).role, "staff");

  const [payload] = token.split(".");
  const modifiedPayload = Buffer.from(
    JSON.stringify({
      ...JSON.parse(Buffer.from(payload, "base64url").toString("utf8")),
      role: "customer",
    }),
  ).toString("base64url");
  assert.equal(verifySessionToken(`${modifiedPayload}.${token.split(".")[1]}`), null);
});

test("rejects expired signed sessions", () => {
  process.env.SESSION_SECRET = secret;
  const payload = Buffer.from(
    JSON.stringify({
      id: "expired-session",
      userId: "customer@example.com",
      role: "customer",
      expiresAt: Date.now() - 1,
    }),
  ).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  assert.equal(verifySessionToken(`${payload}.${signature}`), null);
});
