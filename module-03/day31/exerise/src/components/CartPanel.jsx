import { useCart } from '../context/CartContext'

function CartPanel() {
  const { items, dispatch, total } = useCart()

  return (
    <section className="demo-section cart-panel">
      <div className="section-heading">
        <h2>Cart provider</h2>
        <button type="button" onClick={() => dispatch({ type: 'clear' })} disabled={items.length === 0}>Clear cart</button>
      </div>
      {items.length === 0 ? (
        <p>Your cart is empty. Add a dish to test the reducer.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <span>{item.name} x {item.quantity}</span>
              <button type="button" onClick={() => dispatch({ type: 'remove', payload: { id: item.id } })}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <strong>Derived total: {total} ETB</strong>
    </section>
  )
}

export default CartPanel
