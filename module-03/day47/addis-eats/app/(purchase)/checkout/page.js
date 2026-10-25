import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../data/session";
import { signInPath } from "../../data/redirects";
import CheckoutForm from "./CheckoutForm";

export const metadata = {
  title: "Checkout",
  description: "Enter your delivery details to complete your Addis Eats order.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) {
    redirect(signInPath("/checkout"));
  }

  return (
    <main>
      <h1>Checkout</h1>
      <CheckoutForm />
      <Link href="/cart">Back to cart</Link>
    </main>
  );
}