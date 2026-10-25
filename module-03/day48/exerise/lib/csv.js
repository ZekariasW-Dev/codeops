export function csvCell(value) { const text = value == null ? "" : String(value); return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text; }
export function ordersCsv(orders) { const columns = ["id", "name", "area", "status", "createdAt", "total"]; return [columns.join(","), ...orders.map((order) => columns.map((column) => csvCell(order[column])).join(","))].join("\r\n"); }
