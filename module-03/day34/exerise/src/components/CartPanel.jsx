import useCartStore from '../stores/cartStore'

function CartPanel({ shouldFail = false }) {
  if (shouldFail) {
    throw new Error('Cart data could not be rendered (demo failure).')
  }

  const items = useCartStore(state => state.items)
  const remove = useCartStore(state => state.remove)
  const clear = useCartStore(state => state.clear)
  const total = useCartStore(state => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0))

  return (
    <section className="demo-section cart-panel">
      <div className="section-heading">
        <h2>Cart provider</h2>
        <button type="button" onClick={clear} disabled={items.length === 0}>Clear cart</button>
      </div>
      {items.length === 0 ? (
        <p>Your cart is empty. Add a dish to test the reducer.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <span>{item.name} x {item.quantity}</span>
              <button type="button" onClick={() => remove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <strong>Derived total: {total} ETB</strong>
    </section>
  )
}

export default CartPanel
