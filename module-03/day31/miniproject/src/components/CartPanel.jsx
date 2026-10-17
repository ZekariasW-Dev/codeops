import useCart from '../context/useCart'

function CartPanel() {
  const { items, dispatch, total } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <section id="cart" className="cart-panel" aria-labelledby="cart-title">
      <div className="cart-heading">
        <div>
          <p className="section-kicker">Your order</p>
          <h2 id="cart-title">Checkout cart</h2>
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'clear' })}
          disabled={items.length === 0}
        >
          Clear cart
        </button>
      </div>

      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Add a dish to begin.</p>
      ) : (
        <ul className="cart-items">
          {items.map(item => (
            <li key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <span>{item.quantity} x {item.price} ETB</span>
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: 'remove', payload: { id: item.id } })}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total">
        <span>{itemCount} item{itemCount === 1 ? '' : 's'}</span>
        <strong>{total} ETB</strong>
      </div>
    </section>
  )
}

export default CartPanel
