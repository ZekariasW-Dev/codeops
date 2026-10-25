import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main>
      <h1>Checkout</h1>
      <p>Your cart is empty.</p>
      <Link href="/cart">Back to cart</Link>
    </main>
  );
}