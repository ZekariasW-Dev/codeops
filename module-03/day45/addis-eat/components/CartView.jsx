"use client";

import Link from "next/link";
import useCartStore from "../stores/cartStore";

export default function CartView() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);
  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  if (!items.length) {
    return (
      <div className="status-panel">
        <h2>Your order is waiting to begin.</h2>
        <p>Choose a few favorites from the kitchen.</p>
        <Link className="button button-dark" href="/menu">Explore the menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-lines" aria-label="Items in your order">
        {items.map((item) => (
          <article className="cart-line" key={item.id}>
            <div><h2>{item.name}</h2><p>{item.price} ETB each</p></div>
            <strong>{item.price * item.quantity} ETB</strong>
            <div className="quantity-control" aria-label={`${item.name} quantity`}>
              <button type="button" onClick={() => remove(item.id)} aria-label={`Remove one ${item.name}`}>-</button>
              <span>{item.quantity}</span>
              <button type="button" onClick={() => item.quantity < 50 && useCartStore.getState().addItem(item)} aria-label={`Add one ${item.name}`} disabled={item.quantity >= 50}>+</button>
            </div>
          </article>
        ))}
      </div>
      <aside className="cart-summary">
        <h2>Order total</h2>
        <p>Delivery details come next.</p>
        <div className="summary-total"><span>Subtotal</span><span>{total} ETB</span></div>
        <Link className="button button-dark checkout-link" href="/checkout">Continue to checkout</Link>
        <button className="clear-button" type="button" onClick={clear}>Clear order</button>
      </aside>
    </div>
  );
}