import CartView from "../../components/CartView";

export default function CartPage() {
  return (
    <section className="page-wrap">
      <header className="page-heading">
        <div><p className="eyebrow">Your table</p><h1>Your order</h1></div>
      </header>
      <CartView />
    </section>
  );
}