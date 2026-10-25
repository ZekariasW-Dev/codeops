import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  // Reading cookies makes checkout depend on each request.
  const cookieStore = await cookies();
  const marker = cookieStore.get("checkout-marker")?.value ?? "not set";

  return (
    <main>
      <h1>Checkout</h1>
      <p>Your cart is empty.</p>
      <p>Checkout cookie marker: {marker}</p>
      <Link href="/cart">Back to cart</Link>
    </main>
  );
}