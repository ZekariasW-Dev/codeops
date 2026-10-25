"use client";

import { useRouter } from "next/navigation";

export default function PushToMenu() {
  const router = useRouter();

  return <button onClick={() => router.push("/menu")}>Go to menu</button>;
}