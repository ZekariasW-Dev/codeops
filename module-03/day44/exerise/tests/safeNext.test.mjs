import assert from "node:assert/strict";
import test from "node:test";
import { getSafeNextPath } from "../lib/safeNext.mjs";

test("preserves an internal destination and its query", () => {
  assert.equal(
    getSafeNextPath("/checkout?from=cart"),
    "/checkout?from=cart",
  );
});

test("rejects crafted external destinations", () => {
  assert.equal(getSafeNextPath("//attacker.example"), "/");
  assert.equal(getSafeNextPath("https://attacker.example"), "/");
  assert.equal(getSafeNextPath("/\\attacker.example"), "/");
});
