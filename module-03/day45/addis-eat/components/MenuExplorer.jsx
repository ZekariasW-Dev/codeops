"use client";

import { useEffect, useRef, useState } from "react";

const categories = ["all", "regular", "spicy"];

export default function MenuExplorer({ children }) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    const cards = listRef.current?.querySelectorAll("[data-dish-name]") ?? [];
    for (const card of cards) {
      const matchesCategory = category === "all" || card.dataset.dishCategory === category;
      const matchesSearch = card.dataset.dishName.includes(search.trim().toLowerCase());
      card.hidden = !matchesCategory || !matchesSearch;
    }
  }, [category, search]);

  return (
    <>
      <div className="menu-tools">
        <label className="search-control">
          Search dishes
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name" />
        </label>
        <div className="category-list" aria-label="Dish category">
          {categories.map((item) => (
            <button
              className="category-button"
              type="button"
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item === "all" ? "All dishes" : item}
            </button>
          ))}
        </div>
      </div>
      <div ref={listRef} className="dish-grid">{children}</div>
    </>
  );
}