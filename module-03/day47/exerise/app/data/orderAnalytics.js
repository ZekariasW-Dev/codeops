export const ORDER_PAGE_SIZE = 10;
export const ORDER_CHART_DAYS = 7;

const sortFields = new Set(["createdAt", "name", "area", "status", "total"]);

export function getOrderAnalytics(orders, now = new Date()) {
  const days = Array.from({ length: ORDER_CHART_DAYS }, (_, index) => {
    const day = new Date(now);
    day.setUTCHours(0, 0, 0, 0);
    day.setUTCDate(day.getUTCDate() - (ORDER_CHART_DAYS - 1 - index));
    return {
      date: day.toISOString().slice(0, 10),
      orders: 0,
      revenue: 0,
      revenueCount: 0,
    };
  });
  const daysByDate = new Map(days.map((day) => [day.date, day]));

  for (const order of orders) {
    const day = daysByDate.get(order.createdAt?.slice(0, 10));
    if (!day) continue;
    day.orders += 1;
    if (Number.isFinite(order.total)) {
      day.revenue += order.total;
      day.revenueCount += 1;
    }
  }

  for (const day of days) {
    if (day.revenueCount === 0) day.revenue = null;
    delete day.revenueCount;
  }

  return days;
}

export function getOrderTablePage(
  orders,
  { sort = "createdAt", direction = "desc", page = 1 } = {},
) {
  const sortBy = sortFields.has(sort) ? sort : "createdAt";
  const sortDirection = direction === "asc" ? "asc" : "desc";
  const sortedOrders = [...orders].sort((left, right) => {
    const leftValue = left[sortBy];
    const rightValue = right[sortBy];
    let comparison;

    if (sortBy === "total") {
      const leftMissing = !Number.isFinite(leftValue);
      const rightMissing = !Number.isFinite(rightValue);
      if (leftMissing !== rightMissing) return leftMissing ? 1 : -1;
      comparison = (leftValue ?? -1) - (rightValue ?? -1);
    } else {
      comparison = String(leftValue ?? "").localeCompare(
        String(rightValue ?? ""),
        undefined,
        { numeric: true, sensitivity: "base" },
      );
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });
  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / ORDER_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * ORDER_PAGE_SIZE;

  return {
    orders: sortedOrders.slice(start, start + ORDER_PAGE_SIZE),
    page: currentPage,
    pageSize: ORDER_PAGE_SIZE,
    total: sortedOrders.length,
    totalPages,
    sort: sortBy,
    direction: sortDirection,
  };
}
