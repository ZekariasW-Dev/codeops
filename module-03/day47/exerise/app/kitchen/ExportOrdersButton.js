"use client";
import { ordersCsv } from "../../lib/csv";
export default function ExportOrdersButton({ orders }) { function download() { const url = URL.createObjectURL(new Blob([ordersCsv(orders)], { type: "text/csv;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = "addis-eats-orders.csv"; link.click(); URL.revokeObjectURL(url); } return <button type="button" onClick={download}>Export CSV</button>; }
