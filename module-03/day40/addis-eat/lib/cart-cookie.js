import "server-only";
import { cookies } from "next/headers";

export async function readCartLines() {
  const cookieStore = await cookies();
  const value = cookieStore.get("addis-cart")?.value;
  if (!value) return [];

  try {
    const parsed = JSON.parse(decodeURIComponent(value));
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((line) => {
      const id = Number(line?.id);
      const quantity = Number(line?.quantity);
      return Number.isInteger(id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 50
        ? [{ id, quantity }]
        : [];
    });
  } catch {
    return [];
  }
}