import Link from "next/link";

export default function CartPage() {
  return (
    <main>
      <h1>Cart</h1>
      <p>Your cart is empty.</p>
      <Link href="/menu">Back to menu</Link>
      <p><Link href="/checkout">Go to checkout</Link></p>
    </main>
  );
}