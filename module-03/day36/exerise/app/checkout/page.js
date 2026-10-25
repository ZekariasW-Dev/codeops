import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main>
      <h1>Checkout</h1>
      <p>There are no books to check out yet.</p>
      <Link href="/cart">Back to cart</Link>
    </main>
  );
}