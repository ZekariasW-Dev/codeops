"use client";

import { useState } from "react";
import useCartStore from "../stores/cartStore";

export default function AddToCartButton({ dish, compact = false }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(dish);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  }

  return (
    <button className="add-button" type="button" onClick={handleAdd} aria-label={`Add ${dish.name} to cart`}>
      {added ? "Added" : compact ? "Add to order +" : "Add to order"}
    </button>
  );
}