import useCartStore from '../stores/cartStore'
import RenderProfiler from './Profiler'

function CartPanel() {
  const items = useCartStore(state => state.items)
  const remove = useCartStore(state => state.remove)
  const clear = useCartStore(state => state.clear)
  const itemCount = useCartStore(state => state.items.reduce((sum, item) => sum + item.quantity, 0))
  const total = useCartStore(state => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0))

  return <RenderProfiler id="cart-panel">
    <section id="cart" className="cart-panel" aria-labelledby="cart-title">
      <div className="cart-heading">
        <div>
          <p className="section-kicker">Your order</p>
          <h2 id="cart-title">Checkout cart</h2>
        </div>
        <button type="button" onClick={clear} disabled={items.length === 0}>Clear cart</button>
      </div>
      {items.length === 0 ? <p className="empty-cart">Your cart is empty. Add a dish to begin.</p> : <ul className="cart-items">{items.map(item => <li key={item.id} className="cart-item"><div><strong>{item.name}</strong><span>{item.quantity} x {item.price} ETB</span></div><button type="button" onClick={() => remove(item.id)}>Remove</button></li>)}</ul>}
      <div className="cart-total"><span>{itemCount} item{itemCount === 1 ? '' : 's'}</span><strong>{total} ETB</strong></div>
    </section>
  </RenderProfiler>
}

export default CartPanel
