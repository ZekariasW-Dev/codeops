import Link from "next/link";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <main>
      <h1>Checkout</h1>
      <CheckoutForm />
      <Link href="/cart">Back to cart</Link>
    </main>
  );
}