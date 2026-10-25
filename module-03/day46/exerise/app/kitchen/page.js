import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAllOrders } from "../data/orders";
import {
  getOrderAnalytics,
  getOrderTablePage,
  ORDER_PAGE_SIZE,
} from "../data/orderAnalytics";
import { getSession } from "../data/session";
import OrderCharts from "./OrderCharts";

export const metadata = {
  title: "Kitchen orders",
  description: "Review order totals and daily order activity in the kitchen.",
  robots: { index: false, follow: false },
};

function firstParam(value) {
  return Array.isArray(value) ? value[0] : value;
}

function validPage(value) {
  const parsed = Number.parseInt(firstParam(value) ?? "1", 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}

function sortHref(searchParams, sort) {
  const activeSort = firstParam(searchParams.sort);
  const activeDirection = firstParam(searchParams.direction) ?? "desc";
  const nextDirection =
    activeSort !== sort
      ? "asc"
      : activeDirection === "asc"
        ? "desc"
        : "asc";
  const params = new URLSearchParams();
  params.set("sort", sort);
  params.set("direction", nextDirection);
  params.set("page", "1");
  return `/kitchen?${params.toString()}`;
}

function pageHref(page, sort, direction) {
  const params = new URLSearchParams({
    page: String(page),
    sort,
    direction,
  });
  return `/kitchen?${params.toString()}`;
}

function SortHeader({ label, sortKey, currentSort, direction, searchParams }) {
  const active = currentSort === sortKey;
  const ariaSort = active
    ? direction === "asc"
      ? "ascending"
      : "descending"
    : "none";
  const nextDirection = active && direction === "asc" ? "desc" : "asc";
  const indicator = active ? (direction === "asc" ? " ▲" : " ▼") : "";

  return (
    <th scope="col" aria-sort={ariaSort}>
      <Link
        href={sortHref(searchParams, sortKey)}
        aria-label={`Sort by ${label}, ${nextDirection === "asc" ? "ascending" : "descending"}`}
      >
        {label}{indicator}
      </Link>
    </th>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(date));
}

export default async function KitchenPage({ searchParams }) {
  const session = await getSession();
  if (!session) redirect("/login?next=%2Fkitchen");
  if (session.role !== "staff") notFound();

  const query = await searchParams;
  const sort = firstParam(query.sort) ?? "createdAt";
  const direction = firstParam(query.direction) ?? "desc";
  const allOrders = getAllOrders().map(
    ({ id, name, area, status, createdAt, total }) => ({
      id,
      name,
      area,
      status,
      createdAt: typeof createdAt === "string" ? createdAt : null,
      total,
    }),
  );
  const analytics = getOrderAnalytics(allOrders);
  const table = getOrderTablePage(allOrders, {
    sort,
    direction,
    page: validPage(query.page),
  });
  const start = (table.page - 1) * ORDER_PAGE_SIZE + 1;
  const end = Math.min(table.page * ORDER_PAGE_SIZE, table.total);

  return (
    <main>
      <h1>Kitchen orders</h1>
      <OrderCharts data={analytics} />
      <section aria-labelledby="orders-heading">
        <h2 id="orders-heading">All orders</h2>
        {table.total === 0 ? (
          <p>There are no orders yet.</p>
        ) : (
          <>
            <table>
              <caption>
                Orders {start}–{end} of {table.total}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <SortHeader
                    label="Date"
                    sortKey="createdAt"
                    currentSort={table.sort}
                    direction={table.direction}
                    searchParams={query}
                  />
                  <SortHeader
                    label="Customer"
                    sortKey="name"
                    currentSort={table.sort}
                    direction={table.direction}
                    searchParams={query}
                  />
                  <SortHeader
                    label="Area"
                    sortKey="area"
                    currentSort={table.sort}
                    direction={table.direction}
                    searchParams={query}
                  />
                  <SortHeader
                    label="Status"
                    sortKey="status"
                    currentSort={table.sort}
                    direction={table.direction}
                    searchParams={query}
                  />
                  <th scope="col" className="number-cell" aria-sort={table.sort === "total" ? (table.direction === "asc" ? "ascending" : "descending") : "none"}>
                    <Link
                      href={sortHref(query, "total")}
                      aria-label={`Sort by total, ${table.sort === "total" && table.direction === "asc" ? "descending" : "ascending"}`}
                    >
                      Total{table.sort === "total" ? (table.direction === "asc" ? " ▲" : " ▼") : ""}
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {table.orders.map((order) => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>
                      {order.createdAt ? (
                        <time dateTime={order.createdAt}>
                          {formatDate(order.createdAt)}
                        </time>
                      ) : (
                        "Unknown"
                      )}
                    </td>
                    <td>{order.name}</td>
                    <td>{order.area}</td>
                    <td>{order.status}</td>
                    <td className="number-cell">
                      {Number.isFinite(order.total)
                        ? `${new Intl.NumberFormat("en-ET").format(order.total)} ETB`
                        : "Not recorded"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {table.totalPages > 1 && (
              <nav className="pagination" aria-label="Order pages">
                {table.page > 1 && (
                  <Link href={pageHref(table.page - 1, table.sort, table.direction)}>
                    Previous
                  </Link>
                )}
                <span aria-current="page">
                  Page {table.page} of {table.totalPages}
                </span>
                {table.page < table.totalPages && (
                  <Link href={pageHref(table.page + 1, table.sort, table.direction)}>
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
}
