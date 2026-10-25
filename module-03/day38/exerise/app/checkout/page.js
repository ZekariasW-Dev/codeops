import Link from "next/link";
import { cookies } from "next/headers";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const checkoutMarker = cookieStore.get("checkout-marker")?.value ?? "not set";

  return (
    <main>
      <h1>Checkout</h1>
      <p>There are no books to check out yet.</p>
      <p>Checkout cookie marker: {checkoutMarker}</p>
      <Link href="/cart">Back to cart</Link>
    </main>
  );
}