import test from "node:test";
import assert from "node:assert/strict";
import { csvCell, ordersCsv } from "../lib/csv.js";

test("CSV quotes commas, quotes, and newlines", () => {
  assert.equal(csvCell('A "quoted", name\nnext'), '"A ""quoted"", name\nnext"');
  assert.equal(ordersCsv([{ id: "1", name: 'A "quoted", name', area: "Bole", status: "placed", createdAt: "", total: null }]), 'id,name,area,status,createdAt,total\r\n1,"A ""quoted"", name",Bole,placed,,');
});
