import Link from "next/link";
import OrderForm from "./OrderForm";

export default async function CheckoutPage() {
  return (
    <main>
      <h1>Checkout</h1>
      <OrderForm />
      <Link href="/cart">Back to cart</Link>
    </main>
  );
}