"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export function syncCartCookie(items) {
  if (typeof document === "undefined") return;
  const lines = items.map(({ id, quantity }) => ({ id, quantity }));
  document.cookie = `addis-cart=${encodeURIComponent(JSON.stringify(lines))}; Path=/; Max-Age=172800; SameSite=Lax`;
}

const useCartStore = create(persist((set, get) => ({
  items: [],
  addItem(item) {
    if (!item || !Number.isInteger(Number(item.id)) || typeof item.name !== "string" || !Number.isFinite(Number(item.price))) return;
    const current = get().items;
    const found = current.find((entry) => Number(entry.id) === Number(item.id));
    const items = found
      ? current.map((entry) => Number(entry.id) === Number(item.id) ? { ...entry, quantity: Math.min(entry.quantity + 1, 50) } : entry)
      : [...current, { ...item, id: Number(item.id), price: Number(item.price), quantity: 1 }];
    set({ items });
    syncCartCookie(items);
  },
  remove(id) {
    const items = get().items.flatMap((entry) => {
      if (Number(entry.id) !== Number(id)) return [entry];
      return entry.quantity > 1 ? [{ ...entry, quantity: entry.quantity - 1 }] : [];
    });
    set({ items });
    syncCartCookie(items);
  },
  clear() {
    set({ items: [] });
    syncCartCookie([]);
  },
}), {
  name: "addis-eats-cart",
  skipHydration: true,
  partialize: (state) => ({ items: state.items }),
}));

export default useCartStore;