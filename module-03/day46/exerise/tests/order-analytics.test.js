import assert from "node:assert/strict";
import test from "node:test";
import {
  getOrderAnalytics,
  getOrderTablePage,
} from "../app/data/orderAnalytics.js";

const sampleOrders = Array.from({ length: 21 }, (_, index) => ({
  id: `order-${index + 1}`,
  name: `Customer ${String(index + 1).padStart(2, "0")}`,
  area: index % 2 === 0 ? "Bole" : "Arada",
  status: "placed",
  createdAt: `2026-10-${String(21 - (index % 3)).padStart(2, "0")}T10:00:00.000Z`,
  total: index === 0 ? 250 : null,
}));

test("empty order state has a stable, empty first page", () => {
  assert.deepEqual(getOrderTablePage([]), {
    orders: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
    sort: "createdAt",
    direction: "desc",
  });
});

test("default order state sorts newest first", () => {
  const result = getOrderTablePage(sampleOrders);

  assert.equal(result.page, 1);
  assert.equal(result.orders.length, 10);
  assert.equal(result.orders[0].createdAt, "2026-10-21T10:00:00.000Z");
});

test("ascending sort state respects the requested column and direction", () => {
  const result = getOrderTablePage(sampleOrders, {
    sort: "name",
    direction: "asc",
  });

  assert.equal(result.sort, "name");
  assert.equal(result.direction, "asc");
  assert.equal(result.orders[0].name, "Customer 01");
});

test("total sort keeps orders without recorded totals at the end", () => {
  const result = getOrderTablePage(sampleOrders, {
    sort: "total",
    direction: "desc",
  });

  assert.equal(result.orders[0].total, 250);
  assert.ok(result.orders.slice(1).every((order) => order.total === null));
});

test("later page state is clamped and contains only the remaining orders", () => {
  const result = getOrderTablePage(sampleOrders, {
    sort: "name",
    direction: "asc",
    page: 99,
  });

  assert.equal(result.page, 3);
  assert.equal(result.totalPages, 3);
  assert.equal(result.orders.length, 1);
  assert.equal(result.orders[0].name, "Customer 21");
});

test("analytics returns seven daily summaries and only recorded revenue", () => {
  const data = getOrderAnalytics(sampleOrders, new Date("2026-10-21T16:00:00.000Z"));

  assert.equal(data.length, 7);
  assert.equal(data[6].date, "2026-10-21");
  assert.equal(data[6].orders, 7);
  assert.equal(data[6].revenue, 250);
  assert.equal(data[5].revenue, null);
});
