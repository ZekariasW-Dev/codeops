"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [showDishes, setShowDishes] = useState(true);

  return (
    <section>
      <button onClick={() => setShowDishes(!showDishes)}>
        {showDishes ? "Hide books" : "Show books"}
      </button>
      {showDishes && children}
    </section>
  );
}