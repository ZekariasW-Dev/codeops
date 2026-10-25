"use client";

import { useState } from "react";

export default function MenuCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Menu visits: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add one</button>
    </div>
  );
}