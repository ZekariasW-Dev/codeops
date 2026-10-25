import { Link } from 'react-router-dom'
import { useCart } from './useCart.js'
import { formatBirr } from '../ui/formatBirr.js'

export function CartPage() {
  const { items, total, add, remove, clear } = useCart()

  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">YOUR ORDER</p>
        <h1>Your basket</h1>
        <p>Everything you picked, ready when you are.</p>
      </div>

      {items.length === 0 ? (
        <section className="empty-state">
          <span className="empty-icon" aria-hidden="true">🧺</span>
          <h2>Your basket is waiting</h2>
          <p>Find something delicious in the menu to get started.</p>
          <Link className="button button-primary" to="/menu">Explore the menu</Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-lines" aria-label="Items in your basket">
            {items.map((item) => (
              <article className="cart-line" key={item.id}>
                <span className="dish-emoji" aria-hidden="true">{item.emoji}</span>
                <div className="cart-line-info">
                  <h2>{item.name}</h2>
                  <p>{formatBirr(item.price)} each</p>
                </div>
                <div className="quantity-control" aria-label={`${item.name} quantity`}>
                  <button
                    className="quantity-button"
                    type="button"
                    aria-label={`Remove one ${item.name}`}
                    onClick={() => remove(item.id)}
                  >−</button>
                  <span aria-live="polite">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    type="button"
                    aria-label={`Add one ${item.name}`}
                    onClick={() => add(item)}
                  >+</button>
                </div>
                <strong>{formatBirr(item.price * item.quantity)}</strong>
              </article>
            ))}
            <button className="text-button" type="button" onClick={clear}>Clear basket</button>
          </section>

          <aside className="order-summary">
            <h2>Order summary</h2>
            <div className="summary-row"><span>Subtotal</span><strong>{formatBirr(total)}</strong></div>
            <div className="summary-row"><span>Delivery</span><span>Calculated at checkout</span></div>
            <div className="summary-total"><span>Total</span><strong>{formatBirr(total)}</strong></div>
            <Link className="button button-primary button-wide" to="/checkout">Continue to checkout</Link>
            <Link className="summary-back" to="/menu">Continue exploring</Link>
          </aside>
        </div>
      )}
    </main>
  )
}
