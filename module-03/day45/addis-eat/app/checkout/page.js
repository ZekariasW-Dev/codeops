import Link from "next/link";
import { signOut } from "../actions";
import CheckoutForm from "../../components/CheckoutForm";
import { readCartLines } from "../../lib/cart-cookie";
import { getPricedCart } from "../../lib/dishes";
import { requireDemoUser } from "../../lib/session";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ searchParams }) {
  const [user, lines, query] = await Promise.all([requireDemoUser(), readCartLines(), searchParams]);
  const items = getPricedCart(lines);
  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const placedOrder = /^[A-F0-9]{8}$/.test(query.placed ?? "") ? query.placed : null;

  return (
    <section className="page-wrap">
      <header className="page-heading">
        <div><p className="eyebrow">Nearly at the table</p><h1>Checkout</h1></div>
      </header>
      <form action={signOut} className="sign-out-form">
        <button className="text-link" type="submit">Sign out</button>
      </form>
      {placedOrder ? (
        <div className="status-panel form-success" role="status">
          <p className="eyebrow">Order confirmed</p>
          <h2>Thank you. Your order is placed.</h2>
          <p>Reference: {placedOrder}. Our kitchen will contact you to coordinate delivery.</p>
          <Link className="text-link" href="/menu">Return to the menu</Link>
        </div>
      ) : <CheckoutForm user={user} items={items} total={total} />}
    </section>
  );
}